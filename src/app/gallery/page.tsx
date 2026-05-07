import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { models, series } from "@/lib/data";
import { formatUSD } from "@/lib/format";

export const metadata: Metadata = {
  title: "Catalog",
  description:
    "The complete Terra Pods 2028 catalog. Twenty-six pods, ten series — every page, every specification, every interior.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Catalog"
        title={
          <>
            The 2028 catalog, <span className="text-gold">in full.</span>
          </>
        }
        subtitle="Every model, every page. A growing record of the Terra Pods collection — open any catalog page to step into the model."
      />

      <section className="container-pod py-20 sm:py-24">
        <div className="space-y-24">
          {series.map((s) => {
            const items = models.filter((m) => m.seriesSlug === s.slug);
            return (
              <div key={s.slug}>
                <Reveal>
                  <div className="flex flex-col items-start justify-between gap-4 border-b border-white/5 pb-6 md:flex-row md:items-end">
                    <div>
                      <span className="eyebrow">{s.tagline}</span>
                      <h2 className="display-3 mt-4">{s.name}</h2>
                    </div>
                    <Link href={`/models?series=${s.slug}`} className="btn-link">
                      Browse {s.name} <span>→</span>
                    </Link>
                  </div>
                </Reveal>

                <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((m, i) => (
                    <Reveal key={m.slug} delay={(i % 3) * 0.06}>
                      <Link
                        href={`/models/${m.slug}`}
                        className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-[#fbfaf6] transition-transform duration-500 hover:-translate-y-1 hover:border-accent/40"
                      >
                        <div className="relative aspect-[4/3]">
                          <Image
                            src={m.catalogImage}
                            alt={`${m.name} catalog page`}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className="object-cover transition-transform duration-[1.4s] group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/55 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        </div>
                        <div className="absolute inset-x-0 bottom-0 translate-y-2 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                          <div className="flex items-baseline justify-between rounded-xl border border-white/10 bg-ink-950/85 px-4 py-3 backdrop-blur-md">
                            <div>
                              <div className="font-display text-lg text-white">{m.name.replace("Terra Pod ", "")}</div>
                              <div className="text-[10px] uppercase tracking-[0.22em] text-ink-400">{m.area} · {m.guests}</div>
                            </div>
                            <div className="font-display text-base text-accent">{formatUSD(m.startingPrice)}</div>
                          </div>
                        </div>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container-pod py-20">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-10 text-center sm:p-16">
          <span className="eyebrow mx-auto justify-center">Site visits</span>
          <h2 className="display-2 mt-5">
            See a Terra Pod <span className="text-gold">in person.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-ink-300">
            We host private tours at our flagship pavilion in Northern California
            and at select client residences across the West Coast.
          </p>
          <Link href="/contact" className="btn-primary mt-8">
            Book a private tour
          </Link>
        </div>
      </section>
    </>
  );
}
