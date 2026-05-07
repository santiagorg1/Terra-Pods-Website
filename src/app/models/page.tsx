import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import ModelsBrowser from "@/components/ModelsBrowser";
import { models, series } from "@/lib/data";

export const metadata: Metadata = {
  title: "Models",
  description:
    "Twenty-six pods across ten series. From a 16 m² studio capsule to a 45 m² flagship residence — the complete Terra Pods 2028 catalog.",
};

export default function ModelsPage({
  searchParams,
}: {
  searchParams?: { series?: string };
}) {
  return (
    <>
      <PageHeader
        eyebrow="2028 Catalog"
        title={
          <>
            Twenty-six pods, <span className="text-gold">composed precisely.</span>
          </>
        }
        subtitle="Filter by series, sort by size or price, and step into any model for full specifications, financing, and reservation."
      />

      <section className="container-pod py-12 sm:py-16">
        <ModelsBrowser
          models={models}
          series={series}
          initialSeries={searchParams?.series}
        />
      </section>

      <section className="container-pod pb-32">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent p-10 text-center sm:p-16">
          <h3 className="display-3">Not sure which pod fits?</h3>
          <p className="mx-auto mt-5 max-w-xl text-ink-300">
            Our advisors will guide you through floor plans, finishes, site
            considerations, and financing — and pair you with the right pod for
            your vision.
          </p>
          <Link href="/contact" className="btn-primary mt-8">
            Talk to an advisor
          </Link>
        </div>
      </section>
    </>
  );
}
