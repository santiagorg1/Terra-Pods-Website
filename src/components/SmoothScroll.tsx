"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Mounts a Lenis smooth-scroll instance on the document. RAF-driven
 * inertia gives the page a luxury, glide-on-rails feel rather than
 * the OS default. Disabled if the user prefers reduced motion.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.05,
      lerp: 0.075,
      syncTouch: false,
    });

    let frame = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
