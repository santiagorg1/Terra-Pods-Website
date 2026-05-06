import type { Metadata } from "next";
import { Suspense } from "react";
import PageHeader from "@/components/PageHeader";
import LeadForm from "@/components/LeadForm";
import ContactFormShell from "@/components/ContactFormShell";
import { contact } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Speak with a Terra Pods USA specialist. Visit our Del Rio, TX showroom — 3 pods on the yard. Call (830) 422-5062 or (361) 434-9855.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Call us. <span className="text-terra">Or come see one.</span>
          </>
        }
        subtitle="Three pods on our Del Rio yard. $67,800 starting · 27.2m² · panoramic balcony · fully equipped. Text or call to schedule a walk-through."
      />

      <section className="container-pod py-20 sm:py-24">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="space-y-8">
              <a
                href={contact.phonePrimaryHref}
                className="block rounded-3xl border border-accent/40 bg-gradient-to-br from-accent/30 to-accent/10 p-8 transition-transform hover:scale-[1.01]"
              >
                <div className="text-[10px] font-medium uppercase tracking-[0.24em] text-white/85">
                  Del Rio, TX · Primary
                </div>
                <div className="mt-3 font-display text-4xl text-white">
                  {contact.phonePrimary}
                </div>
                <div className="mt-3 text-sm text-white/85">
                  Text or call to schedule a showroom visit.
                </div>
              </a>
              <a
                href={contact.phoneSecondaryHref}
                className="block rounded-3xl border border-white/10 bg-white/[0.02] p-8 transition-colors hover:border-accent/40"
              >
                <div className="text-[10px] font-medium uppercase tracking-[0.24em] text-ink-300">
                  Direct line
                </div>
                <div className="mt-3 font-display text-4xl text-white">
                  {contact.phoneSecondary}
                </div>
              </a>

              <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5 sm:grid-cols-2">
                <div className="bg-ink-950 p-6">
                  <h3 className="text-xs font-medium uppercase tracking-[0.24em] text-ink-300">
                    Showroom
                  </h3>
                  <p className="mt-3 font-display text-xl text-white">
                    3 Pods. Del Rio, TX.
                  </p>
                  <p className="mt-1 text-sm text-ink-400">
                    By appointment only.
                  </p>
                </div>
                <div className="bg-ink-950 p-6">
                  <h3 className="text-xs font-medium uppercase tracking-[0.24em] text-ink-300">
                    Region
                  </h3>
                  <p className="mt-3 font-display text-xl text-white">
                    {contact.region}
                  </p>
                  <p className="mt-1 text-sm text-ink-400">
                    One in-house team. Both sides of the border.
                  </p>
                </div>
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
                      stroke="rgba(212,74,38,0.6)"
                      strokeWidth="1.5"
                    />
                    <text
                      x="200"
                      y="150"
                      textAnchor="middle"
                      fontSize="11"
                      letterSpacing="3"
                      fill="rgba(212,74,38,0.9)"
                    >
                      DEL RIO · TX
                    </text>
                    <circle cx="200" cy="170" r="6" fill="#d44a26" />
                    <circle
                      cx="200"
                      cy="170"
                      r="14"
                      fill="none"
                      stroke="rgba(212,74,38,0.4)"
                    />
                    <circle
                      cx="200"
                      cy="170"
                      r="28"
                      fill="none"
                      stroke="rgba(212,74,38,0.2)"
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
