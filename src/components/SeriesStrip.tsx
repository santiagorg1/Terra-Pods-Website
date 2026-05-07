"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Model, Series } from "@/lib/data";
import { formatUSD } from "@/lib/format";
import PodSilhouette from "./PodSilhouette";

export default function SeriesStrip({
  series,
  models,
}: {
  series: Series;
  models: Model[];
}) {
  return (
    <section className="relative">
      <div className="container-pod">
        <div className="grid items-end gap-8 border-b border-white/5 pb-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 font-display text-base text-accent">
                {series.shortCode}
              </span>
              <span className="eyebrow !pl-0 !before:hidden">{series.tagline}</span>
            </div>
            <h3 className="display-3 mt-5">{series.name}</h3>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-300">
              {series.description}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.22em] text-ink-400 lg:col-span-5 lg:justify-end">
            <span>{models.length} model{models.length === 1 ? "" : "s"}</span>
            <span className="h-3 w-px bg-white/15" />
            <span>From {formatUSD(Math.min(...models.map((m) => m.startingPrice)))}</span>
            <Link href={`/models?series=${series.slug}`} className="btn-link">
              See series <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-10 overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="container-pod">
          <div className="flex gap-5">
            {models.map((m, i) => (
              <motion.div
                key={m.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="w-[300px] flex-none sm:w-[340px]"
              >
                <Link
                  href={`/models/${m.slug}`}
                  className="group block h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] transition-colors hover:border-accent/40"
                >
                  <div className="relative aspect-[16/9] overflow-hidden border-b border-white/5 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04),transparent_70%)]">
                    <div className="flex h-full items-center justify-center p-6">
                      <PodSilhouette
                        variant={m.silhouette}
                        color={series.accent}
                        className="h-full w-full"
                      />
                    </div>
                    {m.badge && (
                      <span className="absolute right-4 top-4 rounded-full border border-accent/40 bg-accent/15 px-2.5 py-1 text-[9px] uppercase tracking-[0.22em] text-accent backdrop-blur-md">
                        {m.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-baseline justify-between gap-3">
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.22em] text-ink-400">{m.tagline}</div>
                        <h4 className="mt-1 font-display text-2xl text-white">{m.short}</h4>
                      </div>
                      <span className="font-display text-base text-accent">{formatUSD(m.startingPrice)}</span>
                    </div>
                    <div className="mt-3 flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-ink-400">
                      <span>{m.area}</span>
                      <span className="h-3 w-px bg-white/15" />
                      <span>{m.guests}</span>
                      <span className="h-3 w-px bg-white/15" />
                      <span>{m.delivery}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
