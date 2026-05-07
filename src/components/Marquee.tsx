import { models } from "@/lib/data";

export default function Marquee() {
  const items = models.map((m) => m.short);
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-white/5 bg-ink-950/40 py-12 backdrop-blur-md">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-40 bg-gradient-to-r from-ink-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-40 bg-gradient-to-l from-ink-950 to-transparent" />
      <div className="flex w-max animate-marquee items-center gap-16 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-16">
            <span className="font-display italic text-2xl font-light tracking-cinema text-ink-300/80">
              {item}
            </span>
            <span className="block h-px w-10 bg-accent/40" />
          </span>
        ))}
      </div>
    </div>
  );
}
