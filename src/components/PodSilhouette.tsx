"use client";

import { motion, type Variants } from "framer-motion";
import { useId } from "react";
import type { Silhouette } from "@/lib/data";

type Props = {
  variant: Silhouette;
  color?: string;
  className?: string;
  animated?: boolean;
  showGround?: boolean;
};

// ─── Geometry per silhouette ────────────────────────────────────────────────

type Glass =
  | { kind: "rect"; x: number; y: number; w: number; h: number; rx?: number }
  | { kind: "path"; d: string; box: { x: number; y: number; w: number; h: number } };

type DeckExtra = {
  kind: "deck";
  rect: { x: number; y: number; w: number; h: number };
  rail: { left: number; right: number; top: number; bottom: number };
};

type WindowsExtra = {
  kind: "windows";
  rects: { x: number; y: number; w: number; h: number }[];
};

type CabinExtras = {
  kind: "cabin";
  solar: { x: number; y: number; w: number; h: number };
  panelDividers: number[]; // x positions
  windows: { x: number; y: number; w: number; h: number }[];
  door: { x: number; y: number; w: number; h: number };
};

type SpecialtyExtra = {
  kind: "specialty";
  bay: { x: number; y: number; w: number; h: number };
  side: { x: number; y: number; w: number; h: number; rx: number }[];
};

type LinearHorizon = { kind: "linear-horizon"; y: number; x1: number; x2: number };

type Extras = DeckExtra | WindowsExtra | CabinExtras | SpecialtyExtra | LinearHorizon;

type Geom = {
  body: string;
  glass?: Glass;
  mullions?: { x1: number; y1: number; x2: number; y2: number }[];
  feet: { x1: number; y1: number; x2: number; y2: number }[];
  nodes: { x: number; y: number }[];
  groundY: number;
  podWidth: { left: number; right: number };
  extras?: Extras;
};

