"use client";

import { useSearchParams } from "next/navigation";
import LeadForm from "./LeadForm";

export default function ContactFormShell() {
  const params = useSearchParams();
  const model = params.get("model") ?? undefined;
  return <LeadForm defaultModel={model} />;
}
