import Link from "next/link";
import type { Model } from "@/lib/data";
import { formatUSD } from "@/lib/format";

export default function ModelCard({ model }: { model: Model }) {
  return (
    <article className="group card grain p-0">
      <div className="relative aspect-[4/3] overflow-hidden">
        <div
          className="absolute inset-0 scale-105 bg-cover bg-center transition-transform duration-[1.2s] ease-out group-hover:scale-100"
          style={{ backgroundImage: `url(${model.image})` }}
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${model.accent}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent" />
        <div className="absolute left-6 top-6">
          <span className="eyebrow">{model.tagline}</span>
        </div>
        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
          <div>
            <h3 className="font-display text-3xl text-white">{model.name}</h3>
            <div className="mt-1 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-ink-300">
              <span>{model.size}</span>
              <span className="h-3 w-px bg-white/20" />
              <span>{model.bedrooms}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-[0.2em] text-ink-400">From</div>
            <div className="font-display text-2xl text-accent">
              {formatUSD(model.startingPrice)}
            </div>
          </div>
        </div>
      </div>
      <div className="p-8">
        <p className="text-sm leading-relaxed text-ink-300">{model.description}</p>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-ink-400">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span>Delivery in {model.delivery}</span>
          </div>
          <Link href={`/models#${model.slug}`} className="btn-link">
            View details <span>→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
