"use client";

import { motion } from "framer-motion";
import LeadForm from "./LeadForm";

export default function ReserveCta() {
  return (
    <section className="scene py-32 sm:py-44">
      <div className="container-pod">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950"
        >
          {/* Atmospheric glow */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-[480px] w-[480px] rounded-full bg-accent/[0.18] blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-[480px] w-[480px] rounded-full bg-ember/[0.10] blur-[100px]" />
          <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.04] mix-blend-overlay" />
          {/* Light pan */}
          <div className="pointer-events-none absolute inset-y-0 left-[-15%] w-[40%] animate-lightPan bg-gradient-to-r from-transparent via-accent/[0.06] to-transparent" />

          <div className="relative grid gap-12 p-10 sm:p-16 lg:grid-cols-2 lg:items-center lg:gap-20 lg:p-20">
            <div>
              <span className="eyebrow">Reserve</span>
              <h2 className="display-2 mt-7 text-balance">
                Begin your <span className="display-italic text-gold">Terra Pod</span> reservation.
              </h2>
              <p className="lead-prose mt-8 max-w-md">
                A small refundable deposit secures your build slot. A specialist will
                follow up within one business day with site requirements and a tailored quote.
              </p>

              <div className="mt-12 grid grid-cols-2 gap-x-10 gap-y-8 border-t border-white/5 pt-10 max-w-md">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.28em] text-ink-500">Deposit</div>
                  <div className="mt-2 font-display text-2xl text-white">Refundable</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.28em] text-ink-500">Response</div>
                  <div className="mt-2 font-display text-2xl text-white">≤ 24h</div>
                </div>
              </div>
            </div>

            <div className="glass rounded-3xl p-8 sm:p-10">
              <LeadForm variant="compact" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
