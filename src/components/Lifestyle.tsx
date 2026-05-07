"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { models } from "@/lib/data";

// Pull a small set of interior photos from the catalog, paired with editorial copy.
const slugs = ["ae40-a", "a9", "w9", "h5"];
const STORY = [
  {
    title: "The morning light",
    body:
      "A horizon line of three-layer tempered glass. The pod doesn't sit on the site — it frames it. You wake into the landscape, not into a room.",
    interior: 0,
  },
  {
    title: "An interior of permanence",
    body:
      "Stone-effect ceiling modules, crystal wood-grain floors, marble bathrooms, branded smart fixtures. Five materials, chosen for fifty years.",
    interior: 1,
  },
  {
    title: "Engineered for stillness",
    body:
      "Whole-house ventilation, electric underfloor heating, mosquito-proof screens, smart voice control. Every system is hidden — so the architecture remains.",
    interior: 2,
  },
];

export default function Lifestyle() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["6%", "-10%"]);

  // Pick one interior photo per chapter from across the collection.
  const chapters = STORY.map((s, i) => {
    const m = models.find((x) => x.slug === slugs[i]);
    if (!m) return null;
    const interior = m.interiors[s.interior] ?? m.interiors[0];
    return { ...s, model: m, interior };
  }).filter(Boolean) as Array<
    (typeof STORY)[number] & {
      model: (typeof models)[number];
      interior: NonNullable<(typeof models)[number]["interiors"][number]>;
    }
  >;

  return (
    <section ref={ref} className="scene relative py-32 sm:py-44">
      <motion.div
        aria-hidden
        style={{ y }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute inset-x-0 top-0 h-[30vh] bg-radial-glow" />
      </motion.div>

      <div className="container-pod relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <span className="eyebrow">A day in the pod</span>
          <h2 className="display-2 mt-7 text-balance">
            Designed for a slower <span className="display-italic text-gold">life</span>.
          </h2>
        </motion.div>

        <div className="mt-24 space-y-32 sm:space-y-44">
          {chapters.map((c, i) => {
            const reverse = i % 2 === 1;
            return (
              <motion.article
                key={c.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className={`grid items-center gap-10 lg:grid-cols-12 lg:gap-16 ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <ChapterImage interior={c.interior} index={i} />
                <div className="lg:col-span-5">
                  <div className="text-[10px] uppercase tracking-[0.32em] text-accent">
                    Chapter 0{i + 1}
                  </div>
                  <h3 className="mt-5 font-display text-4xl text-white sm:text-5xl">
                    {c.title}
                  </h3>
                  <p className="mt-7 max-w-md text-base leading-relaxed text-ink-200 sm:text-lg sm:leading-[1.7]">
                    {c.body}
                  </p>
                  <div className="mt-10 flex items-center gap-6 border-t border-white/5 pt-6">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.28em] text-ink-500">
                        Featured pod
                      </div>
                      <div className="mt-2 font-display text-xl text-white">
                        {c.model.short} · {c.model.area}
                      </div>
                    </div>
                    <Link
                      href={`/models/${c.model.slug}`}
                      className="ml-auto btn-link-luxury"
                    >
                      Step inside <span>→</span>
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ChapterImage({
  interior,
  index,
}: {
  interior: NonNullable<(typeof models)[number]["interiors"][number]>;
  index: number;
}) {
  return (
    <motion.div
      whileHover="hover"
      animate="rest"
      className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-white/[0.08] lg:col-span-7"
    >
      <motion.div
        variants={{ rest: { scale: 1.02 }, hover: { scale: 1.06 } }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        <Image
          src={interior.src}
          alt={interior.alt}
          fill
          sizes="(min-width: 1280px) 58vw, (min-width: 768px) 80vw, 100vw"
          quality={92}
          className="object-cover"
          priority={index === 0}
        />
      </motion.div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-ink-950/60 via-transparent to-transparent"
      />
      <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-[10px] uppercase tracking-[0.32em] text-ink-200">
        <span>{interior.label}</span>
        <span>№ 0{index + 1}</span>
      </div>
    </motion.div>
  );
}
