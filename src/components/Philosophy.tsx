"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const tenets = [
  {
    n: "01",
    title: "Stillness",
    body: "A pod is not a building you fill — it is a space that frames the silence around it.",
  },
  {
    n: "02",
    title: "Permanence",
    body: "Five materials. Steel, aluminium, glass, stone, oak. Chosen for fifty years, not five.",
  },
  {
    n: "03",
    title: "Precision",
    body: "Every pod is built and inspected indoors, then delivered complete. The site is preserved.",
  },
];

export default function Philosophy() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["20%", "-15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.6]);

  return (
    <section ref={ref} className="scene relative py-32 sm:py-44">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-radial-fade" />
      </div>

      <div className="container-narrow relative">
        <motion.div style={{ y, opacity }}>
          <span className="eyebrow">A philosophy</span>

          <motion.blockquote
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 max-w-4xl"
          >
            <p className="display-2 leading-editorial text-balance">
              <span className="text-white/85">A Terra Pod is not a tiny home.</span>
              <br />
              <span className="display-italic text-gold">It is a complete architectural object</span>
              <span className="text-white/85"> — engineered with the precision of a Swiss watch and sited with the patience of a chapel.</span>
            </p>
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.4, delay: 0.4 }}
            className="mt-16 flex items-center gap-6"
          >
            <span className="block h-px w-16 bg-accent/60" />
            <span className="text-xs uppercase tracking-[0.32em] text-ink-300">
              Terra Pods Studio · Del Rio, Texas
            </span>
          </motion.div>
        </motion.div>

        <div className="mt-24 grid gap-10 sm:mt-32 sm:grid-cols-3 sm:gap-px sm:overflow-hidden sm:rounded-none sm:border-y sm:border-white/5">
          {tenets.map((t, i) => (
            <motion.article
              key={t.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.2, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="px-2 py-6 sm:px-10 sm:py-12"
            >
              <div className="font-display text-sm tracking-[0.3em] text-accent/80">
                {t.n}
              </div>
              <h3 className="mt-6 font-display text-3xl text-white">{t.title}</h3>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-300">
                {t.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
