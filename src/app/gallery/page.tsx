import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { galleryImages } from "@/lib/data";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Explore Terra Pods in real settings — coastal cliffs, alpine clearings, urban gardens. A study in architecture, light, and landscape.",
};

const layout = [
  "md:col-span-2 md:row-span-2 aspect-[4/5]",
  "aspect-square",
  "aspect-[4/5]",
  "md:col-span-2 aspect-[16/9]",
  "aspect-[4/5]",
  "aspect-square",
  "md:col-span-2 md:row-span-2 aspect-[4/5]",
  "aspect-square",
  "aspect-[4/5]",
  "md:col-span-2 aspect-[16/9]",
  "aspect-square",
  "aspect-[4/5]",
];

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title={
          <>
            Sited in the world. <span className="text-gold">Quietly.</span>
          </>
        }
        subtitle="Coastal cliffs, alpine clearings, urban gardens. A growing record of Terra Pods in their landscapes."
      />

      <section className="container-pod py-20">
        <div className="grid auto-rows-[minmax(0,1fr)] grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {galleryImages.map((src, i) => (
            <Reveal
              key={i}
              delay={(i % 6) * 0.05}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 ${
                layout[i % layout.length]
              }`}
            >
              <div
                className="absolute inset-0 scale-105 bg-cover bg-center transition-transform duration-[1.4s] ease-out group-hover:scale-100"
                style={{ backgroundImage: `url(${src})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute bottom-4 left-4 translate-y-2 text-xs uppercase tracking-[0.2em] text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                Pod · Field 0{(i % 9) + 1}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-pod py-20">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-10 text-center sm:p-16">
          <span className="eyebrow mx-auto justify-center">Site visits</span>
          <h2 className="display-2 mt-5">
            See a Terra Pod <span className="text-gold">in person.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-ink-300">
            We host private tours at our flagship pavilion in Northern California,
            and at select client residences across the West Coast.
          </p>
          <Link href="/contact" className="btn-primary mt-8">
            Book a private tour
          </Link>
        </div>
      </section>
    </>
  );
}
