"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { models, series } from "@/lib/data";
import PodSilhouette from "./PodSilhouette";

const showcase = ["a9", "h5", "ae40-a", "w9", "r7"]
  .map((s) => models.find((m) => m.slug === s)!)
  .filter(Boolean);

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const yArt = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % showcase.length), 4200);
    return () => clearInterval(t);
  }, []);
  const current = showcase[idx];
  const seriesData = series.find((s) => s.slug === current.seriesSlug)!;

  return (
    <section ref={ref} className="relative overflow-hidden pt-32 sm:pt-40 lg:pt-44">
      {/* Background field — gradient glow + architectural grid */}
      <motion.div aria-hidden style={{ y: yBg }} className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-[80vh] bg-radial-glow" />
        <div className="absolute left-1/2 top-1/4 h-[80vh] w-[80vh] -translate-x-1/2 rounded-full bg-accent/[0.05] blur-3xl" />
        <div className="absolute right-[5%] top-[40%] h-[40vh] w-[40vh] rounded-full bg-moss/[0.08] blur-3xl" />
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.07]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="hero-grid" width="56" height="56" patternUnits="userSpaceOnUse">
              <path d="M 56 0 L 0 0 0 56" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </motion.div>

      <div className="container-pod relative">
        <div className="max-w-5xl">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow"
          >
            2028 Catalog · 10 series · 26 models
          </motion.span>

          <h1 className="display-1 mt-6 text-balance">
            {["Architectural pods,", "composed precisely."].map((line, li) => (
              <motion.span
                key={line}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.05 + li * 0.18, ease: [0.22, 1, 0.36, 1] }}
                className={`block ${li === 1 ? "text-gold" : ""}`}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="lead mt-7 max-w-2xl text-balance"
          >
            From a 16 m² studio capsule to a 45 m² flagship residence —
            engineered in our factory and delivered complete on a single
            truck. Choose your shell, configure your interior, reserve your build slot.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55 }}
            className="mt-10 flex flex-col items-start gap-3 sm:flex-row"
          >
            <Link href="/models" className="btn-primary group">
              Explore the catalog
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
            <Link href="/financing" className="btn-ghost">
              Financing calculator
            </Link>
          </motion.div>
        </div>

        {/* Showcase: cycling pod silhouette */}
        <motion.div
          style={{ y: yArt }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="relative mt-20 sm:mt-24"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-8 sm:p-12">
            {/* Top metadata strip */}
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-accent/40 font-display text-sm text-accent">
                  {seriesData.shortCode}
                </span>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.24em] text-ink-400">{seriesData.name}</div>
                  <div className="font-display text-2xl text-white">{current.short}</div>
                </div>
              </div>
              <div className="flex items-center gap-6 text-[11px] uppercase tracking-[0.22em] text-ink-300">
                <span className="text-accent">{current.area}</span>
                <span className="hidden h-3 w-px bg-white/15 sm:inline" />
                <span>{current.guests}</span>
                <span className="hidden h-3 w-px bg-white/15 sm:inline" />
                <span>From ${(current.startingPrice / 1000).toFixed(1)}k</span>
              </div>
            </div>

            {/* Silhouette */}
            <div className="relative mt-6 aspect-[3/1] w-full">
              <motion.div
                key={current.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <PodSilhouette
                  variant={current.silhouette}
                  color={seriesData.accent}
                  className="h-full w-full"
                  animated
                />
              </motion.div>
            </div>

            {/* Series tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {showcase.map((m, i) => (
                <button
                  key={m.slug}
                  onClick={() => setIdx(i)}
                  className={`group flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] uppercase tracking-[0.22em] transition-colors ${
                    i === idx
                      ? "border-accent/60 bg-accent/10 text-accent"
                      : "border-white/10 bg-white/[0.02] text-ink-400 hover:border-white/30"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full transition-colors ${
                      i === idx ? "bg-accent" : "bg-ink-500"
                    }`}
                  />
                  {m.short}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom stats strip */}
          <div className="relative mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-4">
            {[
              ["26", "models"],
              ["10", "series"],
              ["10–16 wk", "lead time"],
              ["100%", "factory-built"],
            ].map(([k, v]) => (
              <div key={k} className="bg-ink-950/70 px-5 py-6 text-center backdrop-blur-md">
                <div className="font-display text-2xl text-white sm:text-3xl">{k}</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-ink-300">{v}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
