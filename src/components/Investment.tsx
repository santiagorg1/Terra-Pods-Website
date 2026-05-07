"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const PILLARS = [
  {
    n: "01",
    title: "An asset, not a depreciation",
    body:
      "Engineered with structural steel and a fluorocarbon-sprayed aluminium shell — a 50-year design life, on permanent foundations.",
  },
  {
    n: "02",
    title: "A revenue line",
    body:
      "Add a Terra Pod to a property and add a hospitality category. Many of our owners list nights on private booking platforms with strong yields.",
  },
  {
    n: "03",
    title: "Tailored financing",
    body:
      "We work with specialised prefab and ADU lenders. Most clients secure rates within 0.25 – 0.75% of conventional construction.",
  },
];

const STATS = [
  ["50 yr", "Design life"],
  ["10 – 16 wk", "Lead time"],
  ["From $47.5k", "Studio capsule"],
  ["A++", "Energy class"],
];

export default function Investment() {
  return (
    <section className="scene relative py-32 sm:py-44">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="ambient-drift-a absolute left-[20%] top-1/4 h-[60vh] w-[60vh] rounded-full bg-accent/[0.06] blur-[100px]" />
        <div className="ambient-drift-b absolute right-[15%] bottom-[20%] h-[55vh] w-[55vh] rounded-full bg-azure-glow/[0.10] blur-[110px]" />
        <div className="ambient-drift-a absolute left-[40%] bottom-0 h-[45vh] w-[45vh] rounded-full bg-lapis/[0.16] blur-[100px]" />
      </div>

      <div className="container-pod relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <span className="eyebrow">Lifestyle &amp; investment</span>
            <h2 className="display-2 mt-8 text-balance">
              An aluminium <span className="display-italic text-twilight">asset</span>,
              sited quietly.
            </h2>
            <p className="lead-prose mt-10 max-w-md text-ink-200">
              A Terra Pod is two things at once: a residence engineered for stillness, and an architectural asset that compounds value the moment it's installed.
            </p>

            <div className="mt-12 flex flex-col gap-3 sm:flex-row">
              <Link href="/financing" className="btn-luxury">
                Model the investment
                <span>→</span>
              </Link>
              <Link href="/contact" className="btn-link">
                Speak with an advisor <span>↗</span>
              </Link>
            </div>
          </motion.div>

          <div className="lg:col-span-7">
            <ol className="space-y-10">
              {PILLARS.map((p, i) => (
                <motion.li
                  key={p.n}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 1.1,
                    delay: i * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="grid grid-cols-[auto_1fr] gap-6 border-b border-white/5 pb-8 last:border-0 sm:gap-10"
                >
                  <div className="font-display italic text-base text-accent sm:text-lg">
                    {p.n}
                  </div>
                  <div>
                    <h3 className="font-display text-2xl text-white sm:text-3xl">
                      {p.title}
                    </h3>
                    <p className="mt-4 max-w-lg text-base leading-relaxed text-ink-300">
                      {p.body}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>

        {/* Closing stat ledger */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-24 grid grid-cols-2 gap-y-10 border-y border-white/5 py-10 lg:grid-cols-4"
        >
          {STATS.map(([k, v]) => (
            <div key={k}>
              <div className="text-[10px] uppercase tracking-[0.32em] text-ink-500">
                {v}
              </div>
              <div className="mt-3 font-display text-2xl text-white sm:text-3xl">
                {k}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
