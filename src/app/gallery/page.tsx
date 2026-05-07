import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import PodSilhouette from "@/components/PodSilhouette";
import { models, series } from "@/lib/data";
import { formatUSD } from "@/lib/format";

export const metadata: Metadata = {
  title: "Catalog index",
  description:
    "The complete Terra Pods 2028 catalog index. Twenty-six models across ten series — names, dimensions, prices, lead times.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="The catalog"
        title={
          <>
            The 2028 collection,
            <br />
            <span className="display-italic text-gold">at a glance.</span>
          </>
        }
        subtitle="Every model, organized by series. Footprint, capacity, finish, lead time, starting price — open any line to step into the model."
      />

      <section className="container-pod py-20 sm:py-28">
        <div className="space-y-32 sm:space-y-44">
          {series.map((s) => {
            const items = models.filter((m) => m.seriesSlug === s.slug);
            return (
              <div key={s.slug} className="scene relative">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -left-24 top-1/3 h-[60vh] w-[60vh] rounded-full blur-[100px]"
                  style={{ backgroundColor: `${s.accent}10` }}
                />

                <Reveal>
                  <div className="relative grid items-end gap-10 border-b border-white/5 pb-10 lg:grid-cols-12">
                    <div className="lg:col-span-7">
                      <div className="flex items-center gap-6">
                        <span
                          className="font-display text-[clamp(3rem,6vw,5rem)] leading-none tracking-cinema"
                          style={{ color: s.accent }}
                        >
                          {s.shortCode}
                        </span>
                        <div>
                          <span className="text-[10px] uppercase tracking-[0.32em] text-ink-300">
                            {s.tagline}
                          </span>
                          <h2 className="mt-3 display-3">{s.name}</h2>
                        </div>
                      </div>
                      <p className="lead-prose mt-8 max-w-2xl text-ink-200">
                        {s.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-6 text-[10px] uppercase tracking-[0.32em] text-ink-400 lg:col-span-5 lg:justify-end">
                      <span>{items.length} model{items.length === 1 ? "" : "s"}</span>
                      <span className="h-3 w-px bg-white/15" />
                      <span className="text-accent">From {formatUSD(Math.min(...items.map((m) => m.startingPrice)))}</span>
                      <Link href={`/models?series=${s.slug}`} className="btn-link-luxury">
                        Browse <span>→</span>
                      </Link>
                    </div>
                  </div>
                </Reveal>

                {/* Editorial table — no grid borders, just rules */}
                <Reveal delay={0.05}>
                  <div className="relative mt-12">
                    <ul>
                      {items.map((m, i) => (
                        <li key={m.slug} className={`group ${i === 0 ? "" : "border-t border-white/5"}`}>
                          <Link
                            href={`/models/${m.slug}`}
                            className="grid items-center gap-x-8 gap-y-3 py-8 transition-colors duration-700 ease-cinema hover:bg-white/[0.015] sm:py-10 lg:grid-cols-[120px_1.5fr_1fr_1fr_1fr_1fr_auto]"
                          >
                            <div className="aspect-[2/1] w-[120px]">
                              <PodSilhouette
                                variant={m.silhouette}
                                color={s.accent}
                                className="h-full w-full"
                                animated={false}
                                showGround={false}
                              />
                            </div>
                            <div>
                              <span
                                className="font-display text-3xl tracking-cinema"
                                style={{ color: s.accent }}
                              >
                                {m.short}
                              </span>
                              <div className="mt-2 text-[10px] uppercase tracking-[0.32em] text-ink-400">
                                {m.tagline}
                              </div>
                            </div>
                            <div className="text-sm text-ink-200">
                              <span className="text-[10px] uppercase tracking-[0.28em] text-ink-500 lg:hidden">Area · </span>
                              {m.area}
                            </div>
                            <div className="text-sm text-ink-200">
                              <span className="text-[10px] uppercase tracking-[0.28em] text-ink-500 lg:hidden">Capacity · </span>
                              {m.guests}
                            </div>
                            <div className="text-sm text-ink-200">
                              <span className="text-[10px] uppercase tracking-[0.28em] text-ink-500 lg:hidden">Lead · </span>
                              {m.delivery}
                            </div>
                            <div className="text-sm text-ink-200">
                              <span className="text-[10px] uppercase tracking-[0.28em] text-ink-500 lg:hidden">Finish · </span>
                              {m.finish}
                            </div>
                            <div className="flex items-center justify-between gap-4 lg:justify-end">
                              <span className="font-display text-2xl text-accent">{formatUSD(m.startingPrice)}</span>
                              <span className="text-2xl text-accent transition-transform duration-700 ease-cinema group-hover:translate-x-2">→</span>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container-pod py-32 sm:py-44">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950 p-12 text-center sm:p-20">
          <div className="pointer-events-none absolute -right-32 -top-32 h-[480px] w-[480px] rounded-full bg-accent/[0.18] blur-[100px]" />
          <span className="eyebrow-center mx-auto">Site visits</span>
          <h2 className="display-2 mt-8 text-balance">
            See a Terra Pod <span className="display-italic text-gold">in person.</span>
          </h2>
          <p className="lead-prose mx-auto mt-8 max-w-2xl">
            Private tours at our flagship pavilion in Northern California
            and at select client residences across the West Coast.
          </p>
          <Link href="/contact" className="btn-luxury mt-12">
            Book a private tour
            <span>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
