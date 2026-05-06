import Link from "next/link";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";
import ModelCard from "@/components/ModelCard";
import LeadForm from "@/components/LeadForm";
import { models } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="py-24 sm:py-28">
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
                Terra Pods are designed in a Northern California studio and
                built in a precision-controlled factory — then delivered
                complete, on a single truck, ready to live in within a day of
                arrival on site.
              </p>
              <p className="mt-6 text-base leading-relaxed text-ink-300">
                Every pod is composed of just a handful of materials chosen for
                permanence: structural steel, glass, certified timber, and
                polished concrete. The result is a residence that disappears
                into its landscape and ages gracefully with it.
              </p>
            </Reveal>

            <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-4">
              {[
                ["98%", "Recyclable"],
                ["−68%", "Waste vs. on-site"],
                ["A++", "Energy class"],
                ["50 yr", "Design life"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="bg-ink-950 px-5 py-6 text-center"
                >
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

      <section className="container-pod py-24 sm:py-32">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <span className="eyebrow">The Collection</span>
              <h2 className="display-2 mt-5">
                Four pods. <span className="text-gold">Endless sites.</span>
              </h2>
            </div>
            <Link href="/models" className="btn-link">
              All models <span>→</span>
            </Link>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {models.map((m, i) => (
            <Reveal key={m.slug} delay={i * 0.06}>
              <ModelCard model={m} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 bg-radial-fade" />
        <div className="container-pod relative">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
            <Reveal>
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('/images/factory.jpg')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 to-transparent" />
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
                  ["02", "Design", "We tailor finishes, layouts, and off-grid specifications."],
                  ["03", "Manufacture", "Your pod is built and inspected in our factory in 12—22 weeks."],
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
