import Link from "next/link";
import Logo from "./Logo";
import { contact, trustBadges } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/5">
      <div className="container-pod py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-300">
              Architectural pods, engineered for life. Crafted to your spec,
              cleared through customs by our in-house team, and delivered direct
              to your site — anywhere in the US &amp; Mexico.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {trustBadges.slice(0, 3).map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-ink-300"
                >
                  {b}
                </span>
              ))}
            </div>
            <form className="mt-8 flex max-w-md items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] p-1.5">
              <input
                type="email"
                required
                placeholder="Your email"
                aria-label="Email"
                className="flex-1 bg-transparent px-4 py-2 text-sm text-white placeholder:text-ink-400 outline-none"
              />
              <button className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-soft">
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
              Headquarters
            </h4>
            <ul className="space-y-3 text-sm text-ink-200">
              <li>{contact.city}</li>
              <li>{contact.region}</li>
              <li>
                <a
                  href={contact.phonePrimaryHref}
                  className="transition-colors hover:text-accent"
                >
                  {contact.phonePrimary}
                </a>
              </li>
              <li>
                <a
                  href={contact.phoneSecondaryHref}
                  className="transition-colors hover:text-accent"
                >
                  {contact.phoneSecondary}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="transition-colors hover:text-accent"
                >
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-8 text-xs text-ink-400 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} Terra Pods USA · Del Rio, Texas · US &amp;
            Mexico · All rights reserved.
          </p>
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
