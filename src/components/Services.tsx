import Image from "next/image";
import Reveal from "./Reveal";

const CARDS = [
  {
    k: "01",
    title: "Freight Forwarding",
    blurb:
      "Northbound and southbound cargo by land, air, and sea. HAZMAT-certified transfers. Cross-docking.",
    image: "/isn/air-cargo.jpg",
    href: "#freight",
  },
  {
    k: "02",
    title: "Customs Brokerage",
    blurb:
      "Licensed U.S. clearance — ACE, ISF, AES, FTZ, in-bond, reconciliations, and bond services.",
    image: "/isn/customs-inspection.jpg",
    href: "#customs",
  },
  {
    k: "03",
    title: "Logistics & Warehousing",
    blurb:
      "Contract logistics, bonded warehouses and yards, bonded carrier. Forklifts and heavy equipment, 24/7.",
    image: "/isn/port-aerial.jpg",
    href: "#warehousing",
  },
];

export default function Services() {
  return (
    <section id="services" className="scene-light relative py-28 sm:py-36">
      <div className="container-page">
        <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <span className="eyebrow !text-brand-deep">What we do</span>
            <h2 className="display-2 mt-6 !text-ink-950">
              Three integrated pillars.
              <br />
              <span className="text-ink-500">One team. One invoice.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead text-ink-500 lg:max-w-md">
              Customs clearance, freight movement, and bonded storage —
              orchestrated under a single accountable point of contact, the way
              cross-border trade should work.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {CARDS.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <a
                href={c.href}
                className="group relative block aspect-[3/4] overflow-hidden rounded-3xl bg-ink-950"
              >
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  sizes="(min-width:768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-[1500ms] ease-cinema group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />

                <div className="absolute inset-x-6 top-6">
                  <div className="text-[11px] font-medium uppercase tracking-[0.28em] text-brand-soft">
                    Service {c.k}
                  </div>
                </div>

                <div className="absolute inset-x-6 bottom-6">
                  <div className="display-3">{c.title}</div>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-200">
                    {c.blurb}
                  </p>
                  <div className="mt-5 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.22em] text-brand-soft transition-all group-hover:gap-3 group-hover:text-white">
                    Explore <span aria-hidden>→</span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
