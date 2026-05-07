import type { ReactNode } from "react";

export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  children,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <section className="relative overflow-hidden pb-12 pt-44 sm:pb-20 sm:pt-56">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-[60vh] bg-radial-glow" />
        <div className="absolute left-1/2 top-[20%] h-[60vh] w-[60vh] -translate-x-1/2 rounded-full bg-accent/[0.04] blur-[100px]" />
      </div>

      <div className="container-pod relative">
        <div className={align === "center" ? "mx-auto max-w-4xl text-center" : "max-w-4xl"}>
          {eyebrow && (
            <span className={align === "center" ? "eyebrow-center" : "eyebrow"}>
              {eyebrow}
            </span>
          )}
          <h1 className="display-1 mt-10 text-balance">{title}</h1>
          {subtitle && (
            <p className="lead-prose mt-10 max-w-2xl text-balance text-ink-200">
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
