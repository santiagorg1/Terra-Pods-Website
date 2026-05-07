"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const stages = [
  {
    n: "I",
    title: "Discovery",
    body: "We learn about your site, your goals, and your timeline. A specialist responds within one business day.",
    span: "Week 0",
  },
  {
    n: "II",
    title: "Configuration",
    body: "Choose your series and length. Specify finish, optional packages, and any custom millwork.",
    span: "Week 1 – 2",
  },
  {
    n: "III",
    title: "Manufacture",
    body: "Your pod is built and inspected indoors. We hold weekly progress reviews until completion.",
    span: "Week 3 – 14",
  },
  {
    n: "IV",
    title: "Arrival",
    body: "We deliver and install — turn-key — in a single day on site. Your only job is to step inside.",
    span: "Day of arrival",
  },
];

export default function ProcessTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 60%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="scene py-32 sm:py-44">
      <div className="container-pod">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <span className="eyebrow">From inquiry to arrival</span>
            <h2 className="display-2 mt-7 text-balance">
              The <span className="display-italic text-gold">unhurried</span> process.
            </h2>
            <p className="lead mt-8 max-w-xs">
              From the first call to the moment we step out and leave you to it,
              the process is engineered for stillness on your end and precision on ours.
            </p>
          </div>

          <div ref={ref} className="relative lg:col-span-8">
            {/* Static rail */}
            <div className="absolute bottom-0 left-7 top-0 w-px bg-white/10 sm:left-10" />
            {/* Animated rail (scroll-driven) */}
            <motion.div
              style={{ height: lineHeight }}
              className="absolute left-7 top-0 w-px bg-gradient-to-b from-accent via-accent/60 to-transparent sm:left-10"
            />

            <ol className="space-y-16 sm:space-y-20">
              {stages.map((s, i) => (
                <motion.li
                  key={s.n}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 1, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="relative grid grid-cols-[56px_1fr] items-start gap-6 sm:grid-cols-[80px_1fr] sm:gap-10"
                >
                  <div className="flex items-center justify-center pt-2">
                    <span className="relative grid h-14 w-14 place-items-center rounded-full border border-accent/30 bg-ink-950 font-display text-base text-accent sm:h-16 sm:w-16 sm:text-lg">
                      {s.n}
                      <span className="absolute inset-0 -z-10 rounded-full bg-accent/10 blur-md" />
                    </span>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.32em] text-ink-400">
                      {s.span}
                    </div>
                    <h3 className="mt-3 font-display text-3xl text-white sm:text-4xl">{s.title}</h3>
                    <p className="mt-4 max-w-md text-base leading-relaxed text-ink-300">{s.body}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
