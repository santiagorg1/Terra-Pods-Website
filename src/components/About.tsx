"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Reveal from "./Reveal";

const PILLARS = [
  {
    k: "01",
    t: "Customs Brokerage",
    d: "Licensed U.S. entry filing — ACE, ISF, AES, FTZ, in-bond, reconciliation, and bond services.",
  },
  {
    k: "02",
    t: "Freight Forwarding",
    d: "Northbound and southbound movement by land, air, and ocean. HAZMAT-certified, cross-docked.",
  },
  {
    k: "03",
    t: "Logistics & Warehousing",
    d: "CBP-bonded warehouses, bonded yards, contract logistics. Forklifts and heavy equipment, 24/7.",
  },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "10%"]);

  return (
    <section
      id="about"
      ref={ref}
      className="scene-dark relative py-28 sm:py-36"
    >
      <div className="container-page">
        <div className="grid items-start gap-16 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <Reveal>
              <span className="eyebrow">Who we are</span>
              <h2 className="display-2 mt-6">
                One team for the
                <br />
                <span className="text-grad-brand">entire border lifecycle.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="lead-prose mt-8 max-w-xl">
                ISN Customs Broker International simplifies cross-border trade.
                Licensed U.S. customs brokerage and integrated logistics —
                compliant shipments, predictable costs, freight that keeps
                moving. One team. One invoice.
              </p>
            </Reveal>

            <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]">
              {PILLARS.map((p, i) => (
                <Reveal as="li" delay={0.15 + i * 0.08} key={p.t}>
                  <div className="group flex items-start gap-6 bg-ink-950/40 px-6 py-6 transition-colors hover:bg-ink-900/60 sm:px-8">
                    <div className="font-display text-sm font-medium tracking-tight text-brand-soft">
                      {p.k}
                    </div>
                    <div>
                      <div className="display-4">{p.t}</div>
                      <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-300">
                        {p.d}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal>
            <div className="relative aspect-[5/6] overflow-hidden rounded-3xl border border-white/[0.08]">
              <motion.div
                style={{ y: imgY }}
                className="absolute inset-x-0 -top-[8%] -bottom-[8%] will-change-transform"
              >
                <Image
                  src="/isn/global-network.jpg"
                  alt="Global logistics network overlay across aerial port and city skyline"
                  fill
                  sizes="(min-width:1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />

              {/* Floating label */}
              <div className="absolute inset-x-6 bottom-6 sm:inset-x-8 sm:bottom-8">
                <div className="glass rounded-2xl p-5">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-brand-soft">
                    Del Rio, Texas
                  </div>
                  <div className="mt-2 font-display text-base font-medium text-white">
                    One of the busiest commercial crossings on the
                    U.S.–Mexico border.
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
