import Image from "next/image";
import Reveal from "./Reveal";

const CODES = [
  { k: "ACE", t: "ACE Entries", d: "Pre-entry clearance via the Automated Commercial Environment." },
  { k: "ISF", t: "ISF 10+2 Filing", d: "Importer Security Filing submitted before vessel loading." },
  { k: "AES", t: "AES Export", d: "Automated Export System filing for U.S. outbound shipments." },
  { k: "FTZ", t: "Foreign Trade Zones", d: "Entries under FTZ status to defer or reduce duty." },
  { k: "IB",  t: "In-Bond (QP/QX)", d: "Bonded movement of merchandise between U.S. ports." },
  { k: "RC",  t: "Reconciliations", d: "Post-entry reconciliation, GO, and Blue Letter responses." },
  { k: "TIB", t: "Temporary Imports", d: "TIB entries for goods entering the U.S. on a temporary basis." },
  { k: "ACH", t: "ACH Payments", d: "Automated Clearing House statements and customs bond management." },
];

export default function Customs() {
  return (
    <section id="customs" className="scene-dark relative py-28 sm:py-36">
      <div className="container-page">
        <div className="grid items-start gap-14 lg:grid-cols-[1fr_1.15fr]">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <span className="eyebrow">Service 01 · Customs Brokerage</span>
              <h2 className="display-2 mt-6">
                Licensed U.S.
                <br />
                customs clearance.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="lead-prose mt-8 max-w-lg">
                Licensed brokers handle the full lifecycle of an import or
                export entry — from pre-arrival filing to post-entry
                reconciliation. Proactive duty-and-penalty avoidance built into
                every clearance.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]">
                {[
                  ["Direct CBP access", "No call centers"],
                  ["RLF nationwide", "Any U.S. port"],
                  ["C-TPAT validated", "Highest security tier"],
                  ["Single point of contact", "Dedicated team"],
                ].map(([t, d]) => (
                  <div key={t} className="bg-ink-950/40 px-5 py-5">
                    <div className="font-display text-sm font-medium tracking-tight text-white">
                      {t}
                    </div>
                    <div className="mt-1 text-[11px] uppercase tracking-[0.22em] text-ink-400">
                      {d}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.26}>
              <div className="mt-10 overflow-hidden rounded-2xl border border-white/[0.08]">
                <div className="relative aspect-[16/10]">
                  <Image
                    src="/isn/customs-container.jpg"
                    alt="Customs inspection at container yard"
                    fill
                    sizes="(min-width:1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent" />
                </div>
              </div>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <div className="mb-8 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-ink-400">
                <span>Filing capabilities</span>
                <span>08 / 08</span>
              </div>
            </Reveal>

            <ul className="grid gap-px overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] sm:grid-cols-2">
              {CODES.map((c, i) => (
                <Reveal as="li" key={c.k} delay={i * 0.04}>
                  <div className="group bg-ink-950/50 p-7 transition-colors hover:bg-ink-900/70">
                    <div className="flex items-baseline gap-3">
                      <div className="font-display text-base font-medium tracking-tight text-brand-soft">
                        {c.k}
                      </div>
                      <div className="h-px flex-1 bg-white/[0.06]" />
                    </div>
                    <div className="display-4 mt-4">{c.t}</div>
                    <p className="mt-3 text-sm leading-relaxed text-ink-300">
                      {c.d}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
