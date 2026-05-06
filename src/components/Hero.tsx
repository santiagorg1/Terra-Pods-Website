"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 sm:pt-40 lg:pt-44">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-[60vh] bg-radial-glow" />
        <div className="absolute left-1/2 top-1/3 h-[80vh] w-[80vh] -translate-x-1/2 rounded-full bg-accent/[0.04] blur-3xl" />
      </div>

      <div className="container-pod relative">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          <span className="eyebrow mx-auto justify-center">
            New · 2026 Collection
          </span>
          <h1 className="display-1 mt-6 text-balance">
            <span className="block">Architectural pods,</span>
            <span className="block text-gold">engineered for life.</span>
          </h1>
          <p className="lead mx-auto mt-8 max-w-2xl text-balance">
            Terra Pods designs and manufactures premium prefabricated residences.
            Off-grid capable. Architecturally crafted. Delivered ready to inhabit.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/models" className="btn-primary group">
              Explore Models
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
            <Link href="/financing" className="btn-ghost">
              Calculate Financing
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-16 aspect-[16/9] max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent shadow-[0_50px_120px_-40px_rgba(0,0,0,0.8)]"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=80')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 grid grid-cols-2 gap-px overflow-hidden md:grid-cols-4">
            {[
              ["1,100", "sq ft flagship"],
              ["12 wk", "lead time"],
              ["100%", "factory-built"],
              ["10 yr", "structural warranty"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="bg-ink-950/60 px-5 py-5 text-center backdrop-blur-md sm:px-8 sm:py-6"
              >
                <div className="font-display text-2xl text-white sm:text-3xl">{k}</div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-ink-300">
                  {v}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
