"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";

const links = [
  { href: "/models", label: "Models" },
  { href: "/financing", label: "Financing" },
  { href: "/gallery", label: "Catalog" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-cinema ${
        scrolled || open
          ? "border-b border-white/[0.06] bg-ink-950/85 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="container-pod flex h-20 items-center justify-between sm:h-24">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`group relative px-5 py-2 text-[11px] uppercase tracking-[0.32em] transition-colors duration-500 ${
                  active ? "text-accent" : "text-ink-300 hover:text-white"
                }`}
              >
                <span className="relative">{l.label}</span>
                <span
                  className={`absolute inset-x-5 -bottom-0.5 h-px origin-left bg-accent transition-transform duration-700 ease-cinema ${
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/[0.04] px-5 py-2.5 text-[11px] uppercase tracking-[0.32em] text-accent transition-all duration-500 hover:border-accent hover:bg-accent/10"
          >
            Reserve
            <span>→</span>
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] md:hidden"
        >
          <span className="relative block h-3 w-4">
            <span
              className={`absolute left-0 top-0 h-px w-full bg-white transition-transform duration-300 ${
                open ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 h-px w-full bg-white transition-transform duration-300 ${
                open ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <div
        className={`md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        } transition-opacity duration-500`}
      >
        <div className="container-pod pb-10 pt-4">
          <nav className="flex flex-col gap-1">
            {links.map((l) => {
              const active = pathname.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`flex items-center justify-between rounded-2xl border px-5 py-5 text-base ${
                    active
                      ? "border-accent/40 bg-white/[0.05] text-white"
                      : "border-white/10 bg-white/[0.02] text-ink-200"
                  }`}
                >
                  <span className="text-[12px] uppercase tracking-[0.32em]">{l.label}</span>
                  <span className="text-ink-400">→</span>
                </Link>
              );
            })}
          </nav>
          <Link href="/contact" className="btn-luxury mt-8 w-full">
            Reserve a pod
            <span>→</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
