export type Tier = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  startingPrice: number;
  models: string[];
  features: string[];
  image: string;
  accent: string;
};

export const tiers: Tier[] = [
  {
    slug: "entry",
    name: "Entry & Studio",
    tagline: "ADU-ready",
    description:
      "ADU-ready for AirBnB, accessory dwellings, and short-stay retreats. The fastest path from order to move-in.",
    startingPrice: 47500,
    models: ["A3", "E3-II", "W3"],
    features: [
      "ADU & Section 8 ready",
      "Floor-to-ceiling glass",
      "Smart access + LED lighting",
      "Marble bath, smart toilet",
      "Connects to city utilities",
    ],
    image: "/images/pod-1-exterior.jpg",
    accent: "from-accent/25 to-transparent",
  },
  {
    slug: "mid",
    name: "Mid-Range",
    tagline: "Affordable. Code-certified.",
    description:
      "US affordable housing code certified. Balconies and skylights available. Built for long-stay residents and full-time use.",
    startingPrice: 64300,
    models: ["A5", "A7", "E5-II", "H5", "R5", "Z5", "P5", "W6"],
    features: [
      "Balconies + skylight options",
      "Full kitchen + bar counter",
      "Heated floors available",
      "Blackout curtains, smart access",
      "High wind + hail rated",
    ],
    image: "/images/pod-2-elevated.jpg",
    accent: "from-accent/20 to-transparent",
  },
  {
    slug: "flagship",
    name: "Flagship",
    tagline: "Developer & resort grade",
    description:
      "Developer and resort grade. Up to 40m², fully code-compliant. Panoramic glass facades, premium finishes, and the configurations that move the needle for hospitality and large-scale projects.",
    startingPrice: 84500,
    models: ["A9", "AE31", "AE40", "W9", "A9D"],
    features: [
      "Up to 40m² interior",
      "Panoramic glass facade",
      "Solar + smart voice control",
      "Cinema-ready projector option",
      "Resort-grade fit and finish",
    ],
    image: "/images/pod-4-modular.jpg",
    accent: "from-accent/30 to-transparent",
  },
];

export const customizations = [
  { title: "Solar Panels", body: "Off-grid or hybrid" },
  { title: "Full Kitchen", body: "Cabinets, hood, fridge" },
  { title: "Bar Counter", body: "Custom built-in" },
  { title: "Heated Floors", body: "Underfloor heating" },
  { title: "Skylight", body: "Starry sky ceiling" },
  { title: "Smart Voice", body: "Whole-home control" },
  { title: "Projector", body: "Cinema-ready" },
  { title: "Wardrobe", body: "Built-in storage" },
];

export const standardInclusions = [
  "Floor-to-ceiling glass",
  "Smart access",
  "AC",
  "Water heater",
  "Ventilation",
  "Marble bath",
  "Smart toilet",
  "LED lighting",
  "Blackout curtains",
  "City utilities ready",
  "High wind rated",
  "Hail resistant",
  "Extreme temp insulated",
];

export const useCases = [
  { name: "AirBnB", body: "Turn-key short-stay rentals." },
  { name: "Ranches", body: "Guest cabins and ranch hands." },
  { name: "Cafés", body: "Boutique retail and F&B." },
  { name: "Offices", body: "Site offices and ADUs for remote work." },
  { name: "Man Camps", body: "Workforce housing for energy and ag." },
  { name: "Section 8", body: "Affordable housing program eligible." },
  { name: "Disaster Relief", body: "400+ unit rapid deployment." },
  { name: "Developer Projects", body: "Resort, hospitality, and multi-unit communities." },
];

export const trustBadges = [
  "ADU & Section 8 Ready",
  "US Housing Code Certified",
  "No Permits · No Property Tax",
  "Fast Deployment · Any Quantity",
  "Tax Write-Off Eligible",
];

export const stats = [
  { value: "$47,500", label: "Starting price" },
  { value: "25+", label: "Designs · 9 series" },
  { value: "400+", label: "Units / month" },
];

export const processSteps = [
  {
    n: "01",
    title: "Factory Configuration",
    body: "Built to your exact spec — solar panels, full kitchen, bar counter, heated floors, skylight. All installed at the source, not on-site.",
  },
  {
    n: "02",
    title: "Logistics & US Customs",
    body: "Our licensed US Customs broker, freight forwarder, and logistics team handle every document and filing. One team, zero handoffs, no surprise fees.",
  },
  {
    n: "03",
    title: "Bonded Yard",
    body: "Your pod enters our Del Rio bonded facility held duty-deferred until you're ready. No forced timelines. Your schedule, your terms.",
  },
  {
    n: "04",
    title: "Last-Mile Delivery",
    body: "Delivered direct to your property. Connects to city electric, water, and sewage. No off-grid infrastructure required.",
  },
  {
    n: "05",
    title: "Move In",
    body: "No permits. No property tax. ADU compliant. US housing code certified. High wind, hail, and extreme temperature rated.",
  },
];

export const contact = {
  phonePrimary: "(830) 422-5062",
  phonePrimaryHref: "tel:+18304225062",
  phoneSecondary: "(361) 434-9855",
  phoneSecondaryHref: "tel:+13614349855",
  email: "hello@terrapodsusa.com",
  city: "Del Rio, Texas",
  region: "US & Mexico",
  showroom: "3 Pods. Del Rio, TX.",
};

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
