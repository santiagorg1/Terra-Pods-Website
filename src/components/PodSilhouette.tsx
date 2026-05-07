"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type Props = {
  /** Model slug — resolves to /pods/<slug>.png */
  slug: string;
  /** Series accent color used for backlight, halo, scan line. */
  color?: string;
  className?: string;
  /** Run continuous animations (scan-line, ground pulse). Default true. */
  animated?: boolean;
  /** Show backlight + ground halo. Default true. */
  showGround?: boolean;
  /** Hint to Next.js to prioritize loading. */
  priority?: boolean;
  /** Used as the alt text + sizes hint. */
  label?: string;
  /** Sizes attribute passed to next/image. */
  sizes?: string;
  /**
   * Visual intensity preset.
   *  – "hero": full glow stack, scan line, ground halo, horizon. Use on
   *    feature scenes (Hero, Showcase, FeaturedTrio, per-model hero).
   *  – "card": cheaper render — single drop-shadow, no scan line, no
   *    horizon. Use in grids of many silhouettes (cards, lists).
   */
  intensity?: "hero" | "card";
};

export default function PodSilhouette({
  slug,
  color = "#c9a86a",
  className = "",
  animated = true,
  showGround = true,
  priority = false,
  label = "Terra Pod",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  intensity = "hero",
}: Props) {
  const src = `/pods/${slug}.png`;
  const isCard = intensity === "card";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      className={`relative ${className}`}
    >
      {/* Atmospheric backlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${color}${isCard ? "33" : "40"}, transparent 70%)`,
        }}
      />

      {/* Far halo — only on hero intensity */}
      {!isCard && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-[-10%]"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${color}1f, transparent 72%)`,
            filter: "blur(40px)",
          }}
        />
      )}

      {/* Pod render with drop-shadow halo */}
      <motion.div
        initial={{ scale: 0.96, y: isCard ? 8 : 16 }}
        whileInView={{ scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: isCard ? 1.1 : 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative h-full w-full"
        style={{
          filter: isCard
            ? `contrast(1.03) brightness(1.04) drop-shadow(0 0 12px ${color}88) drop-shadow(0 0 32px ${color}33)`
            : `contrast(1.04) brightness(1.06) drop-shadow(0 0 6px ${color}cc) drop-shadow(0 0 18px ${color}99) drop-shadow(0 0 48px ${color}55) drop-shadow(0 0 96px ${color}22)`,
        }}
      >
        <Image
          src={src}
          alt={`${label} elevation rendering`}
          fill
          sizes={sizes}
          quality={isCard ? 88 : 95}
          className="select-none object-contain"
          priority={priority}
        />
      </motion.div>

      {/* Scan-line — only on hero intensity */}
      {animated && !isCard && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{
            maskImage: `url(${src})`,
            maskSize: "contain",
            maskPosition: "center",
            maskRepeat: "no-repeat",
            WebkitMaskImage: `url(${src})`,
            WebkitMaskSize: "contain",
            WebkitMaskPosition: "center",
            WebkitMaskRepeat: "no-repeat",
          }}
        >
          <div
            className="tron-scan absolute inset-y-0 w-[18%]"
            style={{
              background: `linear-gradient(90deg, transparent, ${color}b3 30%, #ffffff 50%, ${color}b3 70%, transparent)`,
              mixBlendMode: "screen",
              filter: "blur(2px)",
            }}
          />
        </div>
      )}

      {/* Ground reflection halo */}
      {showGround && (
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-x-[6%] bottom-[6%] h-[14%] ${animated && !isCard ? "tron-ground" : ""}`}
          style={{
            background: `radial-gradient(ellipse 80% 100% at 50% 0%, ${color}${isCard ? "55" : "88"}, transparent 70%)`,
            filter: "blur(10px)",
          }}
        />
      )}

      {/* Horizon line — only on hero */}
      {showGround && !isCard && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-[6%] bottom-[10%] h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}aa, transparent)`,
            boxShadow: `0 0 8px ${color}, 0 0 16px ${color}66`,
            opacity: 0.5,
          }}
        />
      )}
    </motion.div>
  );
}
