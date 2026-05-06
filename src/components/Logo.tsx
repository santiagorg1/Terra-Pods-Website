import Link from "next/link";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Terra Pods home"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <span className="relative grid h-8 w-8 place-items-center overflow-hidden rounded-full border border-white/15 bg-gradient-to-br from-accent/30 to-transparent">
        <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_2px_rgba(201,168,106,0.7)]" />
      </span>
      <span className="font-display text-lg font-medium tracking-wide text-white transition-colors group-hover:text-accent-soft">
        Terra<span className="text-accent">Pods</span>
      </span>
    </Link>
  );
}
