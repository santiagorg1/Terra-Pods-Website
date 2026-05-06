"use client";

import { useSearchParams } from "next/navigation";
import LeadForm from "./LeadForm";

export default function ContactFormShell() {
  const params = useSearchParams();
  const tier = params.get("tier") ?? params.get("model") ?? undefined;
  return <LeadForm defaultModel={tier} />;
}
