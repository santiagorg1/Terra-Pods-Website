"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Reveal from "./Reveal";

const MODES = [
  {
    tag: "Land",
    title: "Northbound & southbound transfers",
    image: "/isn/hero-port.jpg",
    bullets: [
      "Daily cross-border movements at Texas ports of entry",
      "Dedicated lanes for time-sensitive shipments",
      "HAZMAT-certified transfers with full DOT/CBP compliance",
    ],
  },
  {
    tag: "Air",
    title: "Air freight, origin to destination",
    image: "/isn/air-cargo.jpg",
    bullets: [
      "Coordinated international air cargo from global suppliers",
      "Time-critical handling at major U.S. gateways",
      "Door-to-door visibility and customs pre-clearance",
    ],
  },
  {
    tag: "Ocean",
    title: "Ocean freight & port coordination",
    image: "/isn/port-aerial.jpg",
    bullets: [
      "FCL and LCL ocean coordination worldwide",
      "ISF 10+2 filing pre-loaded against every booking",
      "Drayage and cross-dock at U.S. ports of arrival",
    ],
  },
];

export default function Freight() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      id="freight"
      ref={ref}
      className="scene-dark relative overflow-hidden py-28 sm:py-36"
    >
      {/* Subtle parallax backdrop */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-x-0 -top-[10%] -bottom-[10%] -z-10 opacity-[0.18]"
      >
        <Image
          src="/isn/logistics-strategy.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink-950/60" />
      </motion.div>

      <div className="container-page">
        <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <span className="eyebrow">Service 02 · Freight Forwarding</span>
            <h2 className="display-2 mt-6">
              Moving cargo across
              <br />
              <span className="text-grad-brand">borders, oceans, and skies.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead-prose lg:max-w-md">
              We coordinate the physical movement of your goods across the
              U.S.–Mexico border and beyond — trucking, ocean, and air freight
              under one accountable team. One invoice. No handoff gaps.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 space-y-6">
          {MODES.map((m, i) => (
            <Reveal key={m.tag} delay={i * 0.05}>
              <article className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025]">
                <div className="grid items-stretch md:grid-cols-[1.1fr_1fr]">
                  <div className="relative aspect-[16/10] md:aspect-auto">
                    <Image
                      src={m.image}
                      alt={m.title}
                      fill
                      sizes="(min-width:768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-[1500ms] ease-cinema group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-ink-950/35 via-transparent to-ink-950/40" />
                    <div className="absolute left-6 top-6">
                      <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.28em] text-white backdrop-blur-md">
                        {m.tag}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
                    <h3 className="display-3 !text-2xl sm:!text-3xl">
                      {m.title}
                    </h3>
                    <ul className="mt-6 space-y-3">
                      {m.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-3 text-sm leading-relaxed text-ink-200"
                        >
                          <span
                            aria-hidden
                            className="mt-2 inline-block h-px w-5 flex-none bg-brand/70"
                          />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* One-invoice strip */}
        <Reveal>
          <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-3xl border border-brand/30 bg-brand/[0.06] p-8 sm:flex-row sm:items-center sm:p-10">
            <div>
              <div className="text-[11px] uppercase tracking-[0.28em] text-brand-soft">
                One invoice
              </div>
              <div className="display-3 mt-3 !text-xl sm:!text-2xl">
                Land, air, ocean — coordinated under one accountable team.
              </div>
            </div>
            <a href="#contact" className="btn-primary whitespace-nowrap">
              Quote a shipment
              <span aria-hidden>→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
