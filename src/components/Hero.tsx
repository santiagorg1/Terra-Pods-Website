"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yHead = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const opacityHead = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="scene-tall vignette grain pt-24 sm:pt-28"
    >
      {/* Atmospheric background — gold + cool blue */}
      <motion.div aria-hidden style={{ y: yBg }} className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-warm-night" />
        <div className="absolute inset-x-0 top-0 h-[80vh] bg-radial-glow" />
        {/* Warm gold core */}
        <div className="absolute left-[20%] top-[28%] h-[80vh] w-[80vh] rounded-full bg-accent/[0.07] blur-[110px]" />
        {/* Cool azure counterpoint */}
        <div className="absolute right-[5%] top-[18%] h-[70vh] w-[70vh] rounded-full bg-azure-glow/[0.10] blur-[120px]" />
        {/* Distant lapis depth */}
        <div className="absolute left-[5%] bottom-[5%] h-[50vh] w-[50vh] rounded-full bg-lapis/[0.18] blur-[100px]" />
        {/* Light leak */}
        <div className="absolute inset-y-0 left-[-10%] w-[35%] animate-lightPan bg-gradient-to-r from-transparent via-accent/[0.05] to-transparent" />
      </motion.div>

      <motion.div
        style={{ y: yHead, opacity: opacityHead }}
        className="container-narrow relative flex flex-1 flex-col items-center justify-center text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="eyebrow-center"
        >
          Terra Pods · 2028
        </motion.span>

        <h1 className="display-1 mt-12 max-w-[14ch] sm:mt-14">
          <motion.span
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="block"
          >
            Architectural pods,
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="block"
          >
            <span className="display-italic text-twilight">quietly</span>
            <span className="text-white/95"> composed.</span>
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lead-prose mt-14 max-w-xl text-balance text-ink-200 sm:mt-16"
        >
          Ten series. Twenty-six models.
          <br className="hidden sm:block" /> From a sixteen-square-metre studio to a forty-five-square-metre flagship — engineered in our factory, delivered complete.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 flex flex-col items-center gap-6 sm:mt-20"
        >
          <Link href="/models" className="btn-luxury">
            Explore the catalog
            <span className="text-base">→</span>
          </Link>
          <Link href="/financing" className="btn-link">
            Or model your investment <span>↓</span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 1.4 }}
        className="relative mb-14 flex flex-col items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-ink-400"
      >
        <span>Scroll</span>
        <span className="block h-14 w-px bg-gradient-to-b from-accent/60 via-azure/40 to-transparent" />
      </motion.div>
    </section>
  );
}
