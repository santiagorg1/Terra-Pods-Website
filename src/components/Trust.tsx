import Image from "next/image";
import Reveal from "./Reveal";

const CLIENTS = [
  "Commercial Solutions",
  "UnderTerra",
  "Doer-Fer",
  "General Aluminum",
  "Gentherm",
  "General Electric",
  "NAFTA Traders",
  "Beck Steel",
  "ParkOhio",
  "Resco",
  "Sanford Enterprises",
  "CSI",
  "SNC Manufacturing",
];

export default function Trust() {
  const loop = [...CLIENTS, ...CLIENTS];
  return (
    <section id="clients" className="scene-light relative py-24 sm:py-28">
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_2fr]">
          <Reveal>
            <div className="flex items-center gap-5">
              <Image
                src="/isn/ctpat.png"
                alt="C-TPAT logo"
                width={84}
                height={74}
              />
              <div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-brand-deep">
                  Validated member
                </div>
                <div className="font-display text-lg font-medium tracking-tight text-ink-950">
                  C-TPAT
                </div>
              </div>
            </div>
            <h2 className="display-3 mt-8 !text-ink-950 !text-2xl sm:!text-3xl">
              Trusted by industry leaders across
              <br />
              manufacturing, energy, automotive, and industrial.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative overflow-hidden">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />
              <div className="flex w-max animate-marquee gap-12 py-6">
                {loop.map((c, i) => (
                  <div
                    key={`${c}-${i}`}
                    className="whitespace-nowrap font-display text-xl font-medium tracking-tight text-ink-500 sm:text-2xl"
                  >
                    {c}
                    <span className="ml-12 text-ink-200">·</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
