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
      className="group relative h-full overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent transition-all duration-700 ease-cinema hover:border-accent/40 hover:shadow-[0_40px_120px_-40px_rgba(217,191,142,0.25)]"
    >
      <Link href={`/models/${model.slug}`} className="block h-full">
        {/* Stage */}
        <div className="relative aspect-[16/10] overflow-hidden border-b border-white/[0.06]">
          {/* Atmospheric glow */}
          <motion.div
            aria-hidden
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at center, ${seriesData.accent}1f, transparent 65%)`,
            }}
            variants={{
              rest: { opacity: 0.6 },
              hover: { opacity: 1 },
            }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
          <div className="pointer-events-none absolute inset-0 bg-vignette" />

          <motion.div
            variants={{ rest: { scale: 1, y: 0 }, hover: { scale: 1.04, y: -6 } }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex h-full w-full items-center justify-center p-10"
          >
            <PodSilhouette
              variant={model.silhouette}
              color={seriesData.accent}
              className="h-full w-full max-w-[420px]"
            />
          </motion.div>

          <div className="absolute left-6 right-6 top-6 flex items-start justify-between">
            <span className="text-[10px] uppercase tracking-[0.32em] text-ink-300">
              {model.series}
            </span>
            {model.badge && (
              <span className="rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-accent backdrop-blur-md">
                {model.badge}
              </span>
            )}
          </div>
        </div>

        {/* Caption */}
        <div className="p-8">
          <div className="flex items-baseline justify-between gap-4">
            <div>
              <span
                className="font-display text-[2.5rem] leading-none tracking-cinema"
                style={{ color: seriesData.accent }}
              >
                {model.short}
              </span>
              <div className="mt-2 text-[10px] uppercase tracking-[0.32em] text-ink-400">
                {model.tagline}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-[0.28em] text-ink-500">From</div>
              <div className="mt-1 font-display text-2xl text-accent">
                {formatUSD(model.startingPrice)}
              </div>
            </div>
          </div>

          <p className="mt-6 line-clamp-3 text-sm leading-relaxed text-ink-300">
            {model.description}
          </p>

          <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-6">
            <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.28em] text-ink-400">
              <span>{model.area}</span>
              <span className="h-3 w-px bg-white/15" />
              <span>{model.guests}</span>
            </div>
            <span className="btn-link-luxury">
              View{" "}
              <motion.span
                variants={{ rest: { x: 0 }, hover: { x: 6 } }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                →
              </motion.span>
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
