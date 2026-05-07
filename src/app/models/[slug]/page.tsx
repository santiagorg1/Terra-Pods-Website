import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PodSilhouette from "@/components/PodSilhouette";
import Reveal from "@/components/Reveal";
import LeadForm from "@/components/LeadForm";
import {
  getModel,
  getSeries,
  getSeriesModels,
  models,
} from "@/lib/data";
import { formatUSD } from "@/lib/format";

export function generateStaticParams() {
  return models.map((m) => ({ slug: m.slug }));
}

export function generateMetadata(
  { params }: { params: { slug: string } },
): Metadata {
  const m = getModel(params.slug);
  if (!m) return { title: "Model not found" };
  return {
    title: `${m.name} — ${m.tagline}`,
    description: m.description,
  };
}

export default function ModelPage({ params }: { params: { slug: string } }) {
  const model = getModel(params.slug);
  if (!model) return notFound();

  const seriesData = getSeries(model.seriesSlug);
  const seriesModels = getSeriesModels(model.seriesSlug);
  const others = seriesModels.filter((m) => m.slug !== model.slug);
  const idx = models.findIndex((m) => m.slug === model.slug);
  const prev = models[(idx - 1 + models.length) % models.length];
  const next = models[(idx + 1) % models.length];
  const accent = seriesData?.accent ?? "#c9a86a";

  return (
    <>
      {/* ─── HERO ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 sm:pt-40">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at top, ${accent}1f, transparent 60%)`,
          }}
        />
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05]">
          <defs>
            <pattern id={`m-grid-${model.slug}`} width="56" height="56" patternUnits="userSpaceOnUse">
              <path d="M 56 0 L 0 0 0 56" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#m-grid-${model.slug})`} />
        </svg>

        <div className="container-pod relative">
          <nav className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-ink-400">
            <Link href="/models" className="hover:text-white">Catalog</Link>
            <span>/</span>
            <Link href={`/models?series=${model.seriesSlug}`} className="hover:text-white">{model.series}</Link>
            <span>/</span>
            <span className="text-white">{model.short}</span>
          </nav>

          <div className="mt-12 grid items-end gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-4">
                <span
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border font-display text-base"
                  style={{ borderColor: `${accent}55`, color: accent }}
                >
                  {seriesData?.shortCode}
                </span>
                <span className="text-[11px] uppercase tracking-[0.24em] text-ink-300">{model.tagline}</span>
              </div>
              <h1 className="display-1 mt-7 text-balance">{model.short}</h1>
              <div className="mt-2 font-display text-2xl text-ink-300">{model.name}</div>
              <p className="lead mt-7 max-w-xl">{model.description}</p>

              <div className="mt-10 flex flex-wrap items-end gap-x-10 gap-y-5">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-ink-400">Starting at</div>
                  <div className="font-display text-5xl text-accent">{formatUSD(model.startingPrice)}</div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link href={`/contact?model=${model.slug}`} className="btn-primary">
                    Request a quote
                  </Link>
                  <Link href="/financing" className="btn-ghost">
                    Finance this pod
                  </Link>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-8">
                <div className="text-[10px] uppercase tracking-[0.24em] text-ink-400">Elevation · placeholder render</div>
                <div className="mt-2 flex items-baseline justify-between">
                  <div className="font-display text-2xl text-white">{model.short}</div>
                  <div className="text-xs uppercase tracking-[0.22em] text-ink-400">{model.dimensions}</div>
                </div>
                <div className="relative mt-8 aspect-[3/1]">
                  <PodSilhouette
                    variant={model.silhouette}
                    color={accent}
                    className="h-full w-full"
                  />
                </div>
                <div className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/5">
                  {[
                    ["Length", model.length],
                    ["Width", model.width],
                    ["Height", model.height],
                  ].map(([k, v]) => (
                    <div key={k} className="bg-ink-950 px-3 py-3 text-center">
                      <div className="text-[9px] uppercase tracking-[0.22em] text-ink-400">{k}</div>
                      <div className="mt-1 text-xs font-medium text-white">{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Big stat strip */}
          <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-4 lg:grid-cols-6">
            {[
              ["Footprint", model.area],
              ["Sq ft", model.areaSqft],
              ["Guests", model.guests],
              ["Lead", model.delivery],
              ["Net weight", model.weight],
              ["Power", model.power],
            ].map(([k, v]) => (
              <div key={k} className="bg-ink-950 px-4 py-5 text-center">
                <dt className="text-[10px] uppercase tracking-[0.22em] text-ink-400">{k}</dt>
                <dd className="mt-1.5 text-sm font-medium text-white">{v}</dd>
              </div>
            ))}
          </div>

          {model.badge && (
            <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-accent/30 bg-accent/[0.06] px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {model.badge}
            </div>
          )}
        </div>
      </section>

      {/* ─── HIGHLIGHTS ─────────────────────────────────────────────────────── */}
      <section className="container-pod py-24 sm:py-28">
        <Reveal>
          <span className="eyebrow">Highlights</span>
          <h2 className="display-3 mt-5 max-w-2xl">What sets {model.short} apart.</h2>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {model.features.map((f, i) => (
            <Reveal key={f} delay={(i % 3) * 0.05}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-6 transition-colors duration-500 hover:border-accent/30">
                <div className="font-display text-xl text-accent">0{i + 1}</div>
                <p className="mt-4 text-sm leading-relaxed text-ink-100">{f}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── EXTERIOR / INTERIOR ───────────────────────────────────────────── */}
      <section className="container-pod py-24 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <span className="eyebrow">External protection</span>
            <h3 className="display-3 mt-5">The shell.</h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-300">
              The standard exterior protection package for the {model.short}.
            </p>
            <ul className="mt-8 space-y-3">
              {model.exteriorProtection.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-ink-100">
                  <SpecDot />
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="eyebrow">Interior decoration</span>
            <h3 className="display-3 mt-5">The interior.</h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-300">
              Standard interior package, included in the base price.
            </p>
            <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
              {model.interiorDecoration.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-ink-100">
                  <SpecDot />
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ─── GUEST CONTROL · ACCESSORIES · HARD-FITTED ─────────────────────── */}
      {(model.guestControl.length > 0 ||
        model.productAccessories.length > 0 ||
        (model.hardFittedFurniture && model.hardFittedFurniture.length > 0)) && (
        <section className="container-pod py-24 sm:py-28">
          <Reveal>
            <span className="eyebrow">Systems</span>
            <h3 className="display-3 mt-5 max-w-2xl">Guest control & built-in furniture.</h3>
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {model.guestControl.length > 0 && (
              <Reveal>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-7">
                  <div className="font-display text-xl text-accent">Guest control</div>
                  <ul className="mt-5 space-y-2.5">
                    {model.guestControl.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-ink-100">
                        <SpecDot />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}
            {model.productAccessories.length > 0 && (
              <Reveal delay={0.06}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-7">
                  <div className="font-display text-xl text-accent">Product accessories</div>
                  <ul className="mt-5 space-y-2.5">
                    {model.productAccessories.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-ink-100">
                        <SpecDot />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}
            {model.hardFittedFurniture && model.hardFittedFurniture.length > 0 && (
              <Reveal delay={0.12}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-7">
                  <div className="font-display text-xl text-accent">Hard-fitted furniture</div>
                  <ul className="mt-5 space-y-2.5">
                    {model.hardFittedFurniture.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-ink-100">
                        <SpecDot />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* ─── OPTIONAL CONFIGURATIONS ───────────────────────────────────────── */}
      {model.optionalConfigurations.length > 0 && (
        <section className="container-pod py-24 sm:py-28">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <div className="max-w-xl">
                <span className="eyebrow">Optional configurations</span>
                <h3 className="display-3 mt-5">Tailor it to your site.</h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-300">
                  Optional packages add to the base price. We'll quote the exact deltas after a brief discovery call.
                </p>
              </div>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {model.optionalConfigurations.map((g, i) => (
              <Reveal key={g.title} delay={(i % 3) * 0.06}>
                <div className="h-full rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-7 transition-colors hover:border-accent/30">
                  <div className="flex items-baseline justify-between">
                    <div className="font-display text-xl text-white">{g.title}</div>
                    <span className="text-[10px] uppercase tracking-[0.22em] text-ink-400">+ option</span>
                  </div>
                  <ul className="mt-5 space-y-2.5">
                    {g.items.map((it) => (
                      <li key={it} className="flex items-start gap-3 text-sm text-ink-200">
                        <SpecDot />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ─── IN SERIES ─────────────────────────────────────────────────────── */}
      {seriesData && others.length > 0 && (
        <section className="container-pod py-24 sm:py-28">
          <Reveal>
            <div className="flex items-end justify-between gap-6">
              <div className="max-w-xl">
                <span className="eyebrow">{seriesData.tagline}</span>
                <h3 className="display-3 mt-5">More from {seriesData.name}.</h3>
              </div>
              <Link href={`/models?series=${model.seriesSlug}`} className="btn-link">
                See series <span>→</span>
              </Link>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.slice(0, 3).map((o, i) => (
              <Reveal key={o.slug} delay={(i % 3) * 0.05}>
                <Link
                  href={`/models/${o.slug}`}
                  className="group block h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] transition-colors hover:border-accent/40"
                >
                  <div className="relative aspect-[16/9] overflow-hidden border-b border-white/5 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04),transparent_70%)]">
                    <div className="flex h-full items-center justify-center p-6">
                      <PodSilhouette
                        variant={o.silhouette}
                        color={accent}
                        className="h-full w-full"
                      />
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-baseline justify-between gap-3">
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.22em] text-ink-400">{o.tagline}</div>
                        <h4 className="mt-1 font-display text-2xl text-white">{o.short}</h4>
                      </div>
                      <span className="font-display text-base text-accent">{formatUSD(o.startingPrice)}</span>
                    </div>
                    <div className="mt-3 text-[10px] uppercase tracking-[0.22em] text-ink-400">{o.area} · {o.guests}</div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ─── RESERVE ───────────────────────────────────────────────────────── */}
      <section className="container-pod py-24 sm:py-32">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950 p-10 sm:p-16">
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="eyebrow">Reserve</span>
              <h3 className="display-2 mt-5 text-balance">
                Reserve the <span className="text-gold">{model.short}.</span>
              </h3>
              <p className="lead mt-6 max-w-md">
                A small refundable deposit secures your slot. A specialist will
                follow up within one business day with site requirements and
                final pricing.
              </p>
            </div>
            <div className="glass rounded-3xl p-8">
              <LeadForm variant="compact" defaultModel={model.slug} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── PREV / NEXT ───────────────────────────────────────────────────── */}
      <section className="container-pod pb-24">
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href={`/models/${prev.slug}`}
            className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-accent/40"
          >
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-ink-400">Previous</div>
              <div className="mt-1 font-display text-2xl text-white">{prev.short}</div>
            </div>
            <span className="text-2xl text-accent transition-transform group-hover:-translate-x-0.5">←</span>
          </Link>
          <Link
            href={`/models/${next.slug}`}
            className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-accent/40"
          >
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-ink-400">Next</div>
              <div className="mt-1 font-display text-2xl text-white">{next.short}</div>
            </div>
            <span className="text-2xl text-accent transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}

function SpecDot() {
  return (
    <span
      aria-hidden
      className="mt-1.5 flex-none"
    >
      <svg width="10" height="10" viewBox="0 0 10 10">
        <rect x="1" y="4" width="8" height="2" fill="#c9a86a" opacity="0.7" />
      </svg>
    </span>
  );
}
