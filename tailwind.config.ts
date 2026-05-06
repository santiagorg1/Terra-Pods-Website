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
          DEFAULT: "#d44a26",
          soft: "#e96a3f",
          deep: "#a8341a",
        },
        terra: {
          DEFAULT: "#d44a26",
          soft: "#e96a3f",
          deep: "#8a2e15",
          dark: "#3a1a10",
          cream: "#f1e4d2",
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
      },
      backgroundImage: {
        "radial-glow":
          "radial-gradient(ellipse at top, rgba(201,168,106,0.18), transparent 60%)",
        "radial-fade":
          "radial-gradient(ellipse at center, rgba(255,255,255,0.06), transparent 70%)",
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
      },
      animation: {
        floatUp: "floatUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
        shimmer: "shimmer 6s linear infinite",
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