function getGeom(variant: Silhouette): Geom {
  switch (variant) {
    case "capsule":
      return {
        body: "M 60 200 Q 60 60, 200 60 L 520 60 Q 660 60, 660 200 Z",
        glass: { kind: "rect", x: 110, y: 95, w: 500, h: 70, rx: 28 },
        mullions: [0.18, 0.36, 0.54, 0.72, 0.9].map((p) => ({
          x1: 110 + 500 * p,
          y1: 95,
          x2: 110 + 500 * p,
          y2: 165,
        })),
        feet: [
          { x1: 140, y1: 200, x2: 140, y2: 210 },
          { x1: 580, y1: 200, x2: 580, y2: 210 },
        ],
        nodes: [
          { x: 60, y: 200 },
          { x: 200, y: 60 },
          { x: 520, y: 60 },
          { x: 660, y: 200 },
        ],
        groundY: 210,
        podWidth: { left: 60, right: 660 },
      };
    case "capsule-aero":
      return {
        body:
          "M 60 200 Q 60 60, 200 60 L 540 60 Q 600 60, 640 100 L 660 200 Z",
        glass: {
          kind: "path",
          d: "M 110 95 L 540 95 Q 580 95, 605 120 L 615 165 L 110 165 Z",
          box: { x: 110, y: 95, w: 505, h: 70 },
        },
        mullions: [0.18, 0.36, 0.54, 0.72].map((p) => ({
          x1: 110 + 430 * p,
          y1: 95,
          x2: 110 + 430 * p,
          y2: 165,
        })),
        feet: [
          { x1: 140, y1: 200, x2: 140, y2: 210 },
          { x1: 560, y1: 200, x2: 560, y2: 210 },
        ],
        nodes: [
          { x: 60, y: 200 },
          { x: 200, y: 60 },
          { x: 540, y: 60 },
          { x: 640, y: 100 },
          { x: 660, y: 200 },
        ],
        groundY: 210,
        podWidth: { left: 60, right: 660 },
      };
    case "capsule-balcony":
      return {
        body: "M 60 200 Q 60 60, 200 60 L 460 60 Q 600 60, 600 200 Z",
        glass: { kind: "rect", x: 110, y: 95, w: 440, h: 70, rx: 28 },
        mullions: [0.18, 0.36, 0.54, 0.72, 0.9].map((p) => ({
          x1: 110 + 440 * p,
          y1: 95,
          x2: 110 + 440 * p,
          y2: 165,
        })),
        feet: [
          { x1: 140, y1: 200, x2: 140, y2: 210 },
          { x1: 520, y1: 200, x2: 520, y2: 210 },
        ],
        nodes: [
          { x: 60, y: 200 },
          { x: 200, y: 60 },
          { x: 460, y: 60 },
          { x: 600, y: 200 },
          { x: 695, y: 170 },
        ],
        groundY: 210,
        podWidth: { left: 60, right: 695 },
        extras: {
          kind: "deck",
          rect: { x: 595, y: 170, w: 100, h: 30 },
          rail: { left: 603, right: 695, top: 120, bottom: 170 },
        },
      };
    case "linear":
      return {
        body: "M 50 200 Q 50 90, 130 90 L 590 90 Q 670 90, 670 200 Z",
        glass: { kind: "rect", x: 90, y: 130, w: 540, h: 55 },
        mullions: [0.1, 0.25, 0.4, 0.55, 0.7, 0.85].map((p) => ({
          x1: 90 + 540 * p,
          y1: 130,
          x2: 90 + 540 * p,
          y2: 185,
        })),
        feet: [
          { x1: 130, y1: 200, x2: 130, y2: 210 },
          { x1: 590, y1: 200, x2: 590, y2: 210 },
        ],
        nodes: [
          { x: 50, y: 200 },
          { x: 130, y: 90 },
          { x: 590, y: 90 },
          { x: 670, y: 200 },
        ],
        groundY: 210,
        podWidth: { left: 50, right: 670 },
        extras: { kind: "linear-horizon", y: 130, x1: 50, x2: 670 },
      };
    case "squared":
      return {
        body:
          "M 80 200 L 80 70 Q 80 60, 90 60 L 630 60 Q 640 60, 640 70 L 640 200 Z",
        feet: [
          { x1: 120, y1: 200, x2: 120, y2: 210 },
          { x1: 600, y1: 200, x2: 600, y2: 210 },
        ],
        nodes: [
          { x: 80, y: 200 },
          { x: 90, y: 60 },
          { x: 630, y: 60 },
          { x: 640, y: 200 },
        ],
        groundY: 210,
        podWidth: { left: 80, right: 640 },
        extras: {
          kind: "windows",
          rects: [0, 1, 2, 3].map((i) => ({
            x: 120 + i * 130,
            y: 110,
            w: 100,
            h: 70,
          })),
        },
      };
    case "cabin":
      return {
        body: "M 70 200 L 70 80 L 650 80 L 650 200 Z",
        feet: [
          { x1: 110, y1: 200, x2: 110, y2: 210 },
          { x1: 610, y1: 200, x2: 610, y2: 210 },
        ],
        nodes: [
          { x: 70, y: 200 },
          { x: 70, y: 80 },
          { x: 650, y: 80 },
          { x: 650, y: 200 },
        ],
        groundY: 210,
        podWidth: { left: 70, right: 650 },
        extras: {
          kind: "cabin",
          solar: { x: 120, y: 62, w: 480, h: 12 },
          panelDividers: [0.18, 0.36, 0.54, 0.72].map((p) => 70 + 580 * p),
          windows: [
            { x: 110, y: 110, w: 150, h: 70 },
            { x: 380, y: 110, w: 230, h: 70 },
          ],
          door: { x: 300, y: 110, w: 50, h: 90 },
        },
      };
    case "specialty":
      return {
        body: "M 60 200 Q 60 60, 200 60 L 520 60 Q 660 60, 660 200 Z",
        feet: [
          { x1: 140, y1: 200, x2: 140, y2: 210 },
          { x1: 580, y1: 200, x2: 580, y2: 210 },
        ],
        nodes: [
          { x: 60, y: 200 },
          { x: 200, y: 60 },
          { x: 520, y: 60 },
          { x: 660, y: 200 },
        ],
        groundY: 210,
        podWidth: { left: 60, right: 660 },
        extras: {
          kind: "specialty",
          bay: { x: 300, y: 95, w: 120, h: 105 },
          side: [
            { x: 110, y: 95, w: 180, h: 70, rx: 6 },
            { x: 430, y: 95, w: 180, h: 70, rx: 6 },
          ],
        },
      };
  }
}

