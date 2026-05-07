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
      {/* ─── CINEMATIC HERO ─────────────────────────────────────────────────── */}
      <section className="scene vignette grain pt-32 sm:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at top, ${accent}26, transparent 60%), linear-gradient(180deg, transparent 0%, rgba(5,6,7,1) 100%)`,
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/3 h-[80vh] w-[80vh] -translate-x-1/2 rounded-full blur-[120px]"
          style={{ backgroundColor: `${accent}1a` }}
        />

        <div className="container-pod relative">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-ink-400">
            <Link href="/models" className="hover:text-white">Catalog</Link>
            <span className="text-ink-600">·</span>
            <Link href={`/models?series=${model.seriesSlug}`} className="hover:text-white">{model.series}</Link>
            <span className="text-ink-600">·</span>
            <span className="text-white">{model.short}</span>
          </nav>

          {/* Editorial title */}
          <div className="mt-16 flex flex-col items-center text-center sm:mt-24">
            <span className="eyebrow-center">{model.tagline}</span>
            <h1
              className="mt-10 font-display font-light leading-none tracking-cinema"
              style={{
                fontSize: "clamp(5rem, 16vw, 13rem)",
                color: accent,
              }}
            >
              {model.short}
            </h1>
            <div className="mt-4 font-display italic text-2xl text-ink-200 sm:text-3xl">
              {model.name}
            </div>
            <p className="lead-prose mt-10 max-w-2xl text-balance text-ink-200">
              {model.description}
            </p>
          </div>

          {/* Silhouette stage */}
          <div className="relative mx-auto mt-16 w-full max-w-5xl sm:mt-24">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at center, ${accent}1f, transparent 65%)`,
              }}
            />
            <div className="relative aspect-[16/8]">
              <PodSilhouette
                variant={model.silhouette}
                color={accent}
                className="h-full w-full"
              />
            </div>
          </div>

          {/* Editorial stat ledger */}
          <dl className="mt-20 grid grid-cols-2 gap-y-10 border-y border-white/10 py-10 sm:grid-cols-3 lg:grid-cols-6">
            {[
              ["Footprint", model.area],
              ["Sq ft", model.areaSqft],
              ["Capacity", model.guests],
              ["Lead", model.delivery],
              ["Net weight", model.weight],
              ["Power", model.power],
            ].map(([k, v]) => (
              <div key={k} className="px-2">
                <dt className="text-[10px] uppercase tracking-[0.32em] text-ink-500">{k}</dt>
                <dd className="mt-3 font-display text-xl text-white">{v}</dd>
              </div>
            ))}
          </dl>

          {/* Price + CTAs */}
          <div className="mt-20 flex flex-col items-start justify-between gap-10 sm:flex-row sm:items-end">
            <div>
              <div className="text-[10px] uppercase tracking-[0.32em] text-ink-500">Starting at</div>
              <div className="mt-3 font-display text-5xl text-accent sm:text-6xl">
                {formatUSD(model.startingPrice)}
              </div>
              {model.badge && (
                <div className="mt-5 inline-flex items-center gap-3 rounded-full border border-accent/30 bg-accent/[0.06] px-4 py-2 text-[10px] uppercase tracking-[0.32em] text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {model.badge}
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href={`/contact?model=${model.slug}`} className="btn-luxury">
                Reserve the {model.short}
                <span>→</span>
              </Link>
              <Link href="/financing" className="btn-link">
                Model the financing <span>↓</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ELEVATION DETAILS ─────────────────────────────────────────────── */}
      <section className="container-pod py-32 sm:py-44">
        <div className="grid items-end gap-12 border-b border-white/5 pb-12 sm:flex-row lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="eyebrow">Elevation</span>
            <h2 className="display-3 mt-6 max-w-2xl">
              {model.length} long. {model.width} wide. {model.height} tall.
            </h2>
          </div>
          <div className="text-[11px] uppercase tracking-[0.32em] text-ink-400 lg:col-span-5 lg:text-right">
            <div>{model.dimensions}</div>
            <div className="mt-1 text-ink-500">L × W × H</div>
          </div>
        </div>
      </section>

      {/* ─── HIGHLIGHTS ─────────────────────────────────────────────────────── */}
      <section className="container-pod py-24 sm:py-28">
        <Reveal>
          <span className="eyebrow">Highlights</span>
          <h2 className="display-2 mt-8 max-w-3xl">
            What sets <span className="display-italic text-gold">{model.short}</span> apart.
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {model.features.map((f, i) => (
            <Reveal key={f} delay={(i % 3) * 0.06}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent p-8 transition-all duration-700 ease-cinema hover:border-accent/30">
                <div className="font-display italic text-base text-accent">No. 0{i + 1}</div>
                <p className="mt-6 text-base leading-relaxed text-ink-100">{f}</p>
                <div className="mt-8 h-px w-12 bg-accent/40 transition-all duration-700 ease-cinema group-hover:w-24 group-hover:bg-accent" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── EXTERIOR / INTERIOR ───────────────────────────────────────────── */}
      <section className="container-pod py-24 sm:py-32">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <span className="eyebrow">External protection</span>
            <h3 className="display-3 mt-7">
              <span className="display-italic text-gold">The shell.</span>
            </h3>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ink-300">
              The standard exterior protection package, included in the base price of every {model.short}.
            </p>
            <ul className="mt-12 space-y-4">
              {model.exteriorProtection.map((f) => (
                <li key={f} className="rule-mark text-base text-ink-100">
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="eyebrow">Interior decoration</span>
            <h3 className="display-3 mt-7">
              <span className="display-italic text-gold">The interior.</span>
            </h3>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ink-300">
              The standard interior package — fixtures, finishes, and systems, ready on day one.
            </p>
            <ul className="mt-12 grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
              {model.interiorDecoration.map((f) => (
                <li key={f} className="rule-mark text-sm text-ink-100">
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
        <section className="container-pod py-24 sm:py-32">
          <Reveal>
            <span className="eyebrow">Systems</span>
            <h3 className="display-3 mt-7 max-w-3xl">
              Guest control & <span className="display-italic text-gold">built-in furniture.</span>
            </h3>
          </Reveal>
          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {model.guestControl.length > 0 && (
              <Reveal>
                <div className="h-full rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 transition-colors duration-700 ease-cinema hover:border-accent/30">
                  <div className="font-display italic text-xl text-accent">Guest control</div>
                  <ul className="mt-8 space-y-4">
                    {model.guestControl.map((f) => (
                      <li key={f} className="rule-mark text-sm text-ink-100">{f}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}
            {model.productAccessories.length > 0 && (
              <Reveal delay={0.06}>
                <div className="h-full rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 transition-colors duration-700 ease-cinema hover:border-accent/30">
                  <div className="font-display italic text-xl text-accent">Product accessories</div>
                  <ul className="mt-8 space-y-4">
                    {model.productAccessories.map((f) => (
                      <li key={f} className="rule-mark text-sm text-ink-100">{f}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}
            {model.hardFittedFurniture && model.hardFittedFurniture.length > 0 && (
              <Reveal delay={0.12}>
                <div className="h-full rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 transition-colors duration-700 ease-cinema hover:border-accent/30">
                  <div className="font-display italic text-xl text-accent">Hard-fitted furniture</div>
                  <ul className="mt-8 space-y-4">
                    {model.hardFittedFurniture.map((f) => (
                      <li key={f} className="rule-mark text-sm text-ink-100">{f}</li>
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
        <section className="container-pod py-24 sm:py-32">
          <Reveal>
            <div className="grid items-end gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <span className="eyebrow">Tailoring</span>
                <h3 className="display-2 mt-7 max-w-2xl">
                  Tailor it to your <span className="display-italic text-gold">site</span>.
                </h3>
              </div>
              <p className="text-base leading-relaxed text-ink-300 lg:col-span-5">
                Optional packages add to the base price. We'll quote the exact deltas after a brief discovery call.
              </p>
            </div>
          </Reveal>
          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {model.optionalConfigurations.map((g, i) => (
              <Reveal key={g.title} delay={(i % 3) * 0.07}>
                <div className="h-full rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent p-8 transition-colors duration-700 ease-cinema hover:border-accent/30">
                  <div className="flex items-baseline justify-between">
                    <div className="font-display text-xl text-white">{g.title}</div>
                    <span className="text-[10px] uppercase tracking-[0.32em] text-ink-500">+ option</span>
                  </div>
                  <ul className="mt-8 space-y-4">
                    {g.items.map((it) => (
                      <li key={it} className="rule-mark text-sm text-ink-200">{it}</li>
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
        <section className="container-pod py-24 sm:py-32">
          <Reveal>
            <div className="flex items-end justify-between gap-6">
              <div className="max-w-xl">
                <span className="eyebrow">{seriesData.tagline}</span>
                <h3 className="display-2 mt-7">
                  More from <span className="display-italic text-gold">{seriesData.name}</span>.
                </h3>
              </div>
              <Link href={`/models?series=${model.seriesSlug}`} className="btn-link-luxury">
                See series <span>→</span>
              </Link>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.slice(0, 3).map((o, i) => (
              <Reveal key={o.slug} delay={(i % 3) * 0.06}>
                <Link
                  href={`/models/${o.slug}`}
                  className="group block h-full overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent transition-all duration-700 ease-cinema hover:border-accent/40 hover:shadow-[0_30px_80px_-30px_rgba(217,191,142,0.2)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-white/[0.06]">
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background: `radial-gradient(ellipse at center, ${accent}1f, transparent 65%)`,
                      }}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-vignette" />
                    <div className="relative flex h-full items-center justify-center p-8">
                      <PodSilhouette
                        variant={o.silhouette}
                        color={accent}
                        className="h-full w-full"
                      />
                    </div>
                  </div>
                  <div className="p-7">
                    <div className="flex items-baseline justify-between gap-3">
                      <div>
                        <span
                          className="font-display text-3xl tracking-cinema"
                          style={{ color: accent }}
                        >
                          {o.short}
                        </span>
                        <div className="mt-2 text-[10px] uppercase tracking-[0.28em] text-ink-400">{o.tagline}</div>
                      </div>
                      <span className="font-display text-base text-accent">{formatUSD(o.startingPrice)}</span>
                    </div>
                    <div className="mt-6 text-[10px] uppercase tracking-[0.28em] text-ink-400">{o.area} · {o.guests}</div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ─── RESERVE ───────────────────────────────────────────────────────── */}
      <section className="container-pod py-32 sm:py-44">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950">
          <div className="pointer-events-none absolute -right-32 -top-32 h-[480px] w-[480px] rounded-full bg-accent/[0.18] blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-[480px] w-[480px] rounded-full bg-ember/[0.10] blur-[100px]" />
          <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.04] mix-blend-overlay" />

          <div className="relative grid gap-12 p-10 sm:p-16 lg:grid-cols-2 lg:items-center lg:gap-20 lg:p-20">
            <div>
              <span className="eyebrow">Reserve</span>
              <h3 className="display-2 mt-7 text-balance">
                Reserve the <span className="display-italic text-gold">{model.short}</span>.
              </h3>
              <p className="lead-prose mt-8 max-w-md">
                A small refundable deposit secures your build slot. A specialist will follow up within one business day.
              </p>
            </div>
            <div className="glass rounded-3xl p-8 sm:p-10">
              <LeadForm variant="compact" defaultModel={model.slug} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── PREV / NEXT ───────────────────────────────────────────────────── */}
      <section className="container-pod pb-32">
        <div className="grid gap-4 border-y border-white/5 sm:grid-cols-2 sm:gap-0 sm:divide-x sm:divide-white/5">
          <Link
            href={`/models/${prev.slug}`}
            className="group flex items-center justify-between p-8 transition-colors duration-700 ease-cinema hover:bg-white/[0.015]"
          >
            <div>
              <div className="text-[10px] uppercase tracking-[0.32em] text-ink-500">Previous</div>
              <div className="mt-3 font-display text-3xl text-white">{prev.short}</div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.28em] text-ink-400">{prev.tagline}</div>
            </div>
            <span className="text-3xl text-accent transition-transform duration-700 ease-cinema group-hover:-translate-x-2">←</span>
          </Link>
          <Link
            href={`/models/${next.slug}`}
            className="group flex items-center justify-between p-8 transition-colors duration-700 ease-cinema hover:bg-white/[0.015]"
          >
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-[0.32em] text-ink-500">Next</div>
              <div className="mt-3 font-display text-3xl text-white">{next.short}</div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.28em] text-ink-400">{next.tagline}</div>
            </div>
            <span className="text-3xl text-accent transition-transform duration-700 ease-cinema group-hover:translate-x-2">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
