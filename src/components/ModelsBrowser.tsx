"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import type { Model, Series } from "@/lib/data";
import { formatUSD } from "@/lib/format";
import PodSilhouette from "./PodSilhouette";

type Sort = "name" | "price" | "size";

export default function ModelsBrowser({
  models,
  series,
  initialSeries,
}: {
  models: Model[];
  series: Series[];
  initialSeries?: string;
}) {
  const [active, setActive] = useState<string>(initialSeries ?? "all");
  const [sort, setSort] = useState<Sort>("name");

  const filtered = useMemo(() => {
    let list = active === "all" ? models : models.filter((m) => m.seriesSlug === active);
    list = [...list].sort((a, b) => {
      if (sort === "price") return a.startingPrice - b.startingPrice;
      if (sort === "size") return parseFloat(a.area) - parseFloat(b.area);
      return a.name.localeCompare(b.name);
    });
    return list;
  }, [active, sort, models]);

  const seriesByKey = Object.fromEntries(series.map((s) => [s.slug, s]));

  return (
    <>
      <div className="sticky top-16 z-30 -mx-6 mb-16 border-y border-white/[0.06] bg-ink-950/85 px-6 py-5 backdrop-blur-xl sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-5 lg:flex-row lg:items-center">
          <div className="flex w-full items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <span className="flex-none text-[10px] uppercase tracking-[0.32em] text-ink-500">
              Series
            </span>
            <span className="flex-none text-ink-700">·</span>
            <button
              type="button"
              onClick={() => setActive("all")}
              className={`flex-none rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.28em] transition-all duration-500 ${
                active === "all"
                  ? "border-accent/60 bg-accent/10 text-accent"
                  : "border-white/10 bg-white/[0.02] text-ink-300 hover:border-white/30"
              }`}
            >
              All · {models.length}
            </button>
            {series.map((s) => {
              const count = models.filter((m) => m.seriesSlug === s.slug).length;
              return (
                <button
                  key={s.slug}
                  type="button"
                  onClick={() => setActive(s.slug)}
                  className={`flex-none rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.28em] transition-all duration-500 ${
                    active === s.slug
                      ? "border-accent/60 bg-accent/10 text-accent"
                      : "border-white/10 bg-white/[0.02] text-ink-300 hover:border-white/30"
                  }`}
                >
                  {s.name} · {count}
                </button>
              );
            })}
          </div>

          <div className="flex flex-none items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-ink-500">
            <span>Sort</span>
            <span className="text-ink-700">·</span>
            {(["name", "price", "size"] as Sort[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSort(s)}
                className={`rounded-full border px-3 py-1.5 transition-all duration-500 ${
                  sort === s
                    ? "border-accent/60 bg-accent/10 text-accent"
                    : "border-white/10 bg-white/[0.02] text-ink-300 hover:border-white/30"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div
          key={active + sort}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((m, i) => {
            const accent = seriesByKey[m.seriesSlug]?.accent ?? "#c9a86a";
            return (
              <motion.div
                key={m.slug}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: (i % 9) * 0.04, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={`/models/${m.slug}`}
                  className="group block h-full overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent transition-all duration-700 ease-cinema hover:border-accent/40 hover:shadow-[0_40px_120px_-40px_rgba(217,191,142,0.25)]"
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
                        variant={m.silhouette}
                        color={accent}
                        className="h-full w-full max-w-[420px]"
                      />
                    </div>
                    <div className="absolute left-5 right-5 top-5 flex items-start justify-between">
                      <span className="text-[10px] uppercase tracking-[0.32em] text-ink-300">
                        {m.series}
                      </span>
                      {m.badge && (
                        <span className="rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-accent backdrop-blur-md">
                          {m.badge}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-7">
                    <div className="flex items-baseline justify-between gap-3">
                      <div>
                        <span
                          className="font-display text-[2.5rem] leading-none tracking-cinema"
                          style={{ color: accent }}
                        >
                          {m.short}
                        </span>
                        <div className="mt-2 text-[10px] uppercase tracking-[0.32em] text-ink-400">
                          {m.tagline}
                        </div>
                      </div>
                      <span className="font-display text-lg text-accent">{formatUSD(m.startingPrice)}</span>
                    </div>
                    <div className="mt-7 flex items-center gap-4 border-t border-white/5 pt-5 text-[10px] uppercase tracking-[0.28em] text-ink-400">
                      <span>{m.area}</span>
                      <span className="h-3 w-px bg-white/15" />
                      <span>{m.guests}</span>
                      <span className="h-3 w-px bg-white/15" />
                      <span>{m.delivery}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
