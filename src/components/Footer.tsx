import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/5">
      <div className="container-pod py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-300">
              Architectural living pods, engineered with precision and delivered
              ready to inhabit. Crafted in California. Sited anywhere.
            </p>
            <form className="mt-8 flex max-w-md items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] p-1.5">
              <input
                type="email"
                required
                placeholder="Your email"
                aria-label="Email"
                className="flex-1 bg-transparent px-4 py-2 text-sm text-white placeholder:text-ink-400 outline-none"
              />
              <button className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-ink-950 transition-colors hover:bg-accent-soft">
                Join
              </button>
            </form>
          </div>

          <div>
            <h4 className="mb-5 text-xs font-medium uppercase tracking-[0.24em] text-ink-400">
              Explore
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                ["/models", "Models"],
                ["/financing", "Financing"],
                ["/gallery", "Gallery"],
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

          <div>
            <h4 className="mb-5 text-xs font-medium uppercase tracking-[0.24em] text-ink-400">
              Studio
            </h4>
            <ul className="space-y-3 text-sm text-ink-200">
              <li>2440 Coastal Hwy</li>
              <li>San Mateo, California</li>
              <li>
                <a
                  href="mailto:hello@terrapods.com"
                  className="transition-colors hover:text-accent"
                >
                  hello@terrapods.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+18005552337"
                  className="transition-colors hover:text-accent"
                >
                  +1 (800) 555-PODS
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-8 text-xs text-ink-400 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Terra Pods, Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-white">Privacy</Link>
            <Link href="/" className="hover:text-white">Terms</Link>
            <Link href="/" className="hover:text-white">Press</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
