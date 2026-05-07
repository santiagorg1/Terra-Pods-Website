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
      <div className="sticky top-16 z-30 -mx-6 mb-12 border-y border-white/5 bg-ink-950/80 px-6 py-4 backdrop-blur-xl sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
          <div className="flex w-full gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <button
              type="button"
              onClick={() => setActive("all")}
              className={`flex-none rounded-full border px-4 py-2 text-xs uppercase tracking-[0.2em] transition-colors ${
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
                  className={`flex-none rounded-full border px-4 py-2 text-xs uppercase tracking-[0.2em] transition-colors ${
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

          <div className="flex flex-none items-center gap-2 text-xs uppercase tracking-[0.2em] text-ink-400">
            <span>Sort</span>
            {(["name", "price", "size"] as Sort[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSort(s)}
                className={`rounded-full border px-3 py-1.5 transition-colors ${
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
          transition={{ duration: 0.4 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((m, i) => {
            const accent = seriesByKey[m.seriesSlug]?.accent ?? "#c9a86a";
            return (
              <motion.div
                key={m.slug}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (i % 9) * 0.04, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={`/models/${m.slug}`}
                  className="group block h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] transition-colors hover:border-accent/40"
                >
                  <div className="relative aspect-[16/9] overflow-hidden border-b border-white/5 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04),transparent_70%)]">
                    <svg className="absolute inset-0 h-full w-full opacity-[0.05]">
                      <defs>
                        <pattern id={`b-grid-${m.slug}`} width="32" height="32" patternUnits="userSpaceOnUse">
                          <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="1" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#b-grid-${m.slug})`} />
                    </svg>
                    <div className="relative flex h-full items-center justify-center p-6">
                      <PodSilhouette
                        variant={m.silhouette}
                        color={accent}
                        className="h-full w-full max-w-[420px]"
                      />
                    </div>
                    <div className="absolute left-4 right-4 top-4 flex items-start justify-between">
                      <span className="rounded-full border border-white/20 bg-ink-950/60 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-ink-100 backdrop-blur-md">
                        {m.series}
                      </span>
                      {m.badge && (
                        <span className="rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-accent backdrop-blur-md">
                          {m.badge}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-baseline justify-between gap-3">
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.22em] text-ink-400">{m.tagline}</div>
                        <h3 className="mt-1 font-display text-2xl text-white">{m.short}</h3>
                      </div>
                      <span className="font-display text-lg text-accent">{formatUSD(m.startingPrice)}</span>
                    </div>
                    <div className="mt-5 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/5">
                      {[
                        ["Area", m.area],
                        ["Guests", m.guests],
                        ["Lead", m.delivery],
                      ].map(([k, v]) => (
                        <div key={k} className="bg-ink-950 px-2 py-3 text-center">
                          <div className="text-[9px] uppercase tracking-[0.22em] text-ink-400">{k}</div>
                          <div className="mt-1 text-xs font-medium text-white">{v}</div>
                        </div>
                      ))}
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
