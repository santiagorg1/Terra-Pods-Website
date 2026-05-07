import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import CatalogPage from "@/components/CatalogPage";
import Reveal from "@/components/Reveal";
import LeadForm from "@/components/LeadForm";
import { getModel, getSeries, getSeriesModels, models } from "@/lib/data";
import { formatUSD } from "@/lib/format";

export function generateStaticParams() {
  return models.map((m) => ({ slug: m.slug }));
}

export function generateMetadata(
  { params }: { params: { slug: string } },
): Metadata {
  const m = getModel(params.slug);
  if (!m) return { title: "Model not found" };
  return {
    title: `${m.name} — ${m.tagline}`,
    description: m.description,
    openGraph: {
      title: `${m.name} — ${m.tagline}`,
      description: m.description,
      images: [{ url: m.catalogImage }],
    },
  };
}

export default function ModelPage({ params }: { params: { slug: string } }) {
  const model = getModel(params.slug);
  if (!model) return notFound();

  const seriesData = getSeries(model.seriesSlug);
  const seriesModels = getSeriesModels(model.seriesSlug);
  const others = seriesModels.filter((m) => m.slug !== model.slug);
  const idx = models.findIndex((m) => m.slug === model.slug);
  const prev = models[(idx - 1 + models.length) % models.length];
  const next = models[(idx + 1) % models.length];

  return (
    <>
      <section className="relative overflow-hidden pt-32 sm:pt-40">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] bg-radial-glow" />
        <div className="pointer-events-none absolute right-[-10%] top-[20%] h-[60vh] w-[60vh] rounded-full bg-accent/[0.06] blur-3xl" />

        <div className="container-pod relative">
          <nav className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-ink-400">
            <Link href="/models" className="hover:text-white">Catalog</Link>
            <span>/</span>
            <Link href={`/models?series=${model.seriesSlug}`} className="hover:text-white">{model.series}</Link>
            <span>/</span>
            <span className="text-white">{model.name.replace("Terra Pod ", "")}</span>
          </nav>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <span className="eyebrow">{model.tagline}</span>
              <h1 className="display-1 mt-6 text-balance">{model.name}</h1>
              <p className="lead mt-7 max-w-xl">{model.description}</p>

              <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-4">
                {[
                  ["Footprint", model.area],
                  ["Sq ft", model.areaSqft],
                  ["Guests", model.guests],
                  ["Lead time", model.delivery],
                ].map(([k, v]) => (
                  <div key={k} className="bg-ink-950 px-4 py-5 text-center">
                    <dt className="text-[10px] uppercase tracking-[0.22em] text-ink-400">{k}</dt>
                    <dd className="mt-1.5 text-sm font-medium text-white">{v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-ink-400">Starting at</div>
                  <div className="font-display text-4xl text-accent">{formatUSD(model.startingPrice)}</div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link href={`/contact?model=${model.slug}`} className="btn-primary">
                    Request a quote
                  </Link>
                  <Link href="/financing" className="btn-ghost">
                    Finance this pod
                  </Link>
                </div>
              </div>

              {model.badge && (
                <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-accent/30 bg-accent/[0.06] px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {model.badge}
                </div>
              )}
            </div>

            <div className="lg:col-span-6">
              <CatalogPage
                src={model.catalogImage}
                alt={`${model.name} catalog page`}
                priority
                intensity={6}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container-pod py-24 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <span className="eyebrow">Specifications</span>
            <h2 className="display-3 mt-5">Engineered <span className="text-gold">end to end.</span></h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-300">
              Every Terra Pod ships fully complete. Below is the at-a-glance
              specification for {model.name.replace("Terra Pod ", "")} — the full technical pack is provided after inquiry.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-7">
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              {[
                ["Series", model.series],
                ["Finish", model.finish],
                ["Dimensions", model.dimensions],
                ["Floor area", `${model.area} · ${model.areaSqft}`],
                ["Capacity", model.guests],
                ["Net weight", model.weight],
                ["Power", model.power],
                ["Lead time", model.delivery],
              ].map(([k, v]) => (
                <div key={k} className="bg-ink-950 px-5 py-5">
                  <dt className="text-[10px] uppercase tracking-[0.22em] text-ink-400">{k}</dt>
                  <dd className="mt-1.5 text-sm font-medium text-white">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="container-pod py-24 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <span className="eyebrow">Exterior</span>
            <h3 className="display-3 mt-5">The shell.</h3>
            <ul className="mt-8 space-y-3">
              {model.exterior.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-ink-200">
                  <span className="mt-2 h-1 w-1 flex-none rounded-full bg-accent" />
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="eyebrow">Interior</span>
            <h3 className="display-3 mt-5">The interior.</h3>
            <ul className="mt-8 space-y-3">
              {model.interior.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-ink-200">
                  <span className="mt-2 h-1 w-1 flex-none rounded-full bg-accent" />
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="container-pod py-24 sm:py-28">
        <Reveal>
          <span className="eyebrow">Highlights</span>
          <h3 className="display-3 mt-5 max-w-2xl">What sets {model.name.replace("Terra Pod ", "")} apart.</h3>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {model.features.map((f, i) => (
            <Reveal key={f} delay={(i % 3) * 0.05}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-6 transition-colors duration-500 hover:border-accent/30">
                <div className="font-display text-xl text-accent">0{i + 1}</div>
                <p className="mt-4 text-sm leading-relaxed text-ink-100">{f}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {seriesData && others.length > 0 && (
        <section className="container-pod py-24 sm:py-28">
          <Reveal>
            <div className="flex items-end justify-between gap-6">
              <div className="max-w-xl">
                <span className="eyebrow">{seriesData.tagline}</span>
                <h3 className="display-3 mt-5">More from {seriesData.name}.</h3>
              </div>
              <Link href={`/models?series=${model.seriesSlug}`} className="btn-link">
                See series <span>→</span>
              </Link>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.slice(0, 3).map((o, i) => (
              <Reveal key={o.slug} delay={(i % 3) * 0.05}>
                <Link
                  href={`/models/${o.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-white/10 bg-[#fbfaf6] transition-colors hover:border-accent/40"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={o.catalogImage}
                      alt={o.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 to-transparent" />
                  </div>
                  <div className="bg-ink-950 p-5">
                    <div className="flex items-baseline justify-between gap-3">
                      <h4 className="font-display text-xl text-white">{o.name.replace("Terra Pod ", "")}</h4>
                      <span className="text-[11px] uppercase tracking-[0.22em] text-accent">{formatUSD(o.startingPrice)}</span>
                    </div>
                    <div className="mt-2 text-[11px] uppercase tracking-[0.22em] text-ink-400">{o.area} · {o.guests}</div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className="container-pod py-24 sm:py-32">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950 p-10 sm:p-16">
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="eyebrow">Reserve</span>
              <h3 className="display-2 mt-5 text-balance">
                Reserve the <span className="text-gold">{model.name.replace("Terra Pod ", "")}.</span>
              </h3>
              <p className="lead mt-6 max-w-md">
                A small refundable deposit secures your slot. A specialist will
                follow up within one business day with site requirements and
                final pricing.
              </p>
            </div>
            <div className="glass rounded-3xl p-8">
              <LeadForm variant="compact" defaultModel={model.slug} />
            </div>
          </div>
        </div>
      </section>

      <section className="container-pod pb-24">
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href={`/models/${prev.slug}`}
            className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-accent/40"
          >
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-ink-400">Previous</div>
              <div className="mt-1 font-display text-2xl text-white">{prev.name.replace("Terra Pod ", "")}</div>
            </div>
            <span className="text-2xl text-accent transition-transform group-hover:-translate-x-0.5">←</span>
          </Link>
          <Link
            href={`/models/${next.slug}`}
            className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-accent/40"
          >
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-ink-400">Next</div>
              <div className="mt-1 font-display text-2xl text-white">{next.name.replace("Terra Pod ", "")}</div>
            </div>
            <span className="text-2xl text-accent transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
