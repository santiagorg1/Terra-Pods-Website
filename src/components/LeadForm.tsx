"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function LeadForm({
  variant = "full",
  defaultModel,
}: {
  variant?: "full" | "compact";
  defaultModel?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    try {
      await new Promise((r) => setTimeout(r, 900));
      console.info("Lead captured", payload);
      setStatus("success");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-accent/30 bg-gradient-to-b from-accent/10 to-transparent p-10 text-center">
        <div className="mx-auto mb-5 grid h-12 w-12 place-items-center rounded-full border border-accent/40 bg-accent/10">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12.5l4.5 4.5L19 7"
              stroke="#c9a86a"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="font-display text-3xl text-white">Thank you</h3>
        <p className="mx-auto mt-3 max-w-md text-ink-300">
          Your inquiry has been received. A Terra Pods specialist will be in
          touch within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="firstName">First name</label>
          <input
            id="firstName"
            name="firstName"
            required
            className="field"
            placeholder="Ada"
          />
        </div>
        <div>
          <label className="label" htmlFor="lastName">Last name</label>
          <input
            id="lastName"
            name="lastName"
            required
            className="field"
            placeholder="Lovelace"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="field"
            placeholder="you@domain.com"
          />
        </div>
        <div>
          <label className="label" htmlFor="phone">Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="field"
            placeholder="(555) 555-0123"
          />
        </div>
      </div>

      {variant === "full" && (
        <>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="tier">Tier of interest</label>
              <select
                id="tier"
                name="tier"
                defaultValue={defaultModel ?? ""}
                className="field"
              >
                <option value="">Select a tier</option>
                <option value="entry">Entry & Studio — from $47,500</option>
                <option value="mid">Mid-Range — from $64,300</option>
                <option value="flagship">Flagship — from $84,500</option>
                <option value="bulk">Bulk / disaster relief deployment</option>
                <option value="undecided">Help me decide</option>
              </select>
            </div>
            <div>
              <label className="label" htmlFor="useCase">Use case</label>
              <select id="useCase" name="useCase" className="field" defaultValue="">
                <option value="">Select use case</option>
                <option value="airbnb">AirBnB / short-stay</option>
                <option value="adu">ADU / accessory dwelling</option>
                <option value="ranch">Ranch / agricultural</option>
                <option value="cafe">Café / retail</option>
                <option value="office">Office / studio</option>
                <option value="man-camp">Man camp / workforce</option>
                <option value="section-8">Section 8 / affordable housing</option>
                <option value="disaster">Disaster relief / emergency</option>
                <option value="developer">Developer / multi-unit</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div>
            <label className="label" htmlFor="message">Project notes</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="field resize-none"
              placeholder="Tell us about your site, quantity, timeline, and customizations."
            />
          </div>
        </>
      )}

      <div className="flex flex-col items-stretch gap-4 pt-2 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-primary group flex-1 sm:flex-none"
        >
          {status === "loading" ? (
            <>
              <span className="h-2 w-2 animate-pulse rounded-full bg-ink-950" />
              Submitting…
            </>
          ) : (
            <>
              Request Information
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </>
          )}
        </button>
        <p className="text-xs text-ink-400">
          We'll be in touch within one business day. No spam.
        </p>
      </div>
      {status === "error" && (
        <p className="text-sm text-red-400">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
