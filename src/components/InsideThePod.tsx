"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { InteriorPhoto } from "@/lib/data";

type Props = {
  interiors: InteriorPhoto[];
  modelShort: string;
  accent?: string;
};

export default function InsideThePod({ interiors, modelShort, accent = "#c9a86a" }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const yShift = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight")
        setOpenIndex((i) => (i === null ? null : (i + 1) % interiors.length));
      if (e.key === "ArrowLeft")
        setOpenIndex((i) => (i === null ? null : (i - 1 + interiors.length) % interiors.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, interiors.length]);

  if (interiors.length === 0) return null;

  // Layout: alternating tall/wide based on count.
  // 2 photos → side by side, both ~16:10.
  // 3 photos → first wide hero + 2 below in 2-up grid.
  const isThree = interiors.length >= 3;
  const hero = interiors[0];
  const rest = interiors.slice(1);

  return (
    <section
      ref={sectionRef}
      className="scene relative py-32 sm:py-44"
    >
      <motion.div
        aria-hidden
        style={{ y: yShift }}
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at top, ${accent}10, transparent 60%)`,
          }}
        />
      </motion.div>

      <div className="container-pod relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="grid items-end gap-8 border-b border-white/5 pb-10 lg:grid-cols-12"
        >
          <div className="lg:col-span-7">
            <span className="eyebrow">Inside the pod</span>
            <h2 className="display-2 mt-7 text-balance">
              Step inside the <span className="display-italic text-gold">{modelShort}</span>.
            </h2>
          </div>
          <p className="text-base leading-relaxed text-ink-300 lg:col-span-5">
            A glimpse of the interior — light, materials, and proportions.
            Click any image to open the lightbox.
          </p>
        </motion.div>

        {isThree ? (
          <div className="mt-14 grid gap-6 sm:gap-8 lg:grid-cols-12">
            {/* Hero — large left-side image */}
            <InteriorTile
              photo={hero}
              index={0}
              accent={accent}
              onOpen={() => setOpenIndex(0)}
              className="aspect-[16/11] lg:col-span-7 lg:row-span-2"
              priority
            />
            {/* Right-column smaller tiles */}
            <InteriorTile
              photo={rest[0]}
              index={1}
              accent={accent}
              onOpen={() => setOpenIndex(1)}
              className="aspect-[16/9] lg:col-span-5"
            />
            <InteriorTile
              photo={rest[1]}
              index={2}
              accent={accent}
              onOpen={() => setOpenIndex(2)}
              className="aspect-[16/9] lg:col-span-5"
            />
          </div>
        ) : (
          <div className="mt-14 grid gap-6 sm:gap-8 lg:grid-cols-12">
            <InteriorTile
              photo={hero}
              index={0}
              accent={accent}
              onOpen={() => setOpenIndex(0)}
              className="aspect-[16/10] lg:col-span-7"
              priority
            />
            <InteriorTile
              photo={rest[0]}
              index={1}
              accent={accent}
              onOpen={() => setOpenIndex(1)}
              className="aspect-[16/10] lg:col-span-5"
            />
          </div>
        )}
      </div>

      {/* Lightbox */}
      {openIndex !== null && (
        <Lightbox
          photos={interiors}
          index={openIndex}
          modelShort={modelShort}
          accent={accent}
          onClose={() => setOpenIndex(null)}
          onPrev={() =>
            setOpenIndex((i) => (i === null ? null : (i - 1 + interiors.length) % interiors.length))
          }
          onNext={() =>
            setOpenIndex((i) => (i === null ? null : (i + 1) % interiors.length))
          }
        />
      )}
    </section>
  );
}

function InteriorTile({
  photo,
  index,
  accent,
  onOpen,
  className = "",
  priority = false,
}: {
  photo: InteriorPhoto;
  index: number;
  accent: string;
  onOpen: () => void;
  className?: string;
  priority?: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.1, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover="hover"
      animate="rest"
      className={`group relative overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-ink-900 text-left ${className}`}
    >
      <motion.div
        variants={{ rest: { scale: 1.02 }, hover: { scale: 1.08 } }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(min-width: 1280px) 60vw, (min-width: 768px) 80vw, 100vw"
          quality={92}
          className="object-cover"
          priority={priority}
        />
      </motion.div>

      {/* Vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/15 to-transparent"
      />

      {/* Caption */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 sm:p-8">
        <div>
          <div
            className="text-[10px] uppercase tracking-[0.32em]"
            style={{ color: accent }}
          >
            № 0{index + 1}
          </div>
          <div className="mt-2 font-display text-2xl text-white sm:text-3xl">
            {photo.label}
          </div>
        </div>
        <motion.span
          variants={{
            rest: { opacity: 0.5, x: 0 },
            hover: { opacity: 1, x: 4 },
          }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="hidden items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-white sm:flex"
        >
          Open
          <span className="text-base">↗</span>
        </motion.span>
      </div>

      {/* Hover gold rule */}
      <motion.span
        variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ background: accent }}
        className="absolute inset-x-6 bottom-4 block h-px origin-left sm:inset-x-8"
      />
    </motion.button>
  );
}

function Lightbox({
  photos,
  index,
  modelShort,
  accent,
  onClose,
  onPrev,
  onNext,
}: {
  photos: InteriorPhoto[];
  index: number;
  modelShort: string;
  accent: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const photo = photos[index];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-ink-950/95 backdrop-blur-2xl"
      onClick={onClose}
    >
      {/* Atmospheric glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, ${accent}1a, transparent 70%)`,
        }}
      />

      {/* Top bar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between p-6 sm:p-10">
        <div className="text-[10px] uppercase tracking-[0.32em] text-ink-300">
          {modelShort} · {photo.label}{" "}
          <span className="ml-3 text-ink-500">
            {index + 1} / {photos.length}
          </span>
        </div>
        <button
          type="button"
          aria-label="Close"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="pointer-events-auto grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/[0.04] text-white transition-all duration-500 hover:border-accent/60"
        >
          ×
        </button>
      </div>

      {/* Image */}
      <motion.div
        key={photo.src}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative h-[80vh] max-h-[900px] w-[90vw] max-w-[1500px]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="90vw"
          quality={95}
          className="object-contain"
          priority
        />
      </motion.div>

      {/* Navigation */}
      {photos.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-4 top-1/2 z-10 grid h-14 w-14 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-white/[0.04] text-2xl text-white transition-all duration-500 hover:border-accent/60 sm:left-10"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-4 top-1/2 z-10 grid h-14 w-14 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-white/[0.04] text-2xl text-white transition-all duration-500 hover:border-accent/60 sm:right-10"
          >
            →
          </button>
        </>
      )}
    </motion.div>
  );
}
