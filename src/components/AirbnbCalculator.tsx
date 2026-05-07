"use client";

import { useMemo, useState } from "react";
import { airbnbMarkets } from "@/lib/extras";
import { tiers } from "@/lib/data";
import { formatUSD } from "@/lib/format";

export default function AirbnbCalculator() {
  const [marketSlug, setMarketSlug] = useState("hillcountry");
  const market = airbnbMarkets.find((m) => m.slug === marketSlug)!;
  const isCustom = marketSlug === "custom";

  const [nightly, setNightly] = useState<number>(market.nightly);
  const [occupancy, setOccupancy] = useState<number>(market.occupancy);
  const [podCost, setPodCost] = useState<number>(64300);
  const [expensesPct, setExpensesPct] = useState<number>(28);
  const [installCost, setInstallCost] = useState<number>(12000);

  const calc = useMemo(() => {
    const grossNightly = nightly * occupancy;
    const grossYear = grossNightly * 365;
    const expenses = grossYear * (expensesPct / 100);
    const netYear = grossYear - expenses;
    const totalInvest = podCost + installCost;
    const paybackYears = netYear > 0 ? totalInvest / netYear : Infinity;
    const roi5 = ((netYear * 5 - totalInvest) / totalInvest) * 100;
    const roi10 = ((netYear * 10 - totalInvest) / totalInvest) * 100;
    return {
      grossYear,
      netYear,
      expenses,
      totalInvest,
      paybackYears,
      roi5,
      roi10,
      monthlyNet: netYear / 12,
    };
  }, [nightly, occupancy, podCost, expensesPct, installCost]);

  function selectMarket(slug: string) {
    setMarketSlug(slug);
    const m = airbnbMarkets.find((x) => x.slug === slug)!;
    if (slug !== "custom") {
      setNightly(m.nightly);
      setOccupancy(m.occupancy);
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="space-y-8 lg:col-span-7">
        <div>
          <span className="label">Market</span>
          <div className="mt-3 flex flex-wrap gap-2">
            {airbnbMarkets.map((m) => (
              <button
                key={m.slug}
                type="button"
                onClick={() => selectMarket(m.slug)}
                className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
                  marketSlug === m.slug
                    ? "border-accent/60 bg-accent/10 text-accent"
                    : "border-white/10 bg-white/[0.02] text-ink-300 hover:border-white/30"
                }`}
              >
                {m.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <div className="flex items-end justify-between">
              <label className="label" htmlFor="nightly">Nightly rate</label>
              <span className="font-display text-xl text-white">
                {formatUSD(nightly)}
              </span>
            </div>
            <input
              id="nightly"
              type="range"
              min={75}
              max={650}
              step={5}
              value={nightly}
              onChange={(e) => {
                setNightly(Number(e.target.value));
                if (!isCustom) setMarketSlug("custom");
              }}
              className="mt-3 w-full"
            />
          </div>
          <div>
            <div className="flex items-end justify-between">
              <label className="label" htmlFor="occupancy">Occupancy</label>
              <span className="font-display text-xl text-white">
                {(occupancy * 100).toFixed(0)}%
              </span>
            </div>
            <input
              id="occupancy"
              type="range"
              min={0.3}
              max={0.95}
              step={0.01}
              value={occupancy}
              onChange={(e) => {
                setOccupancy(Number(e.target.value));
                if (!isCustom) setMarketSlug("custom");
              }}
              className="mt-3 w-full"
            />
          </div>
        </div>

        <div>
          <div className="flex items-end justify-between">
            <label className="label" htmlFor="podCost">Pod price</label>
            <span className="font-display text-xl text-white">
              {formatUSD(podCost)}
            </span>
          </div>
          <input
            id="podCost"
            type="range"
            min={47500}
            max={250000}
            step={500}
            value={podCost}
            onChange={(e) => setPodCost(Number(e.target.value))}
            className="mt-3 w-full"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {tiers.map((t) => (
              <button
                key={t.slug}
                type="button"
                onClick={() => setPodCost(t.startingPrice)}
                className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
                  podCost === t.startingPrice
                    ? "border-accent/60 bg-accent/10 text-accent"
                    : "border-white/10 bg-white/[0.02] text-ink-300 hover:border-white/30"
                }`}
              >
                {t.name} · {formatUSD(t.startingPrice)}+
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <div className="flex items-end justify-between">
              <label className="label" htmlFor="install">Site + install</label>
              <span className="font-display text-xl text-white">
                {formatUSD(installCost)}
              </span>
            </div>
            <input
              id="install"
              type="range"
              min={2000}
              max={40000}
              step={500}
              value={installCost}
              onChange={(e) => setInstallCost(Number(e.target.value))}
              className="mt-3 w-full"
            />
          </div>
          <div>
            <div className="flex items-end justify-between">
              <label className="label" htmlFor="expenses">Expenses</label>
              <span className="font-display text-xl text-white">
                {expensesPct}%
              </span>
            </div>
            <input
              id="expenses"
              type="range"
              min={15}
              max={50}
              step={1}
              value={expensesPct}
              onChange={(e) => setExpensesPct(Number(e.target.value))}
              className="mt-3 w-full"
            />
          </div>
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="sticky top-28 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-8">
          <span className="eyebrow">Projected net</span>
          <div className="mt-3 font-display text-5xl text-white sm:text-6xl">
            {formatUSD(calc.netYear, 0)}
            <span className="ml-2 text-base font-normal text-ink-400">/yr</span>
          </div>
          <div className="mt-1 text-sm text-ink-300">
            ≈ {formatUSD(calc.monthlyNet, 0)} per month
          </div>
          <div className="mt-6 hairline" />

          <dl className="mt-6 space-y-4 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-ink-300">Gross revenue</dt>
              <dd className="font-medium text-white">
                {formatUSD(calc.grossYear)}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-ink-300">Operating expenses</dt>
              <dd className="font-medium text-white">
                {formatUSD(calc.expenses)}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-ink-300">Total investment</dt>
              <dd className="font-medium text-white">
                {formatUSD(calc.totalInvest)}
              </dd>
            </div>
            <div className="flex items-center justify-between border-t border-white/5 pt-4">
              <dt className="text-ink-300">Payback period</dt>
              <dd className="font-display text-2xl text-accent">
                {Number.isFinite(calc.paybackYears)
                  ? `${calc.paybackYears.toFixed(1)} yrs`
                  : "—"}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-ink-300">5-year ROI</dt>
              <dd className="font-medium text-white">
                {calc.roi5.toFixed(0)}%
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-ink-300">10-year ROI</dt>
              <dd className="font-medium text-white">
                {calc.roi10.toFixed(0)}%
              </dd>
            </div>
          </dl>

          <p className="mt-8 text-xs leading-relaxed text-ink-400">
            Estimates only. Actual results vary by market, marketing, and
            seasonality. Default rates reflect AirDNA-style averages for ADU /
            cabin pods in each market. Operating expenses include cleaning,
            management fee, utilities, supplies, taxes, and reserves.
          </p>
          <a href="/contact?tier=mid" className="btn-primary mt-6 w-full">
            Talk through your project
          </a>
        </div>
      </div>
    </div>
  );
}
