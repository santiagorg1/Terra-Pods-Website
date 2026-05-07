"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { models, series } from "@/lib/data";
import PodSilhouette from "./PodSilhouette";
import { formatUSD } from "@/lib/format";

export default function SeriesIndex() {
  return (
    <section className="scene relative py-32 sm:py-44">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-radial-fade" />

      <div className="container-pod relative">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <span className="eyebrow">The collection</span>
            <h2 className="display-2 mt-7 text-balance">
              Ten series, one <span className="display-italic text-gold">design language</span>.
            </h2>
          </div>
          <Link href="/models" className="btn-link-luxury">
            Open the catalog <span>→</span>
          </Link>
        </div>

        <div className="mt-20">
          <ul>
            {series.map((s, i) => {
              const items = models.filter((m) => m.seriesSlug === s.slug);
              const minPrice = Math.min(...items.map((m) => m.startingPrice));
              const exemplar = items[0];
              return (
                <motion.li
                  key={s.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 1, delay: (i % 5) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="group border-t border-white/5 last:border-b"
                >
                  <Link
                    href={`/models?series=${s.slug}`}
                    className="grid items-center gap-x-8 gap-y-4 py-8 transition-colors duration-700 ease-cinema hover:bg-white/[0.015] sm:py-10 lg:grid-cols-[80px_1.6fr_1fr_1fr_140px_auto]"
                  >
                    {/* Series shortcode */}
                    <div className="flex items-center">
                      <span
                        className="font-display text-3xl tracking-cinema transition-colors duration-700 sm:text-4xl"
                        style={{ color: s.accent }}
                      >
                        {s.shortCode}
                      </span>
                    </div>

                    {/* Name + tagline */}
                    <div>
                      <h3 className="font-display text-2xl text-white sm:text-3xl">{s.name}</h3>
                      <div className="mt-1 text-[11px] uppercase tracking-[0.28em] text-ink-400">
                        {s.tagline}
                      </div>
                    </div>

                    {/* Description (desktop) */}
                    <p className="hidden text-sm leading-relaxed text-ink-300 lg:col-span-1 lg:block">
                      {s.description.split(".")[0]}.
                    </p>

                    {/* Series exemplar render */}
                    <div className="hidden h-16 w-full items-center lg:flex">
                      <PodSilhouette
                        slug={exemplar.slug}
                        color={s.accent}
                        label={exemplar.name}
                        className="h-full w-full"
                        animated={false}
                        showGround={false}
                      />
                    </div>

                    {/* Counts */}
                    <div className="text-right text-[11px] uppercase tracking-[0.28em] text-ink-300">
                      <div>{items.length} model{items.length === 1 ? "" : "s"}</div>
                      <div className="mt-1 text-accent">From {formatUSD(minPrice)}</div>
                    </div>

                    {/* Arrow */}
                    <span className="text-2xl text-accent transition-transform duration-700 ease-cinema group-hover:translate-x-2">
                      →
                    </span>
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
