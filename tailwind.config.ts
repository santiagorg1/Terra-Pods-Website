import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#05070b",
          900: "#080b11",
          800: "#0c1018",
          700: "#121823",
          600: "#1a2230",
          500: "#2a3344",
          400: "#5a6577",
          300: "#8a93a3",
          200: "#bcc3cf",
          100: "#e6e9ef",
          50:  "#f4f6fa",
        },
        brand: {
          DEFAULT: "#0a84ff",
          soft: "#3aa0ff",
          deep: "#0a4ea3",
          midnight: "#04122b",
          steel: "#1a3a6b",
          ice: "#cfe3ff",
        },
        accent: {
          DEFAULT: "#0a84ff",
          soft: "#3aa0ff",
          deep: "#0a4ea3",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        display: [
          "var(--font-display)",
          "var(--font-inter)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      letterSpacing: {
        tightest: "-0.04em",
        cinema: "-0.055em",
      },
      lineHeight: {
        editorial: "1.05",
      },
      transitionTimingFunction: {
        "soft-out": "cubic-bezier(0.22, 1, 0.36, 1)",
        cinema: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: {
        "1500": "1500ms",
        "2000": "2000ms",
      },
      backgroundImage: {
        "brand-glow":
          "radial-gradient(ellipse 60% 50% at 30% 0%, rgba(10,132,255,0.18), transparent 60%), radial-gradient(ellipse 50% 50% at 80% 30%, rgba(58,160,255,0.12), transparent 60%)",
        "brand-fade":
          "linear-gradient(180deg, rgba(4,18,43,0) 0%, rgba(4,18,43,0.85) 65%, rgba(4,18,43,1) 100%)",
        "vignette":
          "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.45) 80%, rgba(0,0,0,0.78) 100%)",
        grain:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.05 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        floatUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        slowPulse: {
          "0%, 100%": { opacity: "0.35", transform: "scale(1)" },
          "50%": { opacity: "0.65", transform: "scale(1.04)" },
        },
        scrollHint: {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.3" },
          "50%": { transform: "translateY(8px)", opacity: "1" },
        },
        lightPan: {
          "0%": { transform: "translateX(-15%) skewX(-12deg)", opacity: "0" },
          "30%": { opacity: "0.35" },
          "100%": { transform: "translateX(115%) skewX(-12deg)", opacity: "0" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        ping2: {
          "0%": { transform: "scale(1)", opacity: "0.7" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
      },
      animation: {
        floatUp: "floatUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
        shimmer: "shimmer 6s linear infinite",
        marquee: "marquee 60s linear infinite",
        slowPulse: "slowPulse 8s ease-in-out infinite",
        scrollHint: "scrollHint 2.4s ease-in-out infinite",
        lightPan: "lightPan 8s cubic-bezier(0.22, 1, 0.36, 1) infinite",
        orbit: "orbit 60s linear infinite",
        ping2: "ping2 3s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
