"use client";

import { motion, type Variants } from "framer-motion";
import type { Silhouette } from "@/lib/data";

type Props = {
  variant: Silhouette;
  color?: string;
  className?: string;
  animated?: boolean;
  showGround?: boolean;
};

const drawVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i: number = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
      opacity: { duration: 0.4, delay: i * 0.1 },
    },
  }),
};

const fillVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.2, delay: 0.6 } },
};

export default function PodSilhouette({
  variant,
  color = "currentColor",
  className = "",
  animated = true,
  showGround = true,
}: Props) {
  const initial = animated ? "hidden" : "show";
  const animate = animated ? undefined : "show";
  const inView = animated ? "show" : undefined;

  return (
    <svg
      viewBox="0 0 720 240"
      className={className}
      role="img"
      aria-label={`${variant} pod silhouette`}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id={`fill-${variant}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id={`glass-${variant}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.45" />
          <stop offset="100%" stopColor={color} stopOpacity="0.1" />
        </linearGradient>
      </defs>

      <motion.g
        initial={initial}
        animate={animate}
        whileInView={inView}
        viewport={{ once: true, amount: 0.4 }}
        stroke={color}
        fill="none"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {variant === "capsule" && <Capsule color={color} variantId={variant} />}
        {variant === "capsule-aero" && <CapsuleAero color={color} variantId={variant} />}
        {variant === "capsule-balcony" && <CapsuleBalcony color={color} variantId={variant} />}
        {variant === "linear" && <Linear color={color} variantId={variant} />}
        {variant === "squared" && <Squared color={color} variantId={variant} />}
        {variant === "cabin" && <Cabin color={color} variantId={variant} />}
        {variant === "specialty" && <Specialty color={color} variantId={variant} />}

        {showGround && (
          <motion.line
            x1={20}
            y1={210}
            x2={700}
            y2={210}
            stroke={color}
            strokeOpacity={0.3}
            strokeDasharray="2 6"
            variants={drawVariants}
            custom={5}
          />
        )}
      </motion.g>
    </svg>
  );
}

// ─── Variant subcomponents ────────────────────────────────────────────────────

function Capsule({ variantId }: { color: string; variantId: string }) {
  // Rounded capsule: A series — smooth radius both ends, ribbon glazing band
  const body = "M 60 200 Q 60 60, 200 60 L 520 60 Q 660 60, 660 200 Z";
  return (
    <>
      {/* fill */}
      <motion.path d={body} fill={`url(#fill-${variantId})`} stroke="none" variants={fillVariants} />
      {/* outline */}
      <motion.path d={body} variants={drawVariants} custom={0} />
      {/* glazing band */}
      <motion.rect
        x={110}
        y={95}
        width={500}
        height={70}
        rx={28}
        fill={`url(#glass-${variantId})`}
        stroke="none"
        variants={fillVariants}
      />
      <motion.rect x={110} y={95} width={500} height={70} rx={28} variants={drawVariants} custom={1} />
      {/* mullions */}
      {[0.18, 0.36, 0.54, 0.72, 0.9].map((p, i) => (
        <motion.line
          key={i}
          x1={110 + 500 * p}
          y1={95}
          x2={110 + 500 * p}
          y2={165}
          variants={drawVariants}
          custom={2 + i * 0.05}
          strokeOpacity={0.45}
        />
      ))}
      {/* support feet */}
      <motion.line x1={140} y1={200} x2={140} y2={210} variants={drawVariants} custom={3} />
      <motion.line x1={580} y1={200} x2={580} y2={210} variants={drawVariants} custom={3} />
    </>
  );
}

function CapsuleAero({ variantId }: { color: string; variantId: string }) {
  // Aerodynamic snout — H series, E-II series. Front (right) is sloped.
  const body =
    "M 60 200 Q 60 60, 200 60 L 540 60 Q 600 60, 640 100 L 660 200 Z";
  return (
    <>
      <motion.path d={body} fill={`url(#fill-${variantId})`} stroke="none" variants={fillVariants} />
      <motion.path d={body} variants={drawVariants} custom={0} />
      {/* glazing band tilts at end */}
      <motion.path
        d="M 110 95 L 540 95 Q 580 95, 605 120 L 615 165 L 110 165 Z"
        fill={`url(#glass-${variantId})`}
        stroke="none"
        variants={fillVariants}
      />
      <motion.path
        d="M 110 95 L 540 95 Q 580 95, 605 120 L 615 165 L 110 165 Z"
        variants={drawVariants}
        custom={1}
      />
      {/* mullions */}
      {[0.18, 0.36, 0.54, 0.72].map((p, i) => (
        <motion.line
          key={i}
          x1={110 + 430 * p}
          y1={95}
          x2={110 + 430 * p}
          y2={165}
          variants={drawVariants}
          custom={2 + i * 0.05}
          strokeOpacity={0.45}
        />
      ))}
      <motion.line x1={140} y1={200} x2={140} y2={210} variants={drawVariants} custom={3} />
      <motion.line x1={560} y1={200} x2={560} y2={210} variants={drawVariants} custom={3} />
    </>
  );
}

function CapsuleBalcony({ variantId }: { color: string; variantId: string }) {
  // R series — capsule with extended deck on the right
  const body = "M 60 200 Q 60 60, 200 60 L 460 60 Q 600 60, 600 200 Z";
  return (
    <>
      <motion.path d={body} fill={`url(#fill-${variantId})`} stroke="none" variants={fillVariants} />
      <motion.path d={body} variants={drawVariants} custom={0} />
      {/* glazing */}
      <motion.rect
        x={110}
        y={95}
        width={440}
        height={70}
        rx={28}
        fill={`url(#glass-${variantId})`}
        stroke="none"
        variants={fillVariants}
      />
      <motion.rect x={110} y={95} width={440} height={70} rx={28} variants={drawVariants} custom={1} />
      {/* deck platform */}
      <motion.rect x={595} y={170} width={100} height={6} variants={drawVariants} custom={2} />
      <motion.rect x={595} y={170} width={100} height={30} fill={`url(#fill-${variantId})`} stroke="none" variants={fillVariants} />
      {/* deck rail */}
      <motion.line x1={603} y1={170} x2={603} y2={120} variants={drawVariants} custom={2.5} strokeOpacity={0.6} />
      <motion.line x1={695} y1={170} x2={695} y2={120} variants={drawVariants} custom={2.5} strokeOpacity={0.6} />
      <motion.line x1={603} y1={120} x2={695} y2={120} variants={drawVariants} custom={2.7} strokeOpacity={0.6} />
      {/* mullions */}
      {[0.18, 0.36, 0.54, 0.72, 0.9].map((p, i) => (
        <motion.line
          key={i}
          x1={110 + 440 * p}
          y1={95}
          x2={110 + 440 * p}
          y2={165}
          variants={drawVariants}
          custom={2 + i * 0.05}
          strokeOpacity={0.45}
        />
      ))}
      {/* feet */}
      <motion.line x1={140} y1={200} x2={140} y2={210} variants={drawVariants} custom={3} />
      <motion.line x1={520} y1={200} x2={520} y2={210} variants={drawVariants} custom={3} />
    </>
  );
}

function Linear({ variantId }: { color: string; variantId: string }) {
  // P / Z / F — long, low, with a hard horizon line
  const body = "M 50 200 Q 50 90, 130 90 L 590 90 Q 670 90, 670 200 Z";
  return (
    <>
      <motion.path d={body} fill={`url(#fill-${variantId})`} stroke="none" variants={fillVariants} />
      <motion.path d={body} variants={drawVariants} custom={0} />
      {/* horizon line — defining feature */}
      <motion.line x1={50} y1={130} x2={670} y2={130} variants={drawVariants} custom={0.5} strokeOpacity={0.5} />
      {/* glazing band */}
      <motion.rect
        x={90}
        y={130}
        width={540}
        height={55}
        fill={`url(#glass-${variantId})`}
        stroke="none"
        variants={fillVariants}
      />
      <motion.rect x={90} y={130} width={540} height={55} variants={drawVariants} custom={1} />
      {/* mullions */}
      {[0.1, 0.25, 0.4, 0.55, 0.7, 0.85].map((p, i) => (
        <motion.line
          key={i}
          x1={90 + 540 * p}
          y1={130}
          x2={90 + 540 * p}
          y2={185}
          variants={drawVariants}
          custom={2 + i * 0.04}
          strokeOpacity={0.4}
        />
      ))}
      <motion.line x1={130} y1={200} x2={130} y2={210} variants={drawVariants} custom={3} />
      <motion.line x1={590} y1={200} x2={590} y2={210} variants={drawVariants} custom={3} />
    </>
  );
}

function Squared({ variantId }: { color: string; variantId: string }) {
  // W series — squared corners with a slight radius
  const body = "M 80 200 L 80 70 Q 80 60, 90 60 L 630 60 Q 640 60, 640 70 L 640 200 Z";
  return (
    <>
      <motion.path d={body} fill={`url(#fill-${variantId})`} stroke="none" variants={fillVariants} />
      <motion.path d={body} variants={drawVariants} custom={0} />
      {/* roof line */}
      <motion.line x1={80} y1={90} x2={640} y2={90} variants={drawVariants} custom={0.5} strokeOpacity={0.5} />
      {/* big rectangular window grid */}
      {[0, 1, 2, 3].map((i) => (
        <motion.rect
          key={i}
          x={120 + i * 130}
          y={110}
          width={100}
          height={70}
          variants={drawVariants}
          custom={1 + i * 0.05}
          strokeOpacity={0.85}
        />
      ))}
      {/* window glass fills */}
      {[0, 1, 2, 3].map((i) => (
        <motion.rect
          key={`f${i}`}
          x={120 + i * 130}
          y={110}
          width={100}
          height={70}
          fill={`url(#glass-${variantId})`}
          stroke="none"
          variants={fillVariants}
        />
      ))}
      <motion.line x1={120} y1={200} x2={120} y2={210} variants={drawVariants} custom={3} />
      <motion.line x1={600} y1={200} x2={600} y2={210} variants={drawVariants} custom={3} />
    </>
  );
}

function Cabin({ variantId }: { color: string; variantId: string }) {
  // AE Cabin Series — flat-roofed, panelised, modular windows
  const body = "M 70 200 L 70 80 L 650 80 L 650 200 Z";
  return (
    <>
      <motion.path d={body} fill={`url(#fill-${variantId})`} stroke="none" variants={fillVariants} />
      <motion.path d={body} variants={drawVariants} custom={0} />
      {/* roof drip */}
      <motion.line x1={60} y1={80} x2={660} y2={80} variants={drawVariants} custom={0.4} />
      {/* solar mount strip */}
      <motion.rect x={120} y={62} width={480} height={12} variants={drawVariants} custom={0.6} strokeOpacity={0.5} />
      {/* panel divider lines (vertical) */}
      {[0.18, 0.36, 0.54, 0.72].map((p, i) => (
        <motion.line
          key={i}
          x1={70 + 580 * p}
          y1={80}
          x2={70 + 580 * p}
          y2={200}
          variants={drawVariants}
          custom={1 + i * 0.05}
          strokeOpacity={0.35}
        />
      ))}
      {/* big window 1 */}
      <motion.rect x={110} y={110} width={150} height={70} variants={drawVariants} custom={1.4} />
      <motion.rect x={110} y={110} width={150} height={70} fill={`url(#glass-${variantId})`} stroke="none" variants={fillVariants} />
      {/* door */}
      <motion.rect x={300} y={110} width={50} height={90} variants={drawVariants} custom={1.6} />
      <motion.rect x={300} y={110} width={50} height={90} fill={`url(#glass-${variantId})`} stroke="none" variants={fillVariants} />
      {/* window 2 wider */}
      <motion.rect x={380} y={110} width={230} height={70} variants={drawVariants} custom={1.8} />
      <motion.rect x={380} y={110} width={230} height={70} fill={`url(#glass-${variantId})`} stroke="none" variants={fillVariants} />
      {/* feet */}
      <motion.line x1={110} y1={200} x2={110} y2={210} variants={drawVariants} custom={3} />
      <motion.line x1={610} y1={200} x2={610} y2={210} variants={drawVariants} custom={3} />
    </>
  );
}

function Specialty({ variantId }: { color: string; variantId: string }) {
  // Same capsule shape as A but rendered with a sliding entrance and accent grid (the oxide-red hospitality variant)
  const body = "M 60 200 Q 60 60, 200 60 L 520 60 Q 660 60, 660 200 Z";
  return (
    <>
      <motion.path d={body} fill={`url(#fill-${variantId})`} stroke="none" variants={fillVariants} />
      <motion.path d={body} variants={drawVariants} custom={0} />
      {/* sliding entrance bay */}
      <motion.rect x={300} y={95} width={120} height={105} variants={drawVariants} custom={1} strokeOpacity={0.85} />
      <motion.rect x={300} y={95} width={120} height={105} fill={`url(#glass-${variantId})`} stroke="none" variants={fillVariants} />
      <motion.line x1={360} y1={95} x2={360} y2={200} variants={drawVariants} custom={1.3} strokeOpacity={0.5} />
      {/* glazing left */}
      <motion.rect x={110} y={95} width={180} height={70} rx={6} variants={drawVariants} custom={1.4} />
      <motion.rect x={110} y={95} width={180} height={70} rx={6} fill={`url(#glass-${variantId})`} stroke="none" variants={fillVariants} />
      {/* glazing right */}
      <motion.rect x={430} y={95} width={180} height={70} rx={6} variants={drawVariants} custom={1.6} />
      <motion.rect x={430} y={95} width={180} height={70} rx={6} fill={`url(#glass-${variantId})`} stroke="none" variants={fillVariants} />
      {/* feet */}
      <motion.line x1={140} y1={200} x2={140} y2={210} variants={drawVariants} custom={3} />
      <motion.line x1={580} y1={200} x2={580} y2={210} variants={drawVariants} custom={3} />
    </>
  );
}
