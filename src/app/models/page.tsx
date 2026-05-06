import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import {
  tiers,
  customizations,
  standardInclusions,
} from "@/lib/data";
import { formatUSD } from "@/lib/format";

export const metadata: Metadata = {
  title: "Models",
  description:
    "Three tiers, twenty-five models, nine series. From a $47,500 ADU-ready studio to a 40m² developer-grade flagship — all factory-configured and US housing code certified.",
};

export default function ModelsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Built your way · 25 models · 9 series"
        title={
          <>
            Three tiers. <span className="text-terra">All compliant.</span>
          </>
        }
        subtitle="ADU compliant. US housing code certified. All-weather engineered. Choose your tier — then configure every detail at the factory."
      />

      <section className="container-pod py-20 sm:py-24">
        <div className="space-y-32">
          {tiers.map((t, i) => {
            const reverse = i % 2 === 1;
            return (
              <article
                id={t.slug}
                key={t.slug}
                className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16"
              >
                <Reveal
                  className={`lg:col-span-7 ${reverse ? "lg:order-2" : ""}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10">
                    <div
                      className="absolute inset-0 scale-105 bg-cover bg-center transition-transform duration-[1.5s] hover:scale-100"
                      style={{ backgroundImage: `url(${t.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
                  </div>
                </Reveal>
                <Reveal
                  delay={0.1}
                  className={`lg:col-span-5 ${reverse ? "lg:order-1" : ""}`}
                >
                  <span className="eyebrow">{t.tagline}</span>
                  <h2 className="display-3 mt-5">{t.name}</h2>
                  <p className="mt-6 text-base leading-relaxed text-ink-300">
                    {t.description}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {t.models.map((m) => (
                      <span
                        key={m}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-ink-200"
                      >
                        {m}
                      </span>
                    ))}
                  </div>

                  <ul className="mt-8 space-y-2.5">
                    {t.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-3 text-sm text-ink-200"
                      >
                        <span className="mt-2 h-1 w-1 flex-none rounded-full bg-accent" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/5 pt-8">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-ink-400">
                        Starting at
                      </div>
                      <div className="font-display text-3xl text-accent">
                        {formatUSD(t.startingPrice)}
                        <span className="text-xl">+</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={`/contact?tier=${t.slug}`}
                        className="btn-primary"
                      >
                        Request quote
                      </Link>
                      <Link href="/financing" className="btn-ghost">
                        Finance options
                      </Link>
                    </div>
                  </div>
                </Reveal>
              </article>
            );
          })}
        </div>
      </section>

      <section className="container-pod py-24">
        <Reveal>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent p-10 sm:p-12">
            <span className="eyebrow">Factory customizations</span>
            <h2 className="display-3 mt-5">
              Configure every <span className="text-terra">detail.</span>
            </h2>
            <p className="lead mt-5 max-w-2xl">
              Every option below is installed at the source — never on-site.
              You receive a fully finished pod, ready to inhabit on arrival.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {customizations.map((c) => (
                <div
                  key={c.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-accent/40 hover:bg-white/[0.04]"
                >
                  <h3 className="text-sm font-medium text-white">{c.title}</h3>
                  <p className="mt-1.5 text-xs text-ink-400">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="container-pod pb-32">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-accent/15 to-transparent p-10 sm:p-12">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="eyebrow">Standard on every pod</span>
              <h2 className="display-3 mt-5">No upcharge.</h2>
            </div>
            <div className="lg:col-span-8">
              <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {standardInclusions.map((s) => (
                  <li
                    key={s}
                    className="flex items-start gap-3 text-sm text-ink-100"
                  >
                    <span className="mt-2 h-1 w-1 flex-none rounded-full bg-accent" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="container-pod pb-32">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-10 text-center sm:p-16">
          <h3 className="display-3">Not sure which tier fits?</h3>
          <p className="mx-auto mt-5 max-w-xl text-ink-300">
            Tell us about your project — single ADU, multi-unit, or rapid
            deployment — and we'll match you to the right configuration.
          </p>
          <Link href="/contact" className="btn-primary mt-8">
            Talk to our team
          </Link>
        </div>
      </section>
    </>
  );
}
