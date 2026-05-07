import Link from "next/link";
import { inventory } from "@/lib/extras";
import { formatUSD } from "@/lib/format";

export default function InventoryGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {inventory.map((u) => (
        <article
          key={u.id}
          className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent transition-all duration-500 hover:border-accent/40"
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            <div
              className="absolute inset-0 scale-105 bg-cover bg-center transition-transform duration-[1.2s] ease-out group-hover:scale-100"
              style={{ backgroundImage: `url(${u.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent" />
            <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-white">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/80 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
              </span>
              {u.badge}
            </div>
            <div className="absolute right-4 top-4 rounded-full border border-white/20 bg-ink-950/60 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-ink-200 backdrop-blur">
              ID · {u.id.slice(-3)}
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="font-display text-2xl text-white">{u.series}</div>
              <div className="mt-1 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-ink-200">
                <span>{u.size}</span>
                <span className="h-2.5 w-px bg-white/20" />
                <span>{u.bedrooms}</span>
              </div>
            </div>
          </div>
          <div className="p-6">
            <ul className="space-y-2">
              {u.features.slice(0, 3).map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2.5 text-sm text-ink-200"
                >
                  <span className="mt-2 h-1 w-1 flex-none rounded-full bg-accent" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-end justify-between border-t border-white/5 pt-5">
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-ink-400">
                  Price
                </div>
                <div className="font-display text-2xl text-white">
                  {formatUSD(u.price)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-[0.2em] text-ink-400">
                  Ships in
                </div>
                <div className="font-display text-2xl text-accent">
                  {u.shipDays} days
                </div>
              </div>
            </div>
            <Link
              href={`/contact?tier=flagship&unit=${u.id}`}
              className="btn-primary mt-5 w-full"
            >
              Reserve · {u.id.slice(-3)}
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
