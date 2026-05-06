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
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    accent: "from-amber-500/20 to-transparent",
  },
  {
    slug: "duo",
    name: "Pod Duo",
    tagline: "One bedroom, infinite views",
    description:
      "A 480 sq ft pod with a true bedroom suite, open living core, and a covered deck that doubles your usable space.",
    startingPrice: 149000,
    size: "480 sq ft",
    bedrooms: "1 Bed",
    delivery: "14 weeks",
    features: [
      "Cantilevered cedar deck",
      "Full chef's kitchen",
      "Walk-in shower with rainhead",
      "Smart climate system",
      "Off-grid package available",
    ],
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
    accent: "from-emerald-500/15 to-transparent",
  },
  {
    slug: "atelier",
    name: "Pod Atelier",
    tagline: "Two bedrooms, fully composed",
    description:
      "A 720 sq ft pod with two bedrooms, a private study, and an architectural living core anchored by a sculptural fireplace.",
    startingPrice: 219000,
    size: "720 sq ft",
    bedrooms: "2 Bed",
    delivery: "18 weeks",
    features: [
      "Sculptural concrete fireplace",
      "Private study nook",
      "Dual-zone climate",
      "Premium oak interior",
      "10-year structural warranty",
    ],
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80",
    accent: "from-stone-500/20 to-transparent",
  },
  {
    slug: "vista",
    name: "Pod Vista",
    tagline: "The flagship residence",
    description:
      "Our flagship 1,100 sq ft pod with three bedrooms, a great room, and 30 feet of uninterrupted glass framing your horizon.",
    startingPrice: 329000,
    size: "1,100 sq ft",
    bedrooms: "3 Bed",
    delivery: "22 weeks",
    features: [
      "30 ft panoramic glass wall",
      "Suspended steel roofline",
      "Integrated solar + battery",
      "Heated soaking tub",
      "Concierge install",
    ],
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
    accent: "from-accent/20 to-transparent",
  },
];

export const galleryImages = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1600573472556-e636c2acda88?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=80",
];
