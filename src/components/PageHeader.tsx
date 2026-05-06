import type { ReactNode } from "react";

export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-36 sm:pt-44">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[40vh] bg-radial-glow" />
      <div className="container-pod relative">
        <div className="max-w-3xl">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1 className="display-2 mt-5 text-balance">{title}</h1>
          {subtitle && (
            <p className="lead mt-6 max-w-2xl text-balance">{subtitle}</p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
