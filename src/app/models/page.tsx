import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { models } from "@/lib/data";
import { formatUSD } from "@/lib/format";

export const metadata: Metadata = {
  title: "Models",
  description:
    "Four architectural pods. From a 240 sq ft studio retreat to our 1,100 sq ft flagship residence. Explore the Terra Pods collection.",
};

export default function ModelsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Collection"
        title={
          <>
            Four pods, <span className="text-gold">composed precisely.</span>
          </>
        }
        subtitle="Each Terra Pod is a complete architectural object — engineered to a single design language and customized to your site, finishes, and energy strategy."
      />

      <section className="container-pod py-20 sm:py-28">
        <div className="space-y-32">
          {models.map((m, i) => {
            const reverse = i % 2 === 1;
            return (
              <article
                id={m.slug}
                key={m.slug}
                className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16"
              >
                <Reveal
                  className={`lg:col-span-7 ${reverse ? "lg:order-2" : ""}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10">
                    <div
                      className="absolute inset-0 scale-105 bg-cover bg-center transition-transform duration-[1.5s] hover:scale-100"
                      style={{ backgroundImage: `url(${m.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
                  </div>
                </Reveal>
                <Reveal
                  delay={0.1}
                  className={`lg:col-span-5 ${reverse ? "lg:order-1" : ""}`}
                >
                  <span className="eyebrow">{m.tagline}</span>
                  <h2 className="display-3 mt-5">{m.name}</h2>
                  <p className="mt-6 text-base leading-relaxed text-ink-300">
                    {m.description}
                  </p>

                  <dl className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                    {[
                      ["Footprint", m.size],
                      ["Layout", m.bedrooms],
                      ["Lead time", m.delivery],
                    ].map(([k, v]) => (
                      <div key={k} className="bg-ink-950 px-4 py-5 text-center">
                        <dt className="text-[10px] uppercase tracking-[0.2em] text-ink-400">
                          {k}
                        </dt>
                        <dd className="mt-1.5 text-sm font-medium text-white">
                          {v}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <ul className="mt-8 space-y-2.5">
                    {m.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-3 text-sm text-ink-200"
                      >
                        <span className="mt-2 h-1 w-1 flex-none rounded-full bg-accent" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/5 pt-8">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-ink-400">
                        Starting at
                      </div>
                      <div className="font-display text-3xl text-accent">
                        {formatUSD(m.startingPrice)}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={`/contact?model=${m.slug}`}
                        className="btn-primary"
                      >
                        Request a quote
                      </Link>
                      <Link href="/financing" className="btn-ghost">
                        Finance this pod
                      </Link>
                    </div>
                  </div>
                </Reveal>
              </article>
            );
          })}
        </div>
      </section>

      <section className="container-pod pb-32">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent p-10 text-center sm:p-16">
          <h3 className="display-3">Not sure which pod fits?</h3>
          <p className="mx-auto mt-5 max-w-xl text-ink-300">
            Our advisors will guide you through floor plans, finishes, and site
            considerations to match the right pod to your vision.
          </p>
          <Link href="/contact" className="btn-primary mt-8">
            Talk to an advisor
          </Link>
        </div>
      </section>
    </>
  );
}