// ─── Animation variants ─────────────────────────────────────────────────────

const drawVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i: number = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        duration: 1.4,
        ease: [0.22, 1, 0.36, 1],
        delay: i * 0.08,
      },
      opacity: { duration: 0.4, delay: i * 0.08 },
    },
  }),
};

const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.4, delay: 0.6 } },
};

const lateVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.6, delay: 1.2 } },
};

// ─── Component ──────────────────────────────────────────────────────────────

export default function PodSilhouette({
  variant,
  color = "#c9a86a",
  className = "",
  animated = true,
  showGround = true,
}: Props) {
  const rawId = useId().replace(/:/g, "");
  const uid = `pod-${rawId}-${variant}`;

  const initial = animated ? "hidden" : "show";
  const whileInView = animated ? "show" : undefined;
  const animate = animated ? undefined : "show";

  const geom = getGeom(variant);
  const glassBox =
    geom.glass?.kind === "rect"
      ? { x: geom.glass.x, y: geom.glass.y, w: geom.glass.w, h: geom.glass.h }
      : geom.glass?.kind === "path"
        ? geom.glass.box
        : null;

  return (
    <svg
      viewBox="0 0 720 240"
      className={className}
      role="img"
      aria-label={`${variant} pod silhouette`}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Soft outer glow filter */}
        <filter
          id={`glow-${uid}`}
          x="-25%"
          y="-25%"
          width="150%"
          height="150%"
          filterUnits="objectBoundingBox"
        >
          <feGaussianBlur stdDeviation="2.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Stronger glow for nodes / running light */}
        <filter
          id={`glow-strong-${uid}`}
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur stdDeviation="4.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Body fill: subtle inner gradient */}
        <linearGradient id={`bodyFill-${uid}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.10" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>

        {/* Glass fill: slightly luminous gradient */}
        <linearGradient id={`glassFill-${uid}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="50%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0.05" />
        </linearGradient>

        {/* Scan line gradient */}
        <linearGradient id={`scan-${uid}`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor={color} stopOpacity="0" />
          <stop offset="40%" stopColor={color} stopOpacity="0.6" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="60%" stopColor={color} stopOpacity="0.6" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>

        {/* Ground halo */}
        <radialGradient id={`ground-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.45" />
          <stop offset="60%" stopColor={color} stopOpacity="0.06" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>

        {glassBox && (
          <clipPath id={`glassClip-${uid}`}>
            {geom.glass?.kind === "rect" ? (
              <rect
                x={geom.glass.x}
                y={geom.glass.y}
                width={geom.glass.w}
                height={geom.glass.h}
                rx={geom.glass.rx ?? 0}
              />
            ) : geom.glass?.kind === "path" ? (
              <path d={geom.glass.d} />
            ) : null}
          </clipPath>
        )}
      </defs>

      <motion.g
        initial={initial}
        whileInView={whileInView}
        animate={animate}
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Ground glow */}
        {showGround && (
          <motion.ellipse
            cx={(geom.podWidth.left + geom.podWidth.right) / 2}
            cy={geom.groundY + 4}
            rx={(geom.podWidth.right - geom.podWidth.left) / 2 + 30}
            ry={10}
            fill={`url(#ground-${uid})`}
            className={animated ? "tron-ground" : undefined}
            variants={fadeVariants}
          />
        )}

        {/* Ground glow line */}
        {showGround && (
          <motion.line
            x1={geom.podWidth.left - 30}
            y1={geom.groundY}
            x2={geom.podWidth.right + 30}
            y2={geom.groundY}
            stroke={color}
            strokeOpacity={0.35}
            strokeWidth={1}
            filter={`url(#glow-${uid})`}
            variants={drawVariants}
            custom={5}
          />
        )}

        {/* Ground tick marks (perspective hint) */}
        {showGround &&
          [-3, -2, -1, 1, 2, 3].map((i) => (
            <motion.line
              key={`tick-${i}`}
              x1={(geom.podWidth.left + geom.podWidth.right) / 2 + i * 80}
              y1={geom.groundY}
              x2={(geom.podWidth.left + geom.podWidth.right) / 2 + i * 75}
              y2={geom.groundY + 20}
              stroke={color}
              strokeOpacity={0.18}
              strokeWidth={0.6}
              variants={drawVariants}
              custom={5.2 + Math.abs(i) * 0.05}
            />
          ))}

        {/* ── Body ── */}
        {/* Body fill */}
        <motion.path
          d={geom.body}
          fill={`url(#bodyFill-${uid})`}
          stroke="none"
          variants={fadeVariants}
        />
        {/* Body halo (wide, blurred) */}
        <motion.path
          d={geom.body}
          stroke={color}
          strokeOpacity={0.55}
          strokeWidth={5}
          fill="none"
          filter={`url(#glow-strong-${uid})`}
          variants={drawVariants}
          custom={0}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Body core (thin, bright) */}
        <motion.path
          d={geom.body}
          stroke={color}
          strokeWidth={1.4}
          fill="none"
          filter={`url(#glow-${uid})`}
          variants={drawVariants}
          custom={0.05}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Body inner highlight (white tint) */}
        <motion.path
          d={geom.body}
          stroke="#ffffff"
          strokeOpacity={0.6}
          strokeWidth={0.5}
          fill="none"
          variants={drawVariants}
          custom={0.1}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* ── Glazing ── */}
        {geom.glass?.kind === "rect" && (
          <>
            <motion.rect
              x={geom.glass.x}
              y={geom.glass.y}
              width={geom.glass.w}
              height={geom.glass.h}
              rx={geom.glass.rx ?? 0}
              fill={`url(#glassFill-${uid})`}
              stroke="none"
              variants={fadeVariants}
            />
            <motion.rect
              x={geom.glass.x}
              y={geom.glass.y}
              width={geom.glass.w}
              height={geom.glass.h}
              rx={geom.glass.rx ?? 0}
              stroke={color}
              strokeOpacity={0.85}
              strokeWidth={1}
              fill="none"
              filter={`url(#glow-${uid})`}
              variants={drawVariants}
              custom={1}
            />
          </>
        )}
        {geom.glass?.kind === "path" && (
          <>
            <motion.path
              d={geom.glass.d}
              fill={`url(#glassFill-${uid})`}
              stroke="none"
              variants={fadeVariants}
            />
            <motion.path
              d={geom.glass.d}
              stroke={color}
              strokeOpacity={0.85}
              strokeWidth={1}
              fill="none"
              filter={`url(#glow-${uid})`}
              variants={drawVariants}
              custom={1}
            />
          </>
        )}

        {/* Scan line over glass */}
        {glassBox && animated && (
          <g clipPath={`url(#glassClip-${uid})`}>
            <motion.rect
              x={glassBox.x}
              y={glassBox.y}
              width={Math.max(80, glassBox.w * 0.18)}
              height={glassBox.h}
              fill={`url(#scan-${uid})`}
              variants={lateVariants}
              className="tron-scan"
            />
          </g>
        )}

        {/* Mullions */}
        {geom.mullions?.map((m, i) => (
          <motion.line
            key={`mul-${i}`}
            x1={m.x1}
            y1={m.y1}
            x2={m.x2}
            y2={m.y2}
            stroke={color}
            strokeOpacity={0.55}
            strokeWidth={0.9}
            filter={`url(#glow-${uid})`}
            variants={drawVariants}
            custom={1.3 + i * 0.05}
            strokeLinecap="round"
          />
        ))}

        {/* ── Variant extras ── */}
        {geom.extras?.kind === "deck" && (
          <>
            <motion.rect
              x={geom.extras.rect.x}
              y={geom.extras.rect.y}
              width={geom.extras.rect.w}
              height={geom.extras.rect.h}
              fill={`url(#bodyFill-${uid})`}
              stroke="none"
              variants={fadeVariants}
            />
            <motion.rect
              x={geom.extras.rect.x}
              y={geom.extras.rect.y}
              width={geom.extras.rect.w}
              height={geom.extras.rect.h}
              stroke={color}
              strokeOpacity={0.7}
              strokeWidth={1}
              fill="none"
              filter={`url(#glow-${uid})`}
              variants={drawVariants}
              custom={2}
            />
            <motion.line
              x1={geom.extras.rail.left}
              y1={geom.extras.rail.bottom}
              x2={geom.extras.rail.left}
              y2={geom.extras.rail.top}
              stroke={color}
              strokeOpacity={0.6}
              strokeWidth={1}
              filter={`url(#glow-${uid})`}
              variants={drawVariants}
              custom={2.2}
            />
            <motion.line
              x1={geom.extras.rail.right}
              y1={geom.extras.rail.bottom}
              x2={geom.extras.rail.right}
              y2={geom.extras.rail.top}
              stroke={color}
              strokeOpacity={0.6}
              strokeWidth={1}
              filter={`url(#glow-${uid})`}
              variants={drawVariants}
              custom={2.2}
            />
            <motion.line
              x1={geom.extras.rail.left}
              y1={geom.extras.rail.top}
              x2={geom.extras.rail.right}
              y2={geom.extras.rail.top}
              stroke={color}
              strokeOpacity={0.6}
              strokeWidth={1}
              filter={`url(#glow-${uid})`}
              variants={drawVariants}
              custom={2.4}
            />
          </>
        )}

        {geom.extras?.kind === "linear-horizon" && (
          <motion.line
            x1={geom.extras.x1 + 40}
            y1={geom.extras.y}
            x2={geom.extras.x2 - 40}
            y2={geom.extras.y}
            stroke={color}
            strokeOpacity={0.55}
            strokeWidth={1}
            filter={`url(#glow-${uid})`}
            variants={drawVariants}
            custom={0.6}
          />
        )}

        {geom.extras?.kind === "windows" &&
          geom.extras.rects.map((r, i) => (
            <g key={`win-${i}`}>
              <motion.rect
                x={r.x}
                y={r.y}
                width={r.w}
                height={r.h}
                fill={`url(#glassFill-${uid})`}
                stroke="none"
                variants={fadeVariants}
              />
              <motion.rect
                x={r.x}
                y={r.y}
                width={r.w}
                height={r.h}
                stroke={color}
                strokeOpacity={0.85}
                strokeWidth={1}
                fill="none"
                filter={`url(#glow-${uid})`}
                variants={drawVariants}
                custom={1 + i * 0.1}
              />
            </g>
          ))}

        {geom.extras?.kind === "cabin" && (
          <>
            {/* Solar mount strip */}
            <motion.rect
              x={geom.extras.solar.x}
              y={geom.extras.solar.y}
              width={geom.extras.solar.w}
              height={geom.extras.solar.h}
              stroke={color}
              strokeOpacity={0.5}
              strokeWidth={0.8}
              fill="none"
              filter={`url(#glow-${uid})`}
              variants={drawVariants}
              custom={0.6}
            />
            {/* Panel divider verticals */}
            {geom.extras.panelDividers.map((x, i) => (
              <motion.line
                key={`div-${i}`}
                x1={x}
                y1={80}
                x2={x}
                y2={200}
                stroke={color}
                strokeOpacity={0.32}
                strokeWidth={0.6}
                variants={drawVariants}
                custom={1 + i * 0.05}
              />
            ))}
            {/* Door */}
            <motion.rect
              x={geom.extras.door.x}
              y={geom.extras.door.y}
              width={geom.extras.door.w}
              height={geom.extras.door.h}
              fill={`url(#glassFill-${uid})`}
              stroke="none"
              variants={fadeVariants}
            />
            <motion.rect
              x={geom.extras.door.x}
              y={geom.extras.door.y}
              width={geom.extras.door.w}
              height={geom.extras.door.h}
              stroke={color}
              strokeOpacity={0.85}
              strokeWidth={1}
              fill="none"
              filter={`url(#glow-${uid})`}
              variants={drawVariants}
              custom={1.6}
            />
            {/* Windows */}
            {geom.extras.windows.map((w, i) => (
              <g key={`cw-${i}`}>
                <motion.rect
                  x={w.x}
                  y={w.y}
                  width={w.w}
                  height={w.h}
                  fill={`url(#glassFill-${uid})`}
                  stroke="none"
                  variants={fadeVariants}
                />
                <motion.rect
                  x={w.x}
                  y={w.y}
                  width={w.w}
                  height={w.h}
                  stroke={color}
                  strokeOpacity={0.85}
                  strokeWidth={1}
                  fill="none"
                  filter={`url(#glow-${uid})`}
                  variants={drawVariants}
                  custom={1.4 + i * 0.1}
                />
              </g>
            ))}
          </>
        )}

        {geom.extras?.kind === "specialty" && (
          <>
            {geom.extras.side.map((s, i) => (
              <g key={`sp-${i}`}>
                <motion.rect
                  x={s.x}
                  y={s.y}
                  width={s.w}
                  height={s.h}
                  rx={s.rx}
                  fill={`url(#glassFill-${uid})`}
                  stroke="none"
                  variants={fadeVariants}
                />
                <motion.rect
                  x={s.x}
                  y={s.y}
                  width={s.w}
                  height={s.h}
                  rx={s.rx}
                  stroke={color}
                  strokeOpacity={0.85}
                  strokeWidth={1}
                  fill="none"
                  filter={`url(#glow-${uid})`}
                  variants={drawVariants}
                  custom={1.4 + i * 0.1}
                />
              </g>
            ))}
            {/* Sliding entrance bay */}
            <motion.rect
              x={geom.extras.bay.x}
              y={geom.extras.bay.y}
              width={geom.extras.bay.w}
              height={geom.extras.bay.h}
              fill={`url(#glassFill-${uid})`}
              stroke="none"
              variants={fadeVariants}
            />
            <motion.rect
              x={geom.extras.bay.x}
              y={geom.extras.bay.y}
              width={geom.extras.bay.w}
              height={geom.extras.bay.h}
              stroke={color}
              strokeOpacity={0.9}
              strokeWidth={1.1}
              fill="none"
              filter={`url(#glow-${uid})`}
              variants={drawVariants}
              custom={1.2}
            />
            <motion.line
              x1={geom.extras.bay.x + geom.extras.bay.w / 2}
              y1={geom.extras.bay.y}
              x2={geom.extras.bay.x + geom.extras.bay.w / 2}
              y2={geom.extras.bay.y + geom.extras.bay.h}
              stroke={color}
              strokeOpacity={0.55}
              strokeWidth={0.7}
              variants={drawVariants}
              custom={1.5}
            />
          </>
        )}

        {/* ── Feet ── */}
        {geom.feet.map((f, i) => (
          <motion.line
            key={`foot-${i}`}
            x1={f.x1}
            y1={f.y1}
            x2={f.x2}
            y2={f.y2}
            stroke={color}
            strokeOpacity={0.7}
            strokeWidth={1}
            filter={`url(#glow-${uid})`}
            variants={drawVariants}
            custom={3}
          />
        ))}

        {/* ── Pulsing corner nodes ── */}
        {geom.nodes.map((n, i) => (
          <motion.g key={`node-${i}`} variants={lateVariants}>
            <circle
              cx={n.x}
              cy={n.y}
              r={2.4}
              fill={color}
              filter={`url(#glow-strong-${uid})`}
              className={animated ? "tron-pulse" : undefined}
              style={{ animationDelay: `${i * 0.4}s` }}
            />
            <circle
              cx={n.x}
              cy={n.y}
              r={1}
              fill="#ffffff"
              opacity={0.95}
            />
          </motion.g>
        ))}

        {/* ── Running light around outline ── */}
        {animated && (
          <motion.path
            d={geom.body}
            stroke="#ffffff"
            strokeOpacity={0.95}
            strokeWidth={1.6}
            fill="none"
            strokeLinecap="round"
            strokeDasharray="46 2400"
            filter={`url(#glow-strong-${uid})`}
            variants={lateVariants}
            className="tron-run"
          />
        )}
      </motion.g>
    </svg>
  );
}
