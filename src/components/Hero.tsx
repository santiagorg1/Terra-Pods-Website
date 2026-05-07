"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { models } from "@/lib/data";
import CatalogPage from "./CatalogPage";

const featured = ["a9", "h5", "ae40-a", "r7", "z7"]
  .map((s) => models.find((m) => m.slug === s)!)
  .filter(Boolean);

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yMain = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacityHead = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const hero = featured[0];

  return (
    <section ref={ref} className="relative overflow-hidden pt-32 sm:pt-40 lg:pt-44">
      <motion.div
        aria-hidden
        style={{ y: yBg }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute inset-x-0 top-0 h-[70vh] bg-radial-glow" />
        <div className="absolute left-1/2 top-1/4 h-[80vh] w-[80vh] -translate-x-1/2 rounded-full bg-accent/[0.05] blur-3xl" />
        <div className="absolute right-[5%] top-[40%] h-[40vh] w-[40vh] rounded-full bg-moss/[0.08] blur-3xl" />
      </motion.div>

      <div className="container-pod relative">
        <motion.div
          style={{ opacity: opacityHead }}
          className="grid items-end gap-10 lg:grid-cols-12 lg:gap-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <span className="eyebrow">2028 Catalog · 26 models</span>
            <h1 className="display-1 mt-6 text-balance">
              <span className="block">Architectural pods,</span>
              <span className="block text-gold">composed precisely.</span>
            </h1>
            <p className="lead mt-7 max-w-xl text-balance">
              Ten series. Twenty-six models. From a 16 m² studio capsule to a
              45 m² flagship residence — each pod arrives complete, on a single
              truck, ready to inhabit.
            </p>

            <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row">
              <Link href="/models" className="btn-primary group">
                Explore the catalog
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
              <Link href="/financing" className="btn-ghost">
                Financing calculator
              </Link>
            </div>

            <div className="mt-12 grid max-w-lg grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              {[
                ["26", "models"],
                ["10", "series"],
                ["10 wk", "from"],
              ].map(([k, v]) => (
                <div key={k} className="bg-ink-950 px-4 py-5 text-center">
                  <div className="font-display text-2xl text-white">{k}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-ink-400">
                    {v}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            style={{ y: yMain }}
            initial={{ opacity: 0, scale: 0.94, y: 60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative lg:col-span-5"
          >
            <div className="relative mx-auto aspect-[3/4] w-full max-w-[460px]">
              {[2, 1].map((depth) => {
                const m = featured[depth] ?? hero;
                return (
                  <motion.div
                    key={m.slug + depth}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{
                      opacity: 0.55 - depth * 0.18,
                      y: 0,
                      rotate: depth === 1 ? -6 : -12,
                      x: depth === 1 ? -28 : -56,
                    }}
                    transition={{ duration: 1.1, delay: 0.25 + depth * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-[#fbfaf6] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
                      <Image
                        src={m.catalogImage}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 30vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 to-transparent" />
                    </div>
                  </motion.div>
                );
              })}

              <CatalogPage
                src={hero.catalogImage}
                alt={`${hero.name} catalog page`}
                priority
                intensity={8}
                className="absolute inset-0"
              />

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute -bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-ink-950/80 px-5 py-2.5 text-[11px] uppercase tracking-[0.24em] text-ink-200 backdrop-blur-xl"
              >
                <span className="text-accent">{hero.name.replace("Terra Pod ", "")}</span>
                <span className="mx-3 text-ink-500">·</span>
                <span>{hero.area}</span>
                <span className="mx-3 text-ink-500">·</span>
                <span>From ${(hero.startingPrice / 1000).toFixed(1)}k</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-24 max-w-6xl rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent p-1 sm:mt-28"
        >
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.85rem] bg-white/5 sm:grid-cols-4">
            {[
              ["A9", "45 m² flagship capsule"],
              ["H5", "Aerodynamic clarity"],
              ["AE40", "Modular cabin system"],
              ["A9D", "Hospitality dining"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="bg-ink-950/70 px-5 py-6 text-center backdrop-blur-md sm:px-8 sm:py-7"
              >
                <div className="font-display text-2xl text-white sm:text-3xl">{k}</div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-ink-300">
                  {v}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
