"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * A thin gold-to-azure progress rail at the very top of the viewport
 * that fills as the page is scrolled. Driven by the document scroll
 * progress so it cooperates with Lenis without extra wiring.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 30,
    mass: 0.4,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-px origin-left bg-gradient-to-r from-accent via-azure/70 to-transparent"
    />
  );
}
