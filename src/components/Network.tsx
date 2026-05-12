"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Reveal from "./Reveal";

const NODES = [
  { x: 18, y: 38, label: "Pacific gateway" },
  { x: 32, y: 58, label: "Del Rio, TX" },
  { x: 42, y: 30, label: "U.S. Midwest" },
  { x: 55, y: 22, label: "Atlantic ports" },
  { x: 70, y: 44, label: "Europe" },
  { x: 84, y: 58, label: "Asia & ME" },
];

export default function Network() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "12%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.12]);

  return (
    <section
      id="network"
      ref={ref}
      className="scene-dark relative h-[110vh] min-h-[820px] overflow-hidden"
    >
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 -z-10 will-change-transform"
      >
        <Image
          src="/isn/global-network.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink-950/55" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,transparent,rgba(4,6,11,0.85))]" />
      </motion.div>

      <div className="container-page sticky top-0 flex h-screen flex-col justify-center">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <Reveal>
              <span className="eyebrow">Global network</span>
              <h2 className="display-2 mt-6">
                A border hub
                <br />
                with global reach.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="lead-prose mt-8 max-w-lg">
                Headquartered at one of the busiest commercial crossings on the
                U.S.–Mexico border, ISN clears and coordinates cargo at any U.S.
                port — and connects it to origin and destination markets on
                every continent.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] sm:grid-cols-3">
                {[
                  ["Land", "NB & SB"],
                  ["Air", "Global gateways"],
                  ["Ocean", "FCL · LCL"],
                  ["Rail", "Interchange"],
                  ["RLF", "U.S. nationwide"],
                  ["CBP", "Direct access"],
                ].map(([k, v]) => (
                  <div key={k} className="bg-ink-950/40 px-5 py-4">
                    <div className="font-display text-base font-medium tracking-tight text-white">
                      {k}
                    </div>
                    <div className="mt-1 text-[11px] uppercase tracking-[0.22em] text-ink-300">
                      {v}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Radar / node visualisation */}
          <Reveal delay={0.05}>
            <div className="relative mx-auto aspect-square w-full max-w-[560px]">
              {/* Concentric rings */}
              {[0.3, 0.55, 0.8, 1].map((r, i) => (
                <div
                  key={r}
                  className="absolute inset-0 rounded-full border border-brand/20"
                  style={{
                    transform: `scale(${r})`,
                    opacity: 0.4 + i * 0.12,
                  }}
                />
              ))}
              {/* Sweep */}
              <div className="absolute inset-0">
                <div
                  className="absolute left-1/2 top-1/2 h-1/2 w-px origin-top -translate-x-1/2 bg-gradient-to-b from-brand/0 via-brand/60 to-brand/0 radar-sweep"
                />
                <div
                  className="absolute left-1/2 top-1/2 h-1/2 w-[40%] origin-top-left -translate-y-0 radar-sweep"
                  style={{
                    background:
                      "conic-gradient(from 0deg at 0% 0%, rgba(10,132,255,0.20), transparent 35%)",
                  }}
                />
              </div>
              {/* Nodes */}
              {NODES.map((n, i) => (
                <div
                  key={n.label}
                  className="absolute"
                  style={{
                    left: `${n.x}%`,
                    top: `${n.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="relative">
                    <span className="absolute inset-0 -m-2 animate-ping2 rounded-full bg-brand/40" />
                    <span className="relative block h-2.5 w-2.5 rounded-full bg-brand shadow-[0_0_18px_rgba(10,132,255,0.7)]" />
                  </div>
                  <div
                    className={`absolute whitespace-nowrap text-[10px] uppercase tracking-[0.22em] text-ink-200 ${
                      i % 2 === 0
                        ? "left-4 top-1/2 -translate-y-1/2"
                        : "right-4 top-1/2 -translate-y-1/2"
                    }`}
                  >
                    {n.label}
                  </div>
                </div>
              ))}
              {/* Center marker (Del Rio) */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="rounded-full border border-brand/40 bg-ink-950/60 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-brand-soft backdrop-blur-md">
                  Del Rio
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
