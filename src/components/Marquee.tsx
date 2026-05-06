const items = [
  "Architectural Digest",
  "Dwell",
  "Wallpaper*",
  "Fast Company",
  "Surface",
  "The New York Times",
  "Monocle",
];

export default function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-white/5 py-8">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-ink-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-ink-950 to-transparent" />
      <div className="flex w-max animate-marquee items-center gap-16 whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="font-display text-xl font-light tracking-wide text-ink-400"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
