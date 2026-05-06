import Link from "next/link";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import TierCard from "@/components/TierCard";
import LeadForm from "@/components/LeadForm";
import {
  tiers,
  customizations,
  standardInclusions,
  useCases,
  processSteps,
  contact,
} from "@/lib/data";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="container-pod py-24 sm:py-32">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="eyebrow">Markets</span>
              <h2 className="display-2 mt-5">
                Built for <span className="text-terra">every</span> use case.
              </h2>
              <p className="lead mt-6">
                From a single AirBnB pod to a 400-unit emergency deployment —
                same chassis, same factory, same in-house team.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5 sm:grid-cols-2">
              {useCases.map((u, i) => (
                <Reveal key={u.name} delay={i * 0.04}>
                  <div className="h-full bg-ink-950 p-6 transition-colors hover:bg-ink-900">
                    <h3 className="font-display text-xl text-white">{u.name}</h3>
                    <p className="mt-2 text-sm text-ink-300">{u.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-pod py-24 sm:py-32">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <span className="eyebrow">Built your way</span>
              <h2 className="display-2 mt-5">
                Three tiers. <span className="text-terra">25 models.</span>
              </h2>
              <p className="lead mt-6">
                ADU compliant · Housing code certified · All-weather engineered.
              </p>
            </div>
            <Link href="/models" className="btn-link">
              All tiers <span>→</span>
            </Link>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {tiers.map((t, i) => (
            <Reveal key={t.slug} delay={i * 0.06}>
              <TierCard tier={t} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-pod py-24 sm:py-32">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="eyebrow">Factory customizations</span>
              <h2 className="display-2 mt-5">
                Configure at the <span className="text-terra">source.</span>
              </h2>
              <p className="lead mt-6">
                Solar, kitchen, bar, heated floors, skylight, smart voice,
                projector, wardrobe — all installed at the factory before the
                pod ships.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {customizations.map((c, i) => (
                <Reveal key={c.title} delay={i * 0.03}>
                  <div className="h-full rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-5 transition-all hover:border-accent/40 hover:from-white/[0.07]">
                    <h3 className="text-sm font-medium text-white">{c.title}</h3>
                    <p className="mt-1.5 text-xs text-ink-400">{c.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.2}>
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="text-[10px] uppercase tracking-[0.24em] text-ink-300">
                  Every pod includes as standard
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-200">
                  {standardInclusions.join(" · ")}.
                </p>
              </div>
            </Reveal>
          </div>
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
              <span className="eyebrow">How it works</span>
              <h2 className="display-2 mt-5">
                Order. Configure.{" "}
                <span className="text-terra">Deliver. Move in.</span>
              </h2>
              <p className="lead mt-6">
                In-house from start to finish — no outsourcing, no surprises.
              </p>
              <ol className="mt-10 space-y-7">
                {processSteps.map((s) => (
                  <li
                    key={s.n}
                    className="grid grid-cols-[auto_1fr] gap-6 border-l-2 border-accent/40 pl-6"
                  >
                    <div className="font-display text-3xl text-accent">{s.n}</div>
                    <div>
                      <h3 className="text-lg font-medium text-white">
                        {s.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-ink-300">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="container-pod py-16 sm:py-20">
        <div className="grid gap-4 md:grid-cols-2">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-accent/40 bg-gradient-to-br from-accent/30 to-accent/10 p-8 sm:p-10">
              <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-white/80">
                Showroom Ready
              </span>
              <h3 className="font-display text-3xl text-white sm:text-4xl mt-3">
                3 Pods. {contact.city}.
              </h3>
              <p className="mt-4 text-sm text-white/85">
                Text or call{" "}
                <a href={contact.phonePrimaryHref} className="font-medium underline">
                  {contact.phonePrimary}
                </a>{" "}
                to schedule.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-terra-dark/80 to-ink-900 p-8 sm:p-10">
              <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-accent-soft">
                US & Mexico Gateway
              </span>
              <h3 className="font-display text-3xl text-white sm:text-4xl mt-3">
                Both markets. One team.
              </h3>
              <p className="mt-4 text-sm text-ink-200">
                We serve clients on both sides of the border with the same
                in-house logistics, customs, and bonded yard.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-pod py-24 sm:py-32">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950 p-10 sm:p-16">
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="eyebrow">Get in touch</span>
              <h2 className="display-2 mt-5 text-balance">
                Order a pod. <span className="text-terra">Or 400.</span>
              </h2>
              <p className="lead mt-6 max-w-md">
                Tell us about your project. A specialist will respond within one
                business day with pricing, lead times, and the right
                configuration for your site.
              </p>
              <div className="mt-8 grid gap-3 text-sm text-ink-200 sm:grid-cols-2">
                <a
                  href={contact.phonePrimaryHref}
                  className="rounded-2xl border border-white/10 px-5 py-4 transition-colors hover:border-accent/40"
                >
                  <div className="text-[10px] uppercase tracking-[0.2em] text-ink-400">
                    Del Rio · Primary
                  </div>
                  <div className="mt-1 font-display text-xl text-white">
                    {contact.phonePrimary}
                  </div>
                </a>
                <a
                  href={contact.phoneSecondaryHref}
                  className="rounded-2xl border border-white/10 px-5 py-4 transition-colors hover:border-accent/40"
                >
                  <div className="text-[10px] uppercase tracking-[0.2em] text-ink-400">
                    Direct
                  </div>
                  <div className="mt-1 font-display text-xl text-white">
                    {contact.phoneSecondary}
                  </div>
                </a>
              </div>
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
