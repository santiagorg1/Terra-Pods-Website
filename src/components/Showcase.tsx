"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { models, series } from "@/lib/data";
import PodSilhouette from "./PodSilhouette";
import { formatUSD } from "@/lib/format";

const slugs = ["a9", "h5", "ae40-a", "r7"];
const featured = slugs
  .map((s) => models.find((m) => m.slug === s)!)
  .filter(Boolean);

export default function Showcase() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % featured.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  const current = featured[idx];
  const seriesData = series.find((s) => s.slug === current.seriesSlug)!;

  return (
    <section
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="scene-tall vignette grain"
    >
      {/* Atmosphere */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-ember-glow" />
        <motion.div
          key={`bg-${current.slug}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 2.4, ease: "easeOut" }}
          className="absolute left-1/2 top-1/2 h-[110vh] w-[110vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
          style={{ backgroundColor: `${seriesData.accent}1a` }}
        />
      </div>

      <div className="container-pod relative grid items-center gap-12 py-24 lg:grid-cols-12 lg:gap-16">
        {/* Caption */}
        <div className="lg:col-span-5">
          <span className="eyebrow">The 2028 collection</span>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mt-8 flex items-baseline gap-5">
                <span
                  className="font-display text-[clamp(4rem,9vw,7.5rem)] leading-none tracking-cinema"
                  style={{ color: seriesData.accent }}
                >
                  {current.short}
                </span>
                <span className="font-display italic text-2xl text-ink-300">
                  {current.tagline}
                </span>
              </div>

              <p className="lead-prose mt-8 max-w-md text-ink-200">
                {current.description}
              </p>

              <dl className="mt-12 grid grid-cols-3 gap-x-8 border-y border-white/5 py-6">
                {[
                  ["Footprint", current.area],
                  ["Capacity", current.guests],
                  ["From", formatUSD(current.startingPrice)],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-[10px] uppercase tracking-[0.28em] text-ink-500">{k}</dt>
                    <dd className="mt-2 font-display text-xl text-white">{v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-10 flex items-center gap-6">
                <Link
                  href={`/models/${current.slug}`}
                  className="btn-link-luxury"
                >
                  Step into the {current.short}
                  <span>→</span>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Silhouette stage */}
        <div className="relative lg:col-span-7">
          <div className="relative aspect-[16/10] w-full">
            {/* Stage glow */}
            <motion.div
              key={`glow-${current.slug}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at center, ${seriesData.accent}24, transparent 60%)`,
              }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={current.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <PodSilhouette
                  variant={current.silhouette}
                  color={seriesData.accent}
                  className="h-full w-full"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Series indicator dots */}
          <div className="mt-8 flex items-center justify-center gap-3">
            {featured.map((m, i) => (
              <button
                key={m.slug}
                onClick={() => setIdx(i)}
                aria-label={`Show ${m.short}`}
                className="group flex items-center gap-3"
              >
                <span
                  className={`h-px transition-all duration-700 ease-cinema ${
                    i === idx
                      ? "w-12 bg-accent"
                      : "w-6 bg-white/15 group-hover:bg-white/40"
                  }`}
                />
                <span
                  className={`text-[10px] uppercase tracking-[0.32em] transition-colors duration-500 ${
                    i === idx ? "text-accent" : "text-ink-500 group-hover:text-ink-300"
                  }`}
                >
                  {m.short}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
