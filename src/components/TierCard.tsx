import Link from "next/link";
import type { Tier } from "@/lib/data";
import { formatUSD } from "@/lib/format";

export default function TierCard({ tier }: { tier: Tier }) {
  return (
    <article className="group card grain p-0">
      <div className="relative aspect-[4/3] overflow-hidden">
        <div
          className="absolute inset-0 scale-105 bg-cover bg-center transition-transform duration-[1.2s] ease-out group-hover:scale-100"
          style={{ backgroundImage: `url(${tier.image})` }}
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${tier.accent}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent" />
        <div className="absolute left-6 top-6">
          <span className="eyebrow">{tier.tagline}</span>
        </div>
        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
          <div>
            <h3 className="font-display text-3xl text-white">{tier.name}</h3>
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-ink-300">
              {tier.models.slice(0, 6).map((m) => (
                <span
                  key={m}
                  className="rounded-full border border-white/15 px-2 py-0.5"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-[0.2em] text-ink-400">
              From
            </div>
            <div className="font-display text-2xl text-accent">
              {formatUSD(tier.startingPrice)}
              <span className="text-base">+</span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-8">
        <p className="text-sm leading-relaxed text-ink-300">{tier.description}</p>
        <ul className="mt-6 space-y-2 text-sm text-ink-200">
          {tier.features.slice(0, 3).map((f) => (
            <li key={f} className="flex items-start gap-3">
              <span className="mt-2 h-1 w-1 flex-none rounded-full bg-accent" />
              {f}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex items-center justify-between">
          <span className="text-xs text-ink-400">
            {tier.models.length} models
          </span>
          <Link href={`/models#${tier.slug}`} className="btn-link">
            View tier <span>→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
