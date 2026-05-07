import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import AirbnbCalculator from "@/components/AirbnbCalculator";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "AirBnB ROI Calculator",
  description:
    "Model the rental income of a Terra Pod in any US market. See nightly rate, occupancy, payback period, and 5- and 10-year ROI in seconds.",
};

const benefits = [
  {
    title: "Tax write-off eligible",
    body: "Most short-term-rental and ranch use cases qualify as a business tax write-off. Consult your CPA.",
  },
  {
    title: "No permits, no property tax",
    body: "Treated as a temporary structure in most jurisdictions — no permitting timeline, no annual property tax bill.",
  },
  {
    title: "Faster than construction",
    body: "From order to revenue in 14 weeks vs 12+ months for a stick-built ADU. Same income, sooner.",
  },
  {
    title: "Code-compliant on day one",
    body: "ADU + US housing code certified — list on AirBnB, Vrbo, or rent long-term to Section 8 with zero retrofit.",
  },
];

export default function RoiPage() {
  return (
    <>
      <PageHeader
        eyebrow="AirBnB ROI calculator"
        title={
          <>
            How much can your <span className="text-terra">pod earn?</span>
          </>
        }
        subtitle="Model rental income, expenses, and payback for any US market. Default rates reflect AirDNA-style averages for ADU pods in popular short-term-rental destinations."
      />

      <section className="container-pod py-20 sm:py-24">
        <Reveal>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent p-8 sm:p-12">
            <AirbnbCalculator />
          </div>
        </Reveal>
      </section>

      <section className="container-pod py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <span className="eyebrow">Why pods, not stick-built</span>
              <h2 className="display-3 mt-5">
                Faster to revenue. <span className="text-terra">Lower friction.</span>
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

      <section className="container-pod pb-32">
        <div className="rounded-3xl border border-accent/40 bg-gradient-to-br from-accent/30 to-accent/5 p-10 text-center sm:p-16">
          <h3 className="display-3">Ready to deploy?</h3>
          <p className="mx-auto mt-5 max-w-xl text-white/85">
            We'll walk you through site requirements, financing, and the right
            tier for your market — and have a unit on your property in weeks,
            not months.
          </p>
          <Link href="/contact" className="btn-primary mt-8 bg-white text-accent hover:bg-white/90">
            Start a project
          </Link>
        </div>
      </section>
    </>
  );
}
