export type Model = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  startingPrice: number;
  size: string;
  bedrooms: string;
  delivery: string;
  features: string[];
  image: string;
  accent: string;
};

export const models: Model[] = [
  {
    slug: "solo",
    name: "Pod Solo",
    tagline: "The studio retreat",
    description:
      "A 240 sq ft sanctuary engineered for stillness. Floor-to-ceiling glazing, integrated bed platform, full bath, and a galley kitchen.",
    startingPrice: 89000,
    size: "240 sq ft",
    bedrooms: "Studio",
    delivery: "12 weeks",
    features: [
      "Floor-to-ceiling glass",
      "Solar-ready electrical",
      "Heated polished concrete floor",
      "Integrated millwork bed",
      "Italian fixtures",
    ],
    image: "/images/pod-1-exterior.jpg",
    accent: "from-amber-500/20 to-transparent",
  },
  {
    slug: "duo",
    name: "Pod Duo",
    tagline: "Elevated, with a view",
    description:
      "A 480 sq ft pod with a true bedroom suite, open living core, and a cantilevered platform that doubles your usable space.",
    startingPrice: 149000,
    size: "480 sq ft",
    bedrooms: "1 Bed",
    delivery: "14 weeks",
    features: [
      "Cantilevered steel platform",
      "Full chef's kitchen",
      "Walk-in shower with rainhead",
      "Smart climate system",
      "Off-grid package available",
    ],
    image: "/images/pod-2-elevated.jpg",
    accent: "from-emerald-500/15 to-transparent",
  },
  {
    slug: "atelier",
    name: "Pod Atelier",
    tagline: "Composed interior. Considered light.",
    description:
      "A 720 sq ft pod with two bedrooms, a private study, and an architectural living core finished in warm timber and concrete.",
    startingPrice: 219000,
    size: "720 sq ft",
    bedrooms: "2 Bed",
    delivery: "18 weeks",
    features: [
      "Coved ceiling with cove lighting",
      "Private study nook",
      "Dual-zone climate",
      "Premium oak interior",
      "10-year structural warranty",
    ],
    image: "/images/pod-3-interior.jpg",
    accent: "from-stone-500/20 to-transparent",
  },
  {
    slug: "vista",
    name: "Pod Vista",
    tagline: "The flagship residence",
    description:
      "Our flagship 1,100 sq ft pod with three bedrooms, a great room, and a continuous run of glass framing your horizon.",
    startingPrice: 329000,
    size: "1,100 sq ft",
    bedrooms: "3 Bed",
    delivery: "22 weeks",
    features: [
      "Continuous glass facade",
      "Modular factory-built chassis",
      "Integrated solar + battery",
      "Heated soaking tub",
      "Concierge install",
    ],
    image: "/images/pod-4-modular.jpg",
    accent: "from-accent/20 to-transparent",
  },
];

export const galleryImages = [
  "/images/pod-1-exterior.jpg",
  "/images/pod-2-elevated.jpg",
  "/images/pod-3-interior.jpg",
  "/images/pod-4-modular.jpg",
  "/images/factory.jpg",
  "/images/pod-1-exterior.jpg",
  "/images/pod-2-elevated.jpg",
  "/images/pod-3-interior.jpg",
  "/images/pod-4-modular.jpg",
  "/images/factory.jpg",
  "/images/pod-1-exterior.jpg",
  "/images/pod-2-elevated.jpg",
];
