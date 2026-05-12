"use client";

import Image from "next/image";
import Reveal from "./Reveal";

const REASONS = [
  { k: "01", t: "Direct CBP access",        d: "Established relationships with U.S. Customs for faster issue resolution and clearance turnaround." },
  { k: "02", t: "National permit (RLF)",    d: "Clear shipments at any U.S. port from our Del Rio operations center." },
  { k: "03", t: "Single point of contact",  d: "A dedicated account team backs every shipment. No call queues, no look-up delays." },
  { k: "04", t: "C-TPAT validated",         d: "The highest standard of supply chain security recognized by U.S. Customs." },
  { k: "05", t: "Tailored solutions",       d: "Customized programs and expert guidance built around your commodity, volume, and timing." },
  { k: "06", t: "Regional leadership",      d: "Industry leaders in security, accuracy, and on-time delivery across the Texas–Mexico border." },
];

export default function WhyIsn() {
  return (
    <section id="why" className="scene-dark relative overflow-hidden py-28 sm:py-36">
      <Image
        src="/isn/port-mega.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-950/85 to-ink-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(10,78,163,0.22),transparent_60%)]" />

      <div className="container-page relative">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <span className="eyebrow">Our difference</span>
            <h2 className="display-2 mt-6">
              No call centers.
              <br />
              No look-up delays.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead-prose lg:max-w-md">
              Direct access to a team that&apos;s been on the border for 35
              years. Bespoke cross-border solutions, engineered around your
              business — not a queue of agents.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((r, i) => (
            <Reveal key={r.k} delay={i * 0.06}>
              <div className="group relative h-full overflow-hidden bg-ink-950/55 p-8 transition-all duration-700 hover:bg-ink-900/70">
                <div className="font-display text-sm font-medium tracking-tight text-brand-soft">
                  {r.k}
                </div>
                <div className="display-3 mt-4 !text-xl sm:!text-2xl">
                  {r.t}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-300">
                  {r.d}
                </p>
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-brand transition-transform duration-700 ease-cinema group-hover:scale-x-100"
                  aria-hidden
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
