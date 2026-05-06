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
    q: "Can a Terra Pod be a business tax write-off?",
    a: "Yes — for many use cases (AirBnB, ranch operations, commercial deployments, developer projects), a Terra Pod can be purchased as a business tax write-off. Consult your CPA for your specific situation.",
  },
  {
    q: "Are there permits or property tax obligations?",
    a: "Because Terra Pods are temporary structures, most jurisdictions require no permits and assess no property tax. ADU compliance and US housing code certification handle the rest.",
  },
  {
    q: "Can I finance a Terra Pod like a traditional home?",
    a: "Yes. We work with lenders who treat Terra Pods as new construction or personal property loans depending on your project. We coordinate the appraisal package with you and your lender.",
  },
  {
    q: "What credit profile is needed?",
    a: "Our partner lenders generally look for a credit score of 680+, though programs exist for scores as low as 640 with stronger down payments and stronger DTI.",
  },
  {
    q: "Do you finance multi-unit deployments?",
    a: "Yes — for developer, hospitality, workforce-housing, and disaster-relief projects we work with commercial lenders and bonded escrow structures. Bulk pricing applies above 10 units.",
  },
];

export default function FinancingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Financing · Tax write-off eligible"
        title={
          <>
            Move in sooner. <span className="text-terra">Pay over time.</span>
          </>
        }
        subtitle="Model your monthly payment with our calculator, then pre-qualify in 48 hours through a Terra Pods lending partner. Many use cases qualify as a business tax write-off."
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
                Lending, made <span className="text-terra">simple.</span>
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
                Answers, <span className="text-terra">first.</span>
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
