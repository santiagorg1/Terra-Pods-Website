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
        eyebrow="Catalog Index"
        title={
          <>
            The 2028 collection, <span className="text-gold">at a glance.</span>
          </>
        }
        subtitle="Every model, organized by series — with elevation, footprint, capacity, finish, and starting price. Open any line to step into the model."
      />

      <section className="container-pod py-20 sm:py-24">
        <div className="space-y-24">
          {series.map((s) => {
            const items = models.filter((m) => m.seriesSlug === s.slug);
            return (
              <div key={s.slug}>
                <Reveal>
                  <div className="grid items-end gap-6 border-b border-white/5 pb-6 lg:grid-cols-12">
                    <div className="lg:col-span-7">
                      <div className="flex items-center gap-4">
                        <span
                          className="inline-flex h-12 w-12 items-center justify-center rounded-full border font-display text-base"
                          style={{ borderColor: `${s.accent}55`, color: s.accent }}
                        >
                          {s.shortCode}
                        </span>
                        <span className="text-[11px] uppercase tracking-[0.24em] text-ink-300">{s.tagline}</span>
                      </div>
                      <h2 className="display-3 mt-5">{s.name}</h2>
                      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-300">{s.description}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.22em] text-ink-400 lg:col-span-5 lg:justify-end">
                      <span>{items.length} model{items.length === 1 ? "" : "s"}</span>
                      <span className="h-3 w-px bg-white/15" />
                      <span>From {formatUSD(Math.min(...items.map((m) => m.startingPrice)))}</span>
                      <Link href={`/models?series=${s.slug}`} className="btn-link">
                        Browse <span>→</span>
                      </Link>
                    </div>
                  </div>
                </Reveal>

                {/* Tabular catalog index — typography-first */}
                <Reveal delay={0.05}>
                  <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
                    <div className="hidden grid-cols-[120px_1.5fr_1fr_1fr_1fr_1fr_auto] gap-6 border-b border-white/5 px-6 py-4 text-[10px] uppercase tracking-[0.22em] text-ink-500 lg:grid">
                      <div>Model</div>
                      <div>Designation</div>
                      <div>Area</div>
                      <div>Guests</div>
                      <div>Lead</div>
                      <div>Finish</div>
                      <div className="text-right">From</div>
                    </div>
                    <ul>
                      {items.map((m) => (
                        <li key={m.slug} className="border-b border-white/5 last:border-0">
                          <Link
                            href={`/models/${m.slug}`}
                            className="group grid items-center gap-x-6 gap-y-3 px-6 py-6 transition-colors hover:bg-white/[0.02] lg:grid-cols-[120px_1.5fr_1fr_1fr_1fr_1fr_auto]"
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
                              <div className="font-display text-2xl text-white">{m.short}</div>
                              <div className="mt-0.5 text-[11px] uppercase tracking-[0.22em] text-ink-400">
                                {m.tagline}
                              </div>
                            </div>
                            <div className="text-sm text-ink-200">
                              <span className="lg:hidden text-[10px] uppercase tracking-[0.22em] text-ink-500">Area · </span>
                              {m.area}
                            </div>
                            <div className="text-sm text-ink-200">
                              <span className="lg:hidden text-[10px] uppercase tracking-[0.22em] text-ink-500">Guests · </span>
                              {m.guests}
                            </div>
                            <div className="text-sm text-ink-200">
                              <span className="lg:hidden text-[10px] uppercase tracking-[0.22em] text-ink-500">Lead · </span>
                              {m.delivery}
                            </div>
                            <div className="text-sm text-ink-200">
                              <span className="lg:hidden text-[10px] uppercase tracking-[0.22em] text-ink-500">Finish · </span>
                              {m.finish}
                            </div>
                            <div className="flex items-baseline gap-3 text-right lg:justify-end">
                              <span className="font-display text-2xl text-accent">{formatUSD(m.startingPrice)}</span>
                              <span className="text-accent transition-transform group-hover:translate-x-1">→</span>
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

      <section className="container-pod py-20">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-10 text-center sm:p-16">
          <span className="eyebrow mx-auto justify-center">Site visits</span>
          <h2 className="display-2 mt-5">
            See a Terra Pod <span className="text-gold">in person.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-ink-300">
            We host private tours at our flagship pavilion in Northern California
            and at select client residences across the West Coast.
          </p>
          <Link href="/contact" className="btn-primary mt-8">
            Book a private tour
          </Link>
        </div>
      </section>
    </>
  );
}
