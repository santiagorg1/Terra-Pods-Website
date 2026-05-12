import Image from "next/image";
import Logo from "./Logo";

const COLS = [
  {
    title: "Services",
    links: [
      ["Customs Brokerage", "#customs"],
      ["Freight Forwarding", "#freight"],
      ["Logistics & Warehousing", "#warehousing"],
      ["Bonded Facilities", "#warehousing"],
    ],
  },
  {
    title: "Capabilities",
    links: [
      ["ACE Entries", "#customs"],
      ["ISF 10+2 Filing", "#customs"],
      ["AES Export", "#customs"],
      ["FTZ & In-Bond", "#customs"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About", "#about"],
      ["Why ISN", "#why"],
      ["Global Network", "#network"],
      ["Clients", "#clients"],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-ink-950 text-ink-200">
      <div className="container-page py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_3fr]">
          <div>
            <Logo variant="white" width={170} />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink-300">
              Licensed U.S. customs brokerage, freight forwarding, and integrated
              logistics — one team, one invoice, 35 years on the U.S.–Mexico
              border.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Image
                src="/isn/ctpat.png"
                alt="C-TPAT Validated"
                width={92}
                height={82}
                className="opacity-90"
              />
              <div className="text-[11px] uppercase tracking-[0.22em] text-ink-300">
                C-TPAT
                <br />
                Validated Member
              </div>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {COLS.map((col) => (
              <div key={col.title}>
                <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-ink-400">
                  {col.title}
                </div>
                <ul className="mt-5 space-y-3">
                  {col.links.map(([label, href]) => (
                    <li key={label}>
                      <a
                        href={href}
                        className="text-sm text-ink-200 transition-colors hover:text-white"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-10 border-t border-white/[0.06] pt-10 lg:grid-cols-4">
          {[
            ["Phone", "(830) 775-1666", "tel:+18307751666"],
            ["Email", "isn@isnbroker.com", "mailto:isn@isnbroker.com"],
            ["Address", "594 Industrial Blvd, Unit A · Del Rio, TX 78840"],
            ["Hours", "24 / 7 · 365 days a year"],
          ].map(([k, v, href]) => (
            <div key={k}>
              <div className="text-[11px] uppercase tracking-[0.22em] text-ink-400">
                {k}
              </div>
              {href ? (
                <a
                  href={href}
                  className="mt-3 block text-sm text-ink-100 transition-colors hover:text-white"
                >
                  {v}
                </a>
              ) : (
                <div className="mt-3 text-sm text-ink-100">{v}</div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/[0.06] pt-6 text-[12px] text-ink-400 sm:flex-row sm:items-center">
          <div>
            © {new Date().getFullYear()} ISN Customs Broker International. All
            rights reserved.
          </div>
          <div>Licensed U.S. Customs Broker · RLF Nationwide · C-TPAT Validated</div>
        </div>
      </div>
    </footer>
  );
}
