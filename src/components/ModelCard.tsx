"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Model } from "@/lib/data";
import { series } from "@/lib/data";
import { formatUSD } from "@/lib/format";
import PodSilhouette from "./PodSilhouette";

export default function ModelCard({ model }: { model: Model }) {
  const seriesData = series.find((s) => s.slug === model.seriesSlug)!;

  return (
    <motion.article
      whileHover="hover"
      initial="rest"
      animate="rest"
      className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] transition-colors duration-500 hover:border-accent/40"
    >
      <Link href={`/models/${model.slug}`} className="block h-full">
        {/* Silhouette panel */}
        <div className="relative aspect-[16/9] overflow-hidden border-b border-white/5 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04),transparent_70%)]">
          {/* subtle architectural grid */}
          <svg className="absolute inset-0 h-full w-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={`card-grid-${model.slug}`} width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#card-grid-${model.slug})`} />
          </svg>

          <motion.div
            variants={{ rest: { scale: 0.98 }, hover: { scale: 1.02 } }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex h-full w-full items-center justify-center p-8"
          >
            <PodSilhouette
              variant={model.silhouette}
              color={seriesData.accent}
              className="h-full w-full max-w-[420px]"
            />
          </motion.div>

          {/* badges */}
          <div className="absolute left-5 right-5 top-5 flex items-start justify-between">
            <span className="rounded-full border border-white/15 bg-ink-950/60 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-ink-100 backdrop-blur-md">
              {model.series}
            </span>
            {model.badge && (
              <span className="rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-accent backdrop-blur-md">
                {model.badge}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-7 sm:p-8">
          <div className="flex items-baseline justify-between gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-ink-400">{model.tagline}</div>
              <h3 className="mt-1 font-display text-3xl text-white">{model.short}</h3>
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-[0.22em] text-ink-400">From</div>
              <div className="font-display text-2xl text-accent">{formatUSD(model.startingPrice)}</div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/5">
            {[
              ["Area", model.area],
              ["Guests", model.guests],
              ["Lead", model.delivery],
            ].map(([k, v]) => (
              <div key={k} className="bg-ink-950 px-3 py-3 text-center">
                <div className="text-[9px] uppercase tracking-[0.22em] text-ink-400">{k}</div>
                <div className="mt-1 text-xs font-medium text-white">{v}</div>
              </div>
            ))}
          </div>

          <p className="mt-6 line-clamp-3 text-sm leading-relaxed text-ink-300">{model.description}</p>

          <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-5">
            <div className="flex items-center gap-2 text-xs text-ink-400">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span>{model.finish}</span>
            </div>
            <span className="btn-link">
              View model{" "}
              <motion.span variants={{ rest: { x: 0 }, hover: { x: 4 } }} transition={{ duration: 0.4 }}>
                →
              </motion.span>
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
