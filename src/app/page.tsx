import Link from "next/link";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";
import ModelCard from "@/components/ModelCard";
import LeadForm from "@/components/LeadForm";
import SeriesStrip from "@/components/SeriesStrip";
import PodSilhouette from "@/components/PodSilhouette";
import { models, series, getSeriesModels } from "@/lib/data";

const featuredSlugs = ["a9", "h5", "ae40-a", "w9", "r7", "a9d"];

export default function HomePage() {
  const featured = featuredSlugs
    .map((s) => models.find((m) => m.slug === s)!)
    .filter(Boolean);

  return (
    <>
      <Hero />

      <section className="py-20 sm:py-24">
        <Marquee />
      </section>

      <section className="container-pod py-24 sm:py-32">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="eyebrow">Philosophy</span>
              <h2 className="display-2 mt-5">
                A new architecture of <span className="text-gold">simplicity.</span>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <p className="text-lg leading-relaxed text-ink-200">
                Terra Pods are designed in our studio and built in a precision-controlled
                factory — then delivered complete, on a single truck, ready to live in
                within a day of arrival on site.
              </p>
              <p className="mt-6 text-base leading-relaxed text-ink-300">
                Every pod is composed of just a handful of materials chosen for
                permanence: galvanized steel, fluorocarbon-sprayed aluminium,
                three-layer tempered glass, and stone-effect wood-grain interiors.
                The result is a residence that disappears into its landscape and ages
                gracefully with it.
              </p>
            </Reveal>

            <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-4">
              {[
                ["3-layer", "Tempered glazing"],
                ["−68%", "Waste vs. on-site"],
                ["A++", "Energy class"],
                ["50 yr", "Design life"],
              ].map(([k, v]) => (
                <div key={k} className="bg-ink-950 px-5 py-6 text-center">
                  <div className="font-display text-2xl text-white">{k}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-ink-400">
                    {v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-pod py-20 sm:py-24">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <span className="eyebrow">Featured</span>
              <h2 className="display-2 mt-5">
                Six pods, <span className="text-gold">our cellar pick.</span>
              </h2>
              <p className="lead mt-5 max-w-xl">
                A curated cross-section of the 2028 catalog — from our flagship
                capsule to the modular cabin system.
              </p>
            </div>
            <Link href="/models" className="btn-link">
              Browse all 26 <span>→</span>
            </Link>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((m, i) => (
            <Reveal key={m.slug} delay={(i % 3) * 0.06}>
              <ModelCard model={m} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="container-pod">
          <Reveal>
            <span className="eyebrow">The collection</span>
            <h2 className="display-2 mt-5 max-w-3xl text-balance">
              Ten series, <span className="text-gold">one design language.</span>
            </h2>
          </Reveal>
        </div>
        <div className="mt-16 space-y-20">
          {series.slice(0, 4).map((s) => (
            <SeriesStrip key={s.slug} series={s} models={getSeriesModels(s.slug)} />
          ))}
        </div>
        <div className="container-pod mt-16 text-center">
          <Link href="/models" className="btn-ghost">
            See the remaining {series.length - 4} series →
          </Link>
        </div>
      </section>

      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 bg-radial-fade" />
        <div className="container-pod relative">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
            <Reveal>
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-8">
                <svg className="absolute inset-0 h-full w-full opacity-[0.06]">
                  <defs>
                    <pattern id="proc-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#proc-grid)" />
                </svg>
                <div className="relative flex h-full flex-col">
                  <div className="text-[10px] uppercase tracking-[0.24em] text-ink-400">
                    Series silhouettes
                  </div>
                  <div className="mt-2 font-display text-2xl text-white">A line of forms.</div>
                  <div className="mt-auto space-y-6">
                    {series.slice(0, 4).map((s) => {
                      const first = models.find((m) => m.seriesSlug === s.slug)!;
                      return (
                        <div key={s.slug} className="grid grid-cols-[60px_1fr_auto] items-center gap-4">
                          <div className="font-display text-base text-accent">{s.shortCode}</div>
                          <PodSilhouette
                            variant={first.silhouette}
                            color={s.accent}
                            className="h-10 w-full"
                            animated={false}
                            showGround={false}
                          />
                          <div className="text-[10px] uppercase tracking-[0.22em] text-ink-400">
                            {s.name}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <span className="eyebrow">Process</span>
              <h2 className="display-2 mt-5">
                From inquiry to <span className="text-gold">arrival.</span>
              </h2>
              <ol className="mt-10 space-y-8">
                {[
                  ["01", "Discovery", "We learn about your site, your goals, and your timeline."],
                  ["02", "Configuration", "Choose your series, length, finish, and optional packages."],
                  ["03", "Manufacture", "Your pod is built and inspected in our factory in 10–22 weeks."],
                  ["04", "Arrival", "We deliver and install — turn-key — in a single day on site."],
                ].map(([n, t, d]) => (
                  <li key={n} className="grid grid-cols-[auto_1fr] gap-6">
                    <div className="font-display text-2xl text-accent">{n}</div>
                    <div>
                      <h3 className="text-lg font-medium text-white">{t}</h3>
                      <p className="mt-1.5 text-sm text-ink-300">{d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="container-pod py-24 sm:py-32">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950 p-10 sm:p-16">
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-moss/20 blur-3xl" />
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="eyebrow">Reserve</span>
              <h2 className="display-2 mt-5 text-balance">
                Begin your <span className="text-gold">Terra Pod</span> journey.
              </h2>
              <p className="lead mt-6 max-w-md">
                Tell us a little about your project. A specialist will be in
                touch within one business day with pricing, lead times, and
                site requirements.
              </p>
            </div>
            <div className="glass rounded-3xl p-8">
              <LeadForm variant="compact" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
