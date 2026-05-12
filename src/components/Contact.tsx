"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Reveal from "./Reveal";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "10%"]);

  return (
    <section
      id="contact"
      ref={ref}
      className="scene-dark relative overflow-hidden"
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 -z-10 will-change-transform"
      >
        <Image
          src="/isn/port-truck-night.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink-950/72" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(10,132,255,0.22),transparent_55%)]" />
      </motion.div>

      <div className="container-page relative py-28 sm:py-40">
        <div className="grid items-end gap-14 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <span className="eyebrow">Get in touch</span>
            <h2 className="display-1 mt-6">
              Let&apos;s move your
              <br />
              <span className="text-grad-brand">freight forward.</span>
            </h2>
            <p className="lead-prose mt-8 max-w-xl">
              Talk to a licensed U.S. customs broker today. Tell us what you
              ship, where it&apos;s going, and we&apos;ll come back with a plan
              — typically within one business day.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a href="mailto:isn@isnbroker.com" className="btn-primary">
                Email a broker
                <span aria-hidden>→</span>
              </a>
              <a href="tel:+18307751666" className="btn-ghost">
                Call (830) 775-1666
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass rounded-3xl p-8 sm:p-10">
              <div className="text-[11px] uppercase tracking-[0.22em] text-brand-soft">
                ISN Customs Broker International
              </div>
              <div className="display-3 mt-3 !text-xl sm:!text-2xl">
                594 Industrial Blvd, Unit A
                <br />
                Del Rio, TX 78840 · USA
              </div>

              <dl className="mt-8 grid gap-6">
                {[
                  ["Phone", "(830) 775-1666", "tel:+18307751666"],
                  ["Email", "isn@isnbroker.com", "mailto:isn@isnbroker.com"],
                  ["Web", "www.isnbroker.com", "https://www.isnbroker.com"],
                  ["Hours", "24 / 7 · 365 days"],
                ].map(([k, v, href]) => (
                  <div key={k} className="flex items-center justify-between border-b border-white/[0.08] pb-4 last:border-0 last:pb-0">
                    <dt className="text-[11px] uppercase tracking-[0.22em] text-ink-400">
                      {k}
                    </dt>
                    <dd className="text-right text-sm font-medium text-white">
                      {href ? (
                        <a href={href} className="hover:text-brand-soft">
                          {v}
                        </a>
                      ) : (
                        v
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
