import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/[0.06]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <div className="container-pod py-20 sm:py-24">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo />
            <p className="mt-7 max-w-sm text-base leading-relaxed text-ink-300">
              Architectural living pods, engineered with precision and delivered
              ready to inhabit. Crafted in Texas. Sited anywhere.
            </p>
            <form className="mt-10 max-w-md">
              <label className="text-[10px] uppercase tracking-[0.32em] text-ink-500">
                Studio dispatch
              </label>
              <div className="mt-3 flex items-center gap-2 border-b border-white/15 pb-1.5 transition-colors duration-500 focus-within:border-accent">
                <input
                  type="email"
                  required
                  placeholder="you@domain.com"
                  aria-label="Email"
                  className="flex-1 bg-transparent px-1 py-2 text-sm text-white placeholder:text-ink-400 outline-none"
                />
                <button
                  type="submit"
                  className="text-[11px] uppercase tracking-[0.32em] text-accent transition-all duration-500 hover:tracking-[0.38em]"
                >
                  Subscribe →
                </button>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-ink-500">
                Quarterly. Architecture, sites, and reservations. No spam.
              </p>
            </form>
          </div>

          <div className="lg:col-span-3">
            <h4 className="mb-7 text-[10px] uppercase tracking-[0.32em] text-ink-500">
              Explore
            </h4>
            <ul className="space-y-4 font-display text-lg">
              {[
                ["/models", "Models"],
                ["/gallery", "Catalog"],
                ["/financing", "Financing"],
                ["/contact", "Contact"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-ink-200 transition-colors hover:text-accent"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="mb-7 text-[10px] uppercase tracking-[0.32em] text-ink-500">
              Studio
            </h4>
            <ul className="space-y-3 text-base text-ink-200">
              <li className="font-display text-lg text-white">3221 E Hwy 90</li>
              <li>Del Rio, Texas 78840</li>
              <li className="pt-3">
                <a
                  href="mailto:hello@terrapods.com"
                  className="transition-colors hover:text-accent"
                >
                  hello@terrapods.com
                </a>
              </li>
              <li>
                <span className="text-[10px] uppercase tracking-[0.32em] text-ink-500">Sales</span>
              </li>
              <li>
                <a
                  href="tel:+18304225062"
                  className="transition-colors hover:text-accent"
                >
                  (830) 422-5062
                </a>
              </li>
              <li>
                <a
                  href="tel:+13614349855"
                  className="transition-colors hover:text-accent"
                >
                  (361) 434-9855
                </a>
              </li>
            </ul>
            <p className="mt-6 text-xs text-ink-500">
              By appointment only · Mon — Fri 9am — 6pm CT
            </p>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-white/[0.06] pt-8 text-[10px] uppercase tracking-[0.32em] text-ink-500 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Terra Pods, Inc. — All rights reserved.</p>
          <div className="flex items-center gap-8">
            <Link href="/" className="transition-colors hover:text-white">Privacy</Link>
            <Link href="/" className="transition-colors hover:text-white">Terms</Link>
            <Link href="/" className="transition-colors hover:text-white">Press</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
