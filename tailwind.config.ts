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
          950: "#050607",
          900: "#0a0c0e",
          800: "#101316",
          700: "#181c20",
          600: "#22272c",
          500: "#3a4046",
          400: "#6a7178",
          300: "#9aa1a8",
          200: "#c8ced3",
          100: "#e8ecef",
        },
        accent: {
          DEFAULT: "#c9a86a",
          soft: "#d9bf8e",
          deep: "#8a6f3d",
        },
        brass: {
          DEFAULT: "#b08c4f",
          soft: "#d6b785",
          deep: "#604319",
        },
        champagne: {
          DEFAULT: "#e7d3a8",
          soft: "#f3e6c5",
        },
        moss: {
          DEFAULT: "#5a6b4a",
          deep: "#384228",
        },
        ember: {
          DEFAULT: "#a85a3c",
          deep: "#5a2614",
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
          "ui-serif",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "serif",
        ],
      },
      letterSpacing: {
        tightest: "-0.04em",
        cinema: "-0.06em",
      },
      lineHeight: {
        editorial: "1.18",
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
        "radial-glow":
          "radial-gradient(ellipse at top, rgba(201,168,106,0.22), transparent 60%)",
        "radial-fade":
          "radial-gradient(ellipse at center, rgba(255,255,255,0.06), transparent 70%)",
        "warm-night":
          "linear-gradient(180deg, rgba(201,168,106,0.10) 0%, rgba(168,90,60,0.04) 30%, rgba(5,6,7,1) 100%)",
        "ember-glow":
          "radial-gradient(ellipse at 50% 0%, rgba(217,191,142,0.18), transparent 55%), radial-gradient(ellipse at 50% 100%, rgba(168,90,60,0.10), transparent 60%)",
        "vignette":
          "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.35) 80%, rgba(0,0,0,0.7) 100%)",
        grain:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.06 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
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
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.04)" },
        },
        scrollHint: {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.3" },
          "50%": { transform: "translateY(8px)", opacity: "1" },
        },
        lightPan: {
          "0%": { transform: "translateX(-15%) skewX(-12deg)", opacity: "0" },
          "30%": { opacity: "0.4" },
          "100%": { transform: "translateX(115%) skewX(-12deg)", opacity: "0" },
        },
      },
      animation: {
        floatUp: "floatUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
        shimmer: "shimmer 6s linear infinite",
        marquee: "marquee 60s linear infinite",
        slowPulse: "slowPulse 8s ease-in-out infinite",
        scrollHint: "scrollHint 2.4s ease-in-out infinite",
        lightPan: "lightPan 8s cubic-bezier(0.22, 1, 0.36, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
