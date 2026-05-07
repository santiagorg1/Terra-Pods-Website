import { models } from "@/lib/data";

export default function Marquee() {
  const items = models.map((m) => m.name.replace("Terra Pod ", ""));
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-white/5 py-10">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-ink-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-ink-950 to-transparent" />
      <div className="flex w-max animate-marquee items-center gap-12 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-12"
          >
            <span className="font-display text-2xl font-light tracking-wide text-ink-300">
              {item}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent/60" />
          </span>
        ))}
      </div>
    </div>
  );
}
