"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Model } from "@/lib/data";
import { formatUSD } from "@/lib/format";

export default function ModelCard({ model }: { model: Model }) {
  return (
    <motion.article
      whileHover="hover"
      initial="rest"
      animate="rest"
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] transition-colors duration-500 hover:border-accent/40"
    >
      <Link href={`/models/${model.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-[#fbfaf6]">
          <motion.div
            variants={{ rest: { scale: 1.02 }, hover: { scale: 1.06 } }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={model.catalogImage}
              alt={`${model.name} catalog page`}
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover"
            />
          </motion.div>

          <div className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${model.accent}`} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent" />

          <div className="absolute left-6 right-6 top-6 flex items-start justify-between">
            <span className="eyebrow !text-ink-100">{model.series}</span>
            {model.badge && (
              <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-accent backdrop-blur-md">
                {model.badge}
              </span>
            )}
          </div>

          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
            <div>
              <h3 className="font-display text-3xl text-white">{model.name}</h3>
              <div className="mt-1.5 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-ink-200">
                <span>{model.area}</span>
                <span className="h-3 w-px bg-white/20" />
                <span>{model.guests}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-[0.22em] text-ink-300">From</div>
              <div className="font-display text-2xl text-accent">
                {formatUSD(model.startingPrice)}
              </div>
            </div>
          </div>
        </div>
        <div className="p-7 sm:p-8">
          <p className="text-sm leading-relaxed text-ink-300 line-clamp-3">{model.description}</p>
          <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/5 pt-5">
            <div className="flex items-center gap-2 text-xs text-ink-400">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span>{model.delivery} lead time</span>
            </div>
            <span className="btn-link">
              View model <motion.span variants={{ rest: { x: 0 }, hover: { x: 4 } }} transition={{ duration: 0.4 }}>→</motion.span>
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
