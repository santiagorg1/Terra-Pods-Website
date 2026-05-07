"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, type CSSProperties } from "react";

type Props = {
  src: string;
  alt: string;
  intensity?: number;
  className?: string;
  priority?: boolean;
  rounded?: string;
  style?: CSSProperties;
};

export default function CatalogPage({
  src,
  alt,
  intensity = 10,
  className = "",
  priority = false,
  rounded = "rounded-3xl",
  style,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 200, damping: 22, mass: 0.6 });

  const rotateY = useTransform(sx, [-0.5, 0.5], [-intensity, intensity]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [intensity, -intensity]);
  const gxPct = useTransform(sx, [-0.5, 0.5], [20, 80]);
  const gyPct = useTransform(sy, [-0.5, 0.5], [20, 80]);
  const glare = useMotionTemplate`radial-gradient(600px circle at ${gxPct}% ${gyPct}%, rgba(255,255,255,0.55), transparent 50%)`;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200, transformStyle: "preserve-3d", ...style }}
      className={`relative ${rounded} ${className}`}
    >
      <div
        className={`relative overflow-hidden ${rounded} border border-white/10 bg-[#fbfaf6] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.7)]`}
        style={{ transform: "translateZ(0)" }}
      >
        <Image
          src={src}
          alt={alt}
          width={1600}
          height={1200}
          priority={priority}
          className="block h-auto w-full select-none"
          sizes="(min-width: 1024px) 60vw, 100vw"
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-overlay"
          style={{ background: glare }}
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px -z-10 rounded-[inherit] bg-gradient-to-br from-accent/30 via-transparent to-moss/20 opacity-60 blur-2xl"
      />
    </motion.div>
  );
}
