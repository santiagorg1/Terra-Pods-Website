import type { Metadata } from "next";
import { Suspense } from "react";
import PageHeader from "@/components/PageHeader";
import LeadForm from "@/components/LeadForm";
import ContactFormShell from "@/components/ContactFormShell";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Speak with a Terra Pods specialist. Request pricing, plan a site visit, or begin your reservation.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Begin a <span className="text-gold">conversation.</span>
          </>
        }
        subtitle="Tell us about your site, your timeline, and the pod you're considering. A specialist will respond within one business day."
      />

      <section className="container-pod py-20 sm:py-24">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="space-y-10">
              <div>
                <h3 className="text-xs font-medium uppercase tracking-[0.24em] text-ink-300">
                  Studio
                </h3>
                <p className="mt-3 text-lg leading-relaxed text-white">
                  3221 E Hwy 90<br />
                  Del Rio, Texas 78840
                </p>
                <p className="mt-2 text-sm text-ink-400">
                  By appointment only.
                </p>
              </div>
              <div>
                <h3 className="text-xs font-medium uppercase tracking-[0.24em] text-ink-300">
                  Sales
                </h3>
                <ul className="mt-3 space-y-1 text-lg text-white">
                  <li>
                    <a
                      href="tel:+18304225062"
                      className="transition-colors hover:text-accent"
                    >
                      (830) 422-5062
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+13614349855"
                      className="transition-colors hover:text-accent"
                    >
                      (361) 434-9855
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-medium uppercase tracking-[0.24em] text-ink-300">
                  Email
                </h3>
                <p className="mt-3 text-lg text-white">
                  <a
                    href="mailto:hello@terrapods.com"
                    className="transition-colors hover:text-accent"
                  >
                    hello@terrapods.com
                  </a>
                </p>
              </div>
              <div>
                <h3 className="text-xs font-medium uppercase tracking-[0.24em] text-ink-300">
                  Hours
                </h3>
                <p className="mt-3 text-lg text-white">
                  Mon — Fri · 9am — 6pm CT
                </p>
                <p className="mt-1 text-sm text-ink-400">
                  Sat — Sun · By appointment
                </p>
              </div>

              <div className="overflow-hidden rounded-3xl border border-white/10">
                <div className="aspect-[5/4] bg-[linear-gradient(135deg,#101316_0%,#181c20_100%)] p-8">
                  <svg
                    viewBox="0 0 400 320"
                    className="h-full w-full opacity-70"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <pattern
                        id="grid"
                        width="20"
                        height="20"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M20 0H0v20"
                          fill="none"
                          stroke="rgba(255,255,255,0.05)"
                          strokeWidth="1"
                        />
                      </pattern>
                    </defs>
                    <rect width="400" height="320" fill="url(#grid)" />
                    <path
                      d="M0 200 C 80 180, 140 220, 200 200 S 320 180, 400 200"
                      fill="none"
                      stroke="rgba(201,168,106,0.4)"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="200"
                      cy="160"
                      r="6"
                      fill="#c9a86a"
                    />
                    <circle
                      cx="200"
                      cy="160"
                      r="14"
                      fill="none"
                      stroke="rgba(201,168,106,0.4)"
                    />
                    <circle
                      cx="200"
                      cy="160"
                      r="28"
                      fill="none"
                      stroke="rgba(201,168,106,0.2)"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="glass rounded-3xl p-8 sm:p-10">
              <Suspense fallback={<LeadForm />}>
                <ContactFormShell />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
