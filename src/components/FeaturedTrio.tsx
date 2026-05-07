"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { models, series } from "@/lib/data";
import PodSilhouette from "./PodSilhouette";
import { formatUSD } from "@/lib/format";

const slugs = ["a9", "ae40-a", "a9d"];

export default function FeaturedTrio() {
  const items = slugs.map((s) => models.find((m) => m.slug === s)!).filter(Boolean);

  return (
    <section className="scene py-32 sm:py-44">
      <div className="container-pod">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <span className="eyebrow">A curator's selection</span>
            <h2 className="display-2 mt-7 text-balance">
              Three to <span className="display-italic text-gold">begin with</span>.
            </h2>
          </div>
          <Link href="/models" className="btn-link-luxury">
            All twenty-six <span>→</span>
          </Link>
        </div>
      </div>

      <div className="mt-20 space-y-32 sm:space-y-44">
        {items.map((m, i) => {
          const reverse = i % 2 === 1;
          const seriesData = series.find((s) => s.slug === m.seriesSlug)!;
          return (
            <motion.article
              key={m.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              className="container-pod"
            >
              <div className={`grid items-center gap-12 lg:grid-cols-12 lg:gap-16 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
                {/* Stage */}
                <div className="relative lg:col-span-7">
                  <div className="relative aspect-[16/10] w-full">
                    <div
                      aria-hidden
                      className="absolute inset-0 rounded-[2rem]"
                      style={{
                        background: `radial-gradient(ellipse at center, ${seriesData.accent}1f, transparent 65%)`,
                      }}
                    />
                    <div className="relative flex h-full items-center justify-center px-8">
                      <PodSilhouette
                        slug={m.slug}
                        color={seriesData.accent}
                        label={m.name}
                        className="h-full w-full"
                      />
                    </div>
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-vignette"
                    />
                  </div>

                  <div className="mt-6 flex items-center gap-4 text-[10px] uppercase tracking-[0.32em] text-ink-500">
                    <span>{m.dimensions}</span>
                    <span className="h-3 w-px bg-white/15" />
                    <span>{m.weight}</span>
                    <span className="h-3 w-px bg-white/15" />
                    <span>{m.delivery}</span>
                  </div>
                </div>

                {/* Caption */}
                <div className="lg:col-span-5">
                  <span
                    className="font-display text-[clamp(3.5rem,7vw,5.5rem)] leading-none tracking-cinema"
                    style={{ color: seriesData.accent }}
                  >
                    {m.short}
                  </span>
                  <div className="mt-2 flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-ink-300">
                    <span>{m.series}</span>
                    {m.badge && (
                      <>
                        <span className="h-3 w-px bg-white/15" />
                        <span className="text-accent">{m.badge}</span>
                      </>
                    )}
                  </div>

                  <h3 className="mt-8 font-display text-3xl italic text-white sm:text-4xl">
                    {m.tagline}
                  </h3>

                  <p className="mt-6 max-w-md text-base leading-relaxed text-ink-200 sm:text-lg">
                    {m.description}
                  </p>

                  <div className="mt-10 flex items-end justify-between border-t border-white/5 pt-6">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.28em] text-ink-500">
                        From
                      </div>
                      <div className="mt-1 font-display text-3xl text-accent">
                        {formatUSD(m.startingPrice)}
                      </div>
                    </div>
                    <Link href={`/models/${m.slug}`} className="btn-link-luxury">
                      Step inside <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
