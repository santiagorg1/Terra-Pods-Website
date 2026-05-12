"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const BADGES = [
  ["35+", "Years on the border"],
  ["C-TPAT", "Validated member"],
  ["24 / 7", "365 days a year"],
  ["RLF", "Nationwide filing"],
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={ref}
      className="scene-dark relative min-h-[100svh] w-full"
      aria-label="Hero"
    >
      {/* Cinematic background */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 -z-10 will-change-transform"
      >
        <Image
          src="/isn/hero-port.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/65 via-ink-950/40 to-ink-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(10,132,255,0.18),transparent_55%)]" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="container-page relative flex min-h-[100svh] flex-col justify-end pb-12 pt-32 sm:pb-20 sm:pt-40"
      >
        <div className="max-w-5xl">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow"
          >
            Company Profile · 2026
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="display-1 mt-6"
          >
            Take control of
            <br />
            your <span className="text-grad-brand">border</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lead-prose mt-8 max-w-2xl"
          >
            Licensed U.S. customs brokerage, freight forwarding, and integrated
            logistics — coordinated under one accountable team, with 35 years on
            the U.S.–Mexico border.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a href="#contact" className="btn-primary">
              Start a shipment
              <span aria-hidden>→</span>
            </a>
            <a href="#services" className="btn-ghost">
              Explore services
            </a>
          </motion.div>
        </div>

        {/* Trust badges row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-md sm:mt-24 sm:grid-cols-4"
        >
          {BADGES.map(([n, label]) => (
            <div key={n} className="bg-ink-950/40 px-6 py-5">
              <div className="font-display text-xl font-medium tracking-tight text-white sm:text-2xl">
                {n}
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.22em] text-ink-300">
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
        <div className="flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-ink-300/80">
          <span>Scroll</span>
          <span className="h-8 w-px animate-scrollHint bg-gradient-to-b from-white/60 to-transparent" />
        </div>
      </div>
    </section>
  );
}
