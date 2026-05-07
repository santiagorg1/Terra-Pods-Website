"use client";

import { useMemo, useState } from "react";
import { formatUSD } from "@/lib/format";
import { models } from "@/lib/data";

const TERMS = [10, 15, 20, 25];

export default function FinancingCalculator() {
  const [price, setPrice] = useState<number>(85500);
  const [down, setDown] = useState<number>(20);
  const [rate, setRate] = useState<number>(7.25);
  const [term, setTerm] = useState<number>(20);

  const calc = useMemo(() => {
    const principal = price * (1 - down / 100);
    const monthlyRate = rate / 100 / 12;
    const n = term * 12;
    const monthly =
      monthlyRate === 0
        ? principal / n
        : (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) /
          (Math.pow(1 + monthlyRate, n) - 1);
    const totalPaid = monthly * n;
    const totalInterest = totalPaid - principal;
    return { principal, monthly, totalPaid, totalInterest };
  }, [price, down, rate, term]);

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="space-y-8 lg:col-span-7">
        <div>
          <div className="flex items-end justify-between">
            <label className="label" htmlFor="price">Pod price</label>
            <span className="font-display text-2xl text-white">
              {formatUSD(price)}
            </span>
          </div>
          <input
            id="price"
            type="range"
            min={45000}
            max={150000}
            step={500}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="mt-4 w-full"
          />
          <div className="mt-3 flex max-h-32 flex-wrap gap-2 overflow-y-auto">
            {models.map((m) => (
              <button
                key={m.slug}
                type="button"
                onClick={() => setPrice(m.startingPrice)}
                className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
                  price === m.startingPrice
                    ? "border-accent/60 bg-accent/10 text-accent"
                    : "border-white/10 bg-white/[0.02] text-ink-300 hover:border-white/30"
                }`}
              >
                {m.name.replace("Terra Pod ", "")}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-end justify-between">
            <label className="label" htmlFor="down">Down payment</label>
            <span className="font-display text-2xl text-white">
              {down}% · {formatUSD(price * (down / 100))}
            </span>
          </div>
          <input
            id="down"
            type="range"
            min={0}
            max={50}
            step={1}
            value={down}
            onChange={(e) => setDown(Number(e.target.value))}
            className="mt-4 w-full"
          />
        </div>

        <div>
          <div className="flex items-end justify-between">
            <label className="label" htmlFor="rate">Interest rate (APR)</label>
            <span className="font-display text-2xl text-white">
              {rate.toFixed(2)}%
            </span>
          </div>
          <input
            id="rate"
            type="range"
            min={3}
            max={12}
            step={0.05}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="mt-4 w-full"
          />
        </div>

        <div>
          <span className="label">Term length</span>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {TERMS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTerm(t)}
                className={`rounded-2xl border px-3 py-3 text-sm font-medium transition-colors ${
                  term === t
                    ? "border-accent/60 bg-accent/10 text-accent"
                    : "border-white/10 bg-white/[0.02] text-ink-200 hover:border-white/30"
                }`}
              >
                {t} yrs
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="sticky top-28 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-8">
          <span className="eyebrow">Estimated monthly</span>
          <div className="mt-3 font-display text-5xl text-white sm:text-6xl">
            {formatUSD(calc.monthly, 0)}
            <span className="ml-1 text-base font-normal text-ink-400">/mo</span>
          </div>
          <div className="mt-6 hairline" />

          <dl className="mt-6 space-y-4 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-ink-300">Loan amount</dt>
              <dd className="font-medium text-white">
                {formatUSD(calc.principal)}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-ink-300">Total interest</dt>
              <dd className="font-medium text-white">
                {formatUSD(calc.totalInterest)}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-ink-300">Total paid</dt>
              <dd className="font-medium text-white">
                {formatUSD(calc.totalPaid)}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-ink-300">Term</dt>
              <dd className="font-medium text-white">
                {term} years · {term * 12} mo
              </dd>
            </div>
          </dl>

          <p className="mt-8 text-xs leading-relaxed text-ink-400">
            Estimates only. Actual rates depend on credit profile, lender, and
            jurisdiction. Terra Pods partners with multiple lenders to source
            competitive offers.
          </p>
          <a href="/contact" className="btn-primary mt-6 w-full">
            Apply for financing
          </a>
        </div>
      </div>
    </div>
  );
}
