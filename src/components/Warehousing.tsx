import Image from "next/image";
import Reveal from "./Reveal";

const FEATURES = [
  { k: "01", t: "Bonded warehouses",   d: "CBP-bonded indoor storage with cameras, access control, Class 1–11." },
  { k: "02", t: "Bonded yards",        d: "Outdoor bonded storage for heavy equipment, tanks, oversized cargo." },
  { k: "03", t: "Contract logistics",  d: "Dedicated programs tailored to ongoing client requirements." },
  { k: "04", t: "Bonded carrier",      d: "Licensed in-transit movements between U.S. ports." },
  { k: "05", t: "Heavy equipment",     d: "Forklifts, cranes, and top-loaders. Trained operators on standby." },
  { k: "06", t: "Cross-docking",       d: "Trailer-to-trailer transfers. Minimal handling, less dwell time." },
];

export default function Warehousing() {
  return (
    <section id="warehousing" className="scene-light relative py-28 sm:py-36">
      <div className="container-page">
        <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <span className="eyebrow !text-brand-deep">
              Service 03 · Logistics &amp; Warehousing
            </span>
            <h2 className="display-2 mt-6 !text-ink-950">
              Bonded facilities,
              <br />
              <span className="text-ink-500">always open.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead text-ink-500 lg:max-w-md">
              Secured CBP-bonded warehouses and yards, contract logistics, and
              bonded carrier capability — with forklifts and heavy equipment
              on-site, 24/7, 365 days a year.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.05fr_1fr]">
          <Reveal>
            <div className="relative aspect-[5/4] overflow-hidden rounded-3xl">
              <Image
                src="/isn/port-cranes.jpg"
                alt="Container port with cranes and trucks"
                fill
                sizes="(min-width:1024px) 55vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 via-transparent to-transparent" />
              <div className="absolute inset-x-6 bottom-6 sm:inset-x-8 sm:bottom-8">
                <div className="inline-flex items-center gap-3 rounded-full bg-white/95 px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.22em] text-ink-950">
                  <span className="inline-block h-2 w-2 rounded-full bg-brand animate-slowPulse" />
                  Open 365 days · CBP-bonded
                </div>
              </div>
            </div>
          </Reveal>

          <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-ink-100 bg-ink-100 sm:grid-cols-2">
            {FEATURES.map((f, i) => (
              <Reveal as="li" key={f.k} delay={i * 0.05}>
                <div className="h-full bg-white p-7">
                  <div className="font-display text-sm font-medium tracking-tight text-brand-deep">
                    {f.k}
                  </div>
                  <div className="display-4 mt-3 !text-ink-950">{f.t}</div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">
                    {f.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
