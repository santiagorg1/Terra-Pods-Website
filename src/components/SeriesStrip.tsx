"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Model, Series } from "@/lib/data";
import { formatUSD } from "@/lib/format";

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
        <div className="flex flex-col items-start justify-between gap-6 border-b border-white/5 pb-8 md:flex-row md:items-end">
          <div className="max-w-xl">
            <span className="eyebrow">{series.tagline}</span>
            <h3 className="display-3 mt-4">{series.name}</h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-300">
              {series.description}
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs uppercase tracking-[0.22em] text-ink-400">
            <span>{models.length} model{models.length === 1 ? "" : "s"}</span>
            <span className="h-3 w-px bg-white/15" />
            <span>From {formatUSD(Math.min(...models.map((m) => m.startingPrice)))}</span>
          </div>
        </div>
      </div>

      <div className="mt-10 overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="container-pod">
          <div className="flex gap-5">
            {models.map((m, i) => (
              <motion.div
                key={m.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="w-[280px] flex-none sm:w-[320px]"
              >
                <Link
                  href={`/models/${m.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-white/10 bg-[#fbfaf6] transition-colors hover:border-accent/40"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={m.catalogImage}
                      alt={m.name}
                      fill
                      sizes="320px"
                      className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 via-transparent to-transparent" />
                  </div>
                  <div className="bg-ink-950 p-5">
                    <div className="flex items-baseline justify-between gap-3">
                      <h4 className="font-display text-xl text-white">{m.name.replace("Terra Pod ", "")}</h4>
                      <span className="text-[11px] uppercase tracking-[0.22em] text-accent">
                        {formatUSD(m.startingPrice)}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-ink-400">
                      <span>{m.area}</span>
                      <span className="h-3 w-px bg-white/15" />
                      <span>{m.guests}</span>
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
