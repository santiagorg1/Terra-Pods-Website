import Link from "next/link";

type Variant = "lockup" | "stack" | "mark";
type Tone = "light" | "brand" | "cream";

const TONE_CLASS: Record<Tone, string> = {
  light: "text-white",
  brand: "text-terra-soft",
  cream: "text-terra-cream",
};

export default function Logo({
  variant = "lockup",
  tone = "light",
  className = "",
  href = "/",
}: {
  variant?: Variant;
  tone?: Tone;
  className?: string;
  href?: string | null;
}) {
  const wrapper = `inline-flex items-center transition-colors ${TONE_CLASS[tone]} hover:text-terra-cream ${className}`;

  const inner =
    variant === "stack" ? (
      <StackMark />
    ) : variant === "mark" ? (
      <Mark />
    ) : (
      <Lockup />
    );

  if (href === null) {
    return <span className={wrapper} aria-label="Terra Pods">{inner}</span>;
  }

  return (
    <Link href={href} aria-label="Terra Pods home" className={wrapper}>
      {inner}
    </Link>
  );
}

function Lockup() {
  return (
    <svg
      viewBox="0 0 380 60"
      role="img"
      aria-hidden="true"
      className="h-7 w-auto sm:h-8"
      fill="none"
    >
      <rect
        x="3"
        y="9"
        width="58"
        height="42"
        rx="10"
        stroke="currentColor"
        strokeWidth="3.4"
      />
      <path
        d="M15 39 V28 a7 7 0 0 1 14 0 V39"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="square"
        fill="none"
      />
      <path d="M32 39 V31 h12 V39 Z" fill="currentColor" />
      <line
        x1="15"
        y1="39"
        x2="50"
        y2="39"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="square"
      />
      <text
        x="78"
        y="42"
        fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif"
        fontSize="32"
        fontWeight="800"
        letterSpacing="0.05em"
        fill="currentColor"
      >
        TERRA PODS
      </text>
    </svg>
  );
}

function Mark() {
  return (
    <svg
      viewBox="0 0 64 44"
      role="img"
      aria-hidden="true"
      className="h-9 w-auto sm:h-10"
      fill="none"
    >
      <rect
        x="3"
        y="3"
        width="58"
        height="38"
        rx="9"
        stroke="currentColor"
        strokeWidth="3.2"
      />
      <path
        d="M14 32 V22 a6.5 6.5 0 0 1 13 0 V32"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="square"
        fill="none"
      />
      <path d="M30 32 V25 h11 V32 Z" fill="currentColor" />
      <line
        x1="14"
        y1="32"
        x2="50"
        y2="32"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="square"
      />
    </svg>
  );
}

function StackMark() {
  return (
    <svg
      viewBox="0 0 220 200"
      role="img"
      aria-hidden="true"
      className="h-32 w-auto sm:h-40"
      fill="none"
    >
      <g transform="translate(60 18)">
        <rect
          x="3"
          y="3"
          width="98"
          height="68"
          rx="14"
          stroke="currentColor"
          strokeWidth="5"
        />
        <path
          d="M22 56 V40 a10 10 0 0 1 20 0 V56"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="square"
          fill="none"
        />
        <path d="M48 56 V44 h18 V56 Z" fill="currentColor" />
        <line
          x1="22"
          y1="56"
          x2="80"
          y2="56"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="square"
        />
      </g>
      <text
        x="50%"
        y="158"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif"
        fontSize="32"
        fontWeight="800"
        letterSpacing="0.10em"
        fill="currentColor"
      >
        TERRA PODS
      </text>
    </svg>
  );
}
