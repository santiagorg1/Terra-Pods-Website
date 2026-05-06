import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import FinancingCalculator from "@/components/FinancingCalculator";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Financing",
  description:
    "Flexible financing for your Terra Pod. Calculate your monthly payment, explore lender partners, and pre-qualify in minutes.",
};

const benefits = [
  {
    title: "Tailored partners",
    body: "We work with specialized prefab and ADU lenders to source the right structure for your project.",
  },
  {
    title: "Competitive rates",
    body: "Most clients secure rates within 0.25–0.75% of conventional construction loans.",
  },
  {
    title: "Fast pre-qualification",
    body: "Soft credit pull and 48-hour turnaround for a confirmed financing proposal.",
  },
  {
    title: "No surprises",
    body: "Transparent draw schedules aligned to manufacturing milestones — not arbitrary timelines.",
  },
];

const faqs = [
  {
    q: "Can I finance a Terra Pod like a traditional home?",
    a: "In most cases, yes. When the pod is permanently sited on owned land, lenders typically treat it as new construction. We coordinate with you and your lender on the appraisal package.",
  },
  {
    q: "What credit profile is needed?",
    a: "Our partner lenders generally look for a credit score of 680+, though programs exist for scores as low as 640 with stronger down payments.",
  },
  {
    q: "Are off-grid pods financeable?",
    a: "Yes. Many of our lenders specialize in off-grid and solar-equipped residences. Energy systems are factored into the appraised value.",
  },
  {
    q: "Do you offer rent-to-own?",
    a: "We offer a 36-month lease-to-purchase program on Pod Solo and Pod Duo for qualifying clients.",
  },
];

export default function FinancingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Financing"
        title={
          <>
            Move in sooner. <span className="text-gold">Pay over time.</span>
          </>
        }
        subtitle="Use our calculator to model your monthly payment, then pre-qualify in 48 hours through a Terra Pods lending partner."
      />

      <section className="container-pod py-20 sm:py-28">
        <Reveal>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent p-8 sm:p-12">
            <FinancingCalculator />
          </div>
        </Reveal>
      </section>

      <section className="container-pod py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <span className="eyebrow">Why finance with us</span>
              <h2 className="display-3 mt-5">
                Lending, made <span className="text-gold">tasteful.</span>
              </h2>
            </Reveal>
          </div>
          <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5 sm:grid-cols-2 lg:col-span-8">
            {benefits.map((b) => (
              <div key={b.title} className="bg-ink-950 p-8">
                <h3 className="font-display text-2xl text-white">{b.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-300">
                  {b.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-pod py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <span className="eyebrow">Frequently asked</span>
              <h2 className="display-3 mt-5">
                Answers, <span className="text-gold">first.</span>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <div className="divide-y divide-white/5 border-y border-white/5">
              {faqs.map((f, i) => (
                <details
                  key={i}
                  className="group py-6 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                    <h3 className="font-display text-xl text-white sm:text-2xl">
                      {f.q}
                    </h3>
                    <span className="mt-2 grid h-7 w-7 flex-none place-items-center rounded-full border border-white/15 text-ink-300 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-300">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
