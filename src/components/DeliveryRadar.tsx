"use client";

import { useState } from "react";
import { coverageCities, coverageZones } from "@/lib/extras";

const SIZE = 720;
const CENTER = SIZE / 2;
const MAX_R = 320;
const RINGS = [0.35, 0.7, 1.0];

function polar(angleDeg: number, distance: number) {
  const r = distance * MAX_R;
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: CENTER + r * Math.cos(rad), y: CENTER + r * Math.sin(rad) };
}

export default function DeliveryRadar() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
      <div className="lg:col-span-7">
        <div className="relative mx-auto aspect-square w-full max-w-[640px]">
          <svg
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="h-full w-full"
            role="img"
            aria-label="Terra Pods delivery coverage radar"
          >
            <defs>
              <radialGradient id="bg" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(212,74,38,0.18)" />
                <stop offset="60%" stopColor="rgba(212,74,38,0.04)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0)" />
              </radialGradient>
              <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#e96a3f" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#d44a26" stopOpacity="0" />
              </radialGradient>
            </defs>

            <circle cx={CENTER} cy={CENTER} r={MAX_R + 20} fill="url(#bg)" />

            {/* concentric zone rings */}
            {RINGS.map((r, i) => (
              <circle
                key={i}
                cx={CENTER}
                cy={CENTER}
                r={r * MAX_R}
                fill="none"
                stroke="rgba(212,74,38,0.28)"
                strokeWidth="1"
                strokeDasharray="2 6"
              />
            ))}

            {/* compass spokes */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
              const { x, y } = polar(a, 1);
              return (
                <line
                  key={a}
                  x1={CENTER}
                  y1={CENTER}
                  x2={x}
                  y2={y}
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="1"
                />
              );
            })}

            {/* zone labels on rings */}
            {[
              { r: 0.35, label: "5d" },
              { r: 0.7, label: "10d" },
              { r: 1.0, label: "14d" },
            ].map((z) => (
              <text
                key={z.label}
                x={CENTER + z.r * MAX_R + 6}
                y={CENTER + 4}
                fontSize="11"
                fill="rgba(212,74,38,0.7)"
                fontFamily="ui-sans-serif, system-ui, sans-serif"
                letterSpacing="2"
              >
                {z.label}
              </text>
            ))}

            {/* city pins */}
            {coverageCities.map((c) => {
              const { x, y } = polar(c.angle, c.distance);
              const isHover = hovered === c.name;
              const opacity = c.days <= 5 ? 1 : c.days <= 10 ? 0.85 : 0.65;
              return (
                <g
                  key={c.name}
                  onMouseEnter={() => setHovered(c.name)}
                  onMouseLeave={() => setHovered(null)}
                  className="cursor-pointer"
                >
                  {isHover && (
                    <circle
                      cx={x}
                      cy={y}
                      r="14"
                      fill="rgba(212,74,38,0.2)"
                      stroke="rgba(212,74,38,0.6)"
                    />
                  )}
                  <circle
                    cx={x}
                    cy={y}
                    r="3.5"
                    fill={c.region === "mx" ? "#e96a3f" : "#f1e4d2"}
                    opacity={opacity}
                  />
                  <text
                    x={x + 8}
                    y={y + 4}
                    fontSize={isHover ? "12" : "10"}
                    fill={isHover ? "#fff" : "rgba(232,236,239,0.78)"}
                    fontFamily="ui-sans-serif, system-ui, sans-serif"
                  >
                    {c.name}
                    <tspan fill="rgba(212,74,38,0.85)" dx="6">
                      · {c.days}d
                    </tspan>
                  </text>
                </g>
              );
            })}

            {/* center: Del Rio bonded yard */}
            <circle cx={CENTER} cy={CENTER} r="42" fill="url(#centerGlow)" />
            <circle
              cx={CENTER}
              cy={CENTER}
              r="9"
              fill="#d44a26"
              stroke="#fff"
              strokeWidth="2"
            />
            <circle
              cx={CENTER}
              cy={CENTER}
              r="22"
              fill="none"
              stroke="rgba(212,74,38,0.6)"
            >
              <animate
                attributeName="r"
                from="9"
                to="42"
                dur="2.6s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                from="0.7"
                to="0"
                dur="2.6s"
                repeatCount="indefinite"
              />
            </circle>
            <text
              x={CENTER}
              y={CENTER + 64}
              textAnchor="middle"
              fontSize="11"
              letterSpacing="3"
              fill="#f1e4d2"
              fontFamily="ui-sans-serif, system-ui, sans-serif"
              fontWeight="600"
            >
              DEL RIO · BONDED YARD
            </text>
          </svg>
        </div>
      </div>

      <div className="lg:col-span-5">
        <span className="eyebrow">Delivery coverage</span>
        <h2 className="display-3 mt-5">
          Anywhere on the map. <span className="text-terra">Direct from Del Rio.</span>
        </h2>
        <p className="lead mt-6">
          Every pod ships from our bonded yard in Del Rio, TX — the US-Mexico
          gateway. Lead times below are last-mile delivery from the moment your
          unit clears customs.
        </p>

        <div className="mt-10 space-y-4">
          {coverageZones.map((z, i) => (
            <div
              key={z.label}
              className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4"
            >
              <span
                className="mt-1 h-3.5 w-3.5 flex-none rounded-full"
                style={{ background: z.color }}
              />
              <div>
                <div className="font-display text-lg text-white">{z.range}</div>
                <div className="text-xs text-ink-300">{z.label}</div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-xs text-ink-400">
          Hover or tap a pin on the map to see exact lead time. Quotes for cities
          not shown — including AK, HI, and remote sites — are 24-hour turnaround.
        </p>
      </div>
    </div>
  );
}
