import Reveal from "./Reveal";
import Counter from "./Counter";

const STATS = [
  { value: 35, suffix: "+", label: "Years on the U.S.–Mexico border" },
  { value: 24, suffix: "/7", label: "Operations · 365 days a year" },
  { value: 100, suffix: "%", label: "Licensed U.S. customs filings" },
  { value: 50, suffix: "+", label: "U.S. ports cleared via RLF" },
];

export default function Stats() {
  return (
    <section className="scene-dark relative border-y border-white/[0.06] py-20 sm:py-24">
      <div className="container-page">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="border-l border-white/[0.08] pl-6">
                <div className="display-2 leading-none">
                  <Counter to={s.value} suffix={s.suffix} duration={1.8} />
                </div>
                <div className="mt-3 max-w-[18ch] text-[12px] uppercase tracking-[0.22em] text-ink-300">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
