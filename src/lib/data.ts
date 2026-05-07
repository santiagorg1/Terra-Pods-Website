export type Silhouette =
  | "capsule"
  | "capsule-aero"
  | "capsule-balcony"
  | "linear"
  | "squared"
  | "cabin"
  | "specialty";

export type ConfigGroup = {
  title: string;
  items: string[];
};

export type InteriorPhoto = {
  src: string;
  label: string;
  alt: string;
};

export type Model = {
  // identity
  slug: string;
  name: string;
  short: string; // e.g. "A9"
  series: string;
  seriesSlug: string;
  silhouette: Silhouette;
  finish: string;
  accent: string;
  badge?: string;

  // copy
  tagline: string;
  description: string;

  // pricing & timeline
  startingPrice: number;
  delivery: string;

  // dimensions & capacity
  area: string;
  areaSqft: string;
  dimensions: string; // L × W × H mm
  length: string;
  width: string;
  height: string;
  guests: string;
  weight: string;
  power: string;

  // structured spec sections (extracted from each catalog page)
  exteriorProtection: string[];
  interiorDecoration: string[];
  guestControl: string[];
  productAccessories: string[];
  hardFittedFurniture?: string[];
  optionalConfigurations: ConfigGroup[];

  // interior photos (extracted from catalog), with semantic labels
  interiors: InteriorPhoto[];

  // curated marketing list
  features: string[];
};

export type Series = {
  slug: string;
  name: string;
  shortCode: string;
  tagline: string;
  description: string;
  silhouette: Silhouette;
  accent: string;
};


// ─────────────────────────────────────────────────────────────────────────────
// Common spec packages — extracted from the catalogs and shared across models
// ─────────────────────────────────────────────────────────────────────────────

const CAPSULE_EXTERIOR = [
  "Galvanized steel structural frame",
  "Fluorocarbon-sprayed aluminium alloy shell module",
  "Thermal, waterproof and moisture-proof structural envelope",
  "Three-layer hollow tempered floor-to-ceiling glass",
  "Standard swing entrance door",
];

const CAPSULE_EXTERIOR_SKYLIGHT = [
  ...CAPSULE_EXTERIOR.slice(0, 4),
  "Hollow laminated tempered glass skylight",
  "Standard swing entrance door",
];

const BALCONY_EXTERIOR = [
  "Galvanized steel structural frame",
  "Fluorocarbon-sprayed aluminium alloy shell module",
  "Thermal, waterproof and moisture-proof structural envelope",
  "Three-layer hollow tempered floor-to-ceiling glass",
  "Hollow laminated tempered glass skylight",
  "Painted stainless steel swing entrance door",
  "Panoramic balcony",
];

const SPECIALTY_EXTERIOR = [
  "Galvanized steel structural frame",
  "Fluorocarbon-sprayed aluminium alloy shell module (oxide red)",
  "Insulated tempered floor-to-ceiling glass",
  "Insulated laminated tempered glass skylight",
  "Sliding glass entrance door",
];

const CAPSULE_INTERIOR = [
  "Integrated ceiling and wall stone modules",
  "Crystal wood-grain flooring",
  "Bathroom privacy glass door",
  "Bathroom shower room · marble / tile floor",
  "Washbasin counter · sink · bathroom mirror",
  "Coat hooks · shower storage shelf · towel rack",
  "Branded water tap · showerhead · floor drain",
  "Whole-house lighting system",
  "Whole-house water and electricity system",
  "Standard color blackout curtains",
  "Air conditioner (cooling & heating)",
  "Electric water heater",
  "Ventilation system",
  "Whole-house mosquito-proof screen doors",
  "4-in-1 bathroom ceiling heater (light · heat · ventilation · fan)",
  "Branded smart toilet",
  "Electric underfloor heating",
];

const SPECIALTY_INTERIOR = [
  "Integrated ceiling and wall stone modules",
  "Crystal wood-grain flooring",
  "Bathroom swing doors (×2)",
  "Bathroom · marble / tile floor",
  "Washbasin counter · sink · bathroom mirror",
  "Coat hooks",
  "Branded water tap · floor drain",
  "Whole-house lighting system",
  "Whole-house water and electricity system",
  "Standard color blackout curtains",
  "Split-type air conditioners (2P + 1.5P, wall-mounted)",
  "Ventilation system",
  "Whole-house mosquito-proof screens",
  "Branded toilets (one squat + one sitting)",
  "Lounge swing door",
];

const CAPSULE_GUEST_BASIC = [
  "Lighting / electric curtains",
  "Intelligent access control system for hotels",
];

const CAPSULE_GUEST_SMART = [
  "Multi-scenario mode function panel",
  "Lighting / electric curtains",
  "Smart voice control",
  "Hotel intelligent access control system",
];

const PRODUCT_ACCESSORIES = [
  "Support feet matched at the bottom of the product",
  "Lifting rings · transportation fixtures",
];

// Optional-configuration packages
const OPT_INSULATION = {
  title: "Insulation upgrade",
  items: [
    "UV-resistant heat-insulating explosion-proof film (high-transparency / privacy)",
    "Thickened insulation layer",
  ],
};

const OPT_COMFORT_BASIC = {
  title: "Comfort upgrade",
  items: ["Smart voice system", "Starry sky skylight"],
};

const OPT_COMFORT_FULL = {
  title: "Comfort upgrade",
  items: [
    "Custom bar counter",
    "Custom wardrobe",
    "Smart voice system",
    "Projector + projection screen",
  ],
};

const OPT_KITCHEN = {
  title: "International kitchen — integrated customization",
  items: [
    "Kitchen cabinets / wall cabinets (including sink & water tap)",
    "Range hood / induction cooker / refrigerator",
  ],
};

const OPT_ACCESSORIES = {
  title: "Accessories & peripherals",
  items: ["Entrance staircase", "Triangular V-brace", "Entrance platform"],
};

// AE Cabin Series shared sections (different anatomy — modular panels)
const CABIN_ROOF = [
  "Roof aluminium plate with PVDF coating",
  "Light steel keel frame",
  "Ceiling aluminium plate",
  "Module broken-bridge thermal insulation",
  "Solar panel mounting clips",
  "Embedded wiring pipes",
  "Injection of PIR flame-retardant insulating thermal material",
];

const CABIN_WALL = [
  "Shell aluminium plate",
  "Light steel galvanised structural frame",
  "Injection of PIR flame-retardant insulating thermal material",
  "8 mm carbon-crystal decorative wall panel",
  "Module broken-bridge thermal insulation",
  "Embedded wiring pipes",
];

const CABIN_BOTTOM = [
  "Shell aluminium plate with PVDF coating",
  "Light steel keel frame",
  "Injection of flame-retardant PIR insulating thermal material",
  "Internal color steel plate",
  "Broken-bridge thermal insulation aluminium profile module",
  "Embedded wiring pipes",
  "Structural floor module",
  "Finished floor",
  "Hot-dip galvanised steel base",
];

const CABIN_INTERIOR = [
  "Insulated Low-E tempered SMC glass",
  "Modular bathroom",
  "Toilet & water tank · vanity · wall cabinet",
  "Shower faucet & rod · towel rack",
  "Exhaust fan · LED lights · floor drain",
];

const CABIN_OPT = [
  {
    title: "Comfort upgrades",
    items: ["Air conditioner", "Kitchen and kitchen appliances"],
  },
  {
    title: "Accessories & peripherals",
    items: ["Electrical · wiring · lighting", "Solar system", "Water tank"],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Series
// ─────────────────────────────────────────────────────────────────────────────

export const series: Series[] = [
  {
    slug: "a",
    name: "A Series",
    shortCode: "A",
    tagline: "The signature capsule",
    description:
      "Our defining capsule silhouette — a pearl-white aluminium shell, panoramic glazing, and a softly curved roofline. Available from a 16 m² studio to a 45 m² flagship.",
    silhouette: "capsule",
    accent: "#c9a86a",
  },
  {
    slug: "h",
    name: "H Series",
    shortCode: "H",
    tagline: "Aerodynamic clarity",
    description:
      "A sculpted leading edge and ribbon glazing. The H reads as a single quiet gesture, anchored by a panoramic skylight.",
    silhouette: "capsule-aero",
    accent: "#7fb3c4",
  },
  {
    slug: "r",
    name: "R Series",
    shortCode: "R",
    tagline: "Capsule with a panoramic balcony",
    description:
      "The R adds a stainless steel entrance door and a panoramic balcony — engineered for sites where the view earns its keep.",
    silhouette: "capsule-balcony",
    accent: "#9bb084",
  },
  {
    slug: "p",
    name: "P Series",
    shortCode: "P",
    tagline: "Linear precision",
    description:
      "Long, low, and luminous. P balances a continuous glazed elevation against a quiet aluminium spine.",
    silhouette: "linear",
    accent: "#d9bf8e",
  },
  {
    slug: "z",
    name: "Z Series",
    shortCode: "Z",
    tagline: "Architectural minimalism",
    description:
      "Tightly composed proportions with a hard horizon line. Suited to clients who want the pod to disappear into the site.",
    silhouette: "linear",
    accent: "#9aa1a8",
  },
  {
    slug: "f",
    name: "F Series",
    shortCode: "F",
    tagline: "Glass-forward",
    description:
      "A glass-forward elevation and a cantilevered shoulder. F is the most transparent expression in the collection.",
    silhouette: "linear",
    accent: "#a3c0d4",
  },
  {
    slug: "e",
    name: "E-II Series",
    shortCode: "E·II",
    tagline: "The evolution",
    description:
      "The second-generation E shell — a refined snout, deeper insulation, and a continuous interior datum line. Available in four lengths.",
    silhouette: "capsule-aero",
    accent: "#c9a86a",
  },
  {
    slug: "w",
    name: "W Series",
    shortCode: "W",
    tagline: "Squared & residential",
    description:
      "Squared corners, a flat roofline, and a generous interior volume. W reads as architecture, not as a pod.",
    silhouette: "squared",
    accent: "#b9b0a3",
  },
  {
    slug: "specialty",
    name: "Specialty",
    shortCode: "S",
    tagline: "Service & dining",
    description:
      "Hospitality-grade capsules in our oxide-red finish. Configured as a guest service center or a fully equipped dining room.",
    silhouette: "specialty",
    accent: "#a85a3c",
  },
  {
    slug: "ae",
    name: "AE Cabin Series",
    shortCode: "AE",
    tagline: "Modular cabin architecture",
    description:
      "A panelised cabin system. Solar-ready roof, tempered Low-E glazing, and a kit-of-parts wall module that ships flat and assembles in days.",
    silhouette: "cabin",
    accent: "#7a8a6a",
  },
];

// Per-slug interior photo labels. Position-ordered, matches the catalog
// bottom-strip order (left → right). Counts must match the extracted asset
// counts in /public/pods/<slug>-interior-N.jpg.
const INTERIOR_LABELS: Record<string, string[]> = {
  // A series
  a3: ["Bedroom", "Bathroom"],
  a5: ["Living", "Bedroom", "Bathroom"],
  a7: ["Living", "Bedroom", "Bathroom"],
  a9: ["Living", "Bedroom", "Bathroom"],
  // F series
  f7: ["Living", "Bedroom", "Bathroom"],
  // H series
  h5: ["Living", "Bedroom", "Bathroom"],
  // R series
  r5: ["Living", "Bedroom", "Bathroom"],
  r7: ["Living", "Bedroom", "Bathroom"],
  // P series
  p5: ["Living", "Bedroom", "Bathroom"],
  p7: ["Living", "Bedroom", "Bathroom"],
  // Z series
  z5: ["Living", "Bedroom", "Bathroom"],
  z7: ["Living", "Bedroom", "Bathroom"],
  // E-II series
  "e3-ii": ["Bathroom", "Bedroom"],
  "e5-ii": ["Hallway", "Living", "Bathroom"],
  "e6-ii": ["Living", "Bedroom", "Bathroom"],
  "e7-ii": ["Hallway", "Living", "Bathroom"],
  // W series
  w3: ["Living", "Bedroom"],
  w6: ["Kitchen", "Bedroom", "Bathroom"],
  w9: ["Kitchen", "Bedroom", "Laundry"],
  // Specialty
  a7s: ["Reception", "Lounge"],
  a9d: ["Bar", "Dining"],
  // AE Cabin
  "ae23-a": ["Bedroom", "Kitchen", "Bathroom"],
  "ae31-a": ["Bedroom", "Kitchen"],
  "ae31-b": ["Bedroom", "Kitchen"],
  "ae40-a": ["Bedroom", "Living"],
  "ae40-b": ["Bedroom", "Living"],
};

// Per-slug interior photo counts (matches generated assets).
const INTERIOR_COUNTS: Record<string, number> = {
  a3: 2, a5: 3, a7: 3, a9: 3,
  f7: 3, h5: 3,
  r5: 3, r7: 3,
  p5: 3, p7: 3,
  z5: 3, z7: 3,
  "e3-ii": 2, "e5-ii": 3, "e6-ii": 3, "e7-ii": 3,
  w3: 2, w6: 3, w9: 3,
  a7s: 2, a9d: 2,
  "ae23-a": 3, "ae31-a": 2, "ae31-b": 2, "ae40-a": 2, "ae40-b": 2,
};

function buildInteriors(slug: string, modelName: string): InteriorPhoto[] {
  const count = INTERIOR_COUNTS[slug] ?? 0;
  const labels = INTERIOR_LABELS[slug] ?? [];
  const out: InteriorPhoto[] = [];
  for (let i = 0; i < count; i++) {
    const label = labels[i] ?? `Interior ${i + 1}`;
    out.push({
      src: `/pods/${slug}-interior-${i + 1}.jpg`,
      label,
      alt: `${modelName} — ${label.toLowerCase()}`,
    });
  }
  return out;
}

// Helper to compose model with shared sections.
type Build = Omit<
  Model,
  | "exteriorProtection"
  | "interiorDecoration"
  | "guestControl"
  | "productAccessories"
  | "optionalConfigurations"
  | "interiors"
> & {
  exteriorProtection?: string[];
  interiorDecoration?: string[];
  guestControl?: string[];
  productAccessories?: string[];
  optionalConfigurations?: ConfigGroup[];
  interiors?: InteriorPhoto[];
};

const m = (data: Build): Model => ({
  exteriorProtection: data.exteriorProtection ?? CAPSULE_EXTERIOR,
  interiorDecoration: data.interiorDecoration ?? CAPSULE_INTERIOR,
  guestControl: data.guestControl ?? CAPSULE_GUEST_BASIC,
  productAccessories: data.productAccessories ?? PRODUCT_ACCESSORIES,
  optionalConfigurations:
    data.optionalConfigurations ?? [OPT_INSULATION, OPT_COMFORT_BASIC, OPT_ACCESSORIES],
  interiors: data.interiors ?? buildInteriors(data.slug, data.name),
  ...data,
});

// ─────────────────────────────────────────────────────────────────────────────
// Models — extracted from all 26 catalog pages
// ─────────────────────────────────────────────────────────────────────────────

export const models: Model[] = [
  // ── A Series ────────────────────────────────────────────────────────────────
  m({
    slug: "a3",
    name: "Terra Pod A3",
    short: "A3",
    series: "A Series",
    seriesSlug: "a",
    silhouette: "capsule",
    finish: "Pearl white",
    accent: "from-amber-500/20 to-transparent",
    badge: "Best entry",
    tagline: "The studio capsule",
    description:
      "A compact capsule for two — a single luminous volume with a full bath, integrated bed, and a wall of tempered glass.",
    startingPrice: 47500,
    delivery: "10 weeks",
    area: "15.7 m²",
    areaSqft: "169 sq ft",
    dimensions: "5600 × 2800 × 3100 mm",
    length: "5.6 m",
    width: "2.8 m",
    height: "3.1 m",
    guests: "2 guests",
    weight: "≈4 t (with floor heating)",
    power: "6.7 kW · 11.2 kW peak",
    features: [
      "Three-layer tempered glazing",
      "Marble bathroom package",
      "Branded smart toilet",
      "Whole-house electricity & water",
      "Entrance staircase option",
    ],
  }),
  m({
    slug: "a5",
    name: "Terra Pod A5",
    short: "A5",
    series: "A Series",
    seriesSlug: "a",
    silhouette: "capsule",
    finish: "Pearl white",
    accent: "from-emerald-500/15 to-transparent",
    tagline: "One-bedroom capsule",
    description:
      "A 31 m² capsule with a true bedroom suite, a full kitchen, and a panoramic glazed face — engineered for two to four guests in long-stay comfort.",
    startingPrice: 64300,
    delivery: "12 weeks",
    area: "31.4 m²",
    areaSqft: "338 sq ft",
    dimensions: "9500 × 3300 × 3300 mm",
    length: "9.5 m",
    width: "3.3 m",
    height: "3.3 m",
    guests: "2–4 guests",
    weight: "≈6.5 t (with floor heating)",
    power: "6.7 kW · 11.2 kW peak",
    features: [
      "Skylight + tempered glazing",
      "International kitchen package",
      "Custom bar counter & wardrobe",
      "Smart voice system",
      "Projector + projection screen",
    ],
    exteriorProtection: CAPSULE_EXTERIOR_SKYLIGHT,
    guestControl: CAPSULE_GUEST_BASIC,
    optionalConfigurations: [OPT_INSULATION, OPT_COMFORT_FULL, OPT_KITCHEN, OPT_ACCESSORIES],
  }),
  m({
    slug: "a7",
    name: "Terra Pod A7",
    short: "A7",
    series: "A Series",
    seriesSlug: "a",
    silhouette: "capsule",
    finish: "Pearl white",
    accent: "from-stone-500/20 to-transparent",
    tagline: "Extended capsule",
    description:
      "A 38 m² capsule that extends the A Series silhouette to its most generous proportions — a private bedroom, a separate living core, and a full chef's kitchen.",
    startingPrice: 75600,
    delivery: "14 weeks",
    area: "38.0 m²",
    areaSqft: "409 sq ft",
    dimensions: "11500 × 3300 × 3300 mm",
    length: "11.5 m",
    width: "3.3 m",
    height: "3.3 m",
    guests: "2–4 guests",
    weight: "≈8 t (with floor heating)",
    power: "9.9 kW · 15.4 kW peak",
    features: [
      "Skylight",
      "International kitchen package",
      "Custom bar + wardrobe",
      "Smart voice system",
      "Projector + projection screen",
    ],
    exteriorProtection: CAPSULE_EXTERIOR_SKYLIGHT,
    optionalConfigurations: [OPT_INSULATION, OPT_COMFORT_FULL, OPT_KITCHEN, OPT_ACCESSORIES],
  }),
  m({
    slug: "a9",
    name: "Terra Pod A9",
    short: "A9",
    series: "A Series",
    seriesSlug: "a",
    silhouette: "capsule",
    finish: "Pearl white",
    accent: "from-accent/20 to-transparent",
    badge: "Flagship",
    tagline: "The flagship capsule",
    description:
      "Our flagship capsule — 45 m² of seamlessly composed living, with a primary suite, a great-room core, and 13.5 metres of uninterrupted aluminium silhouette.",
    startingPrice: 85500,
    delivery: "16 weeks",
    area: "44.6 m²",
    areaSqft: "480 sq ft",
    dimensions: "13500 × 3300 × 3300 mm",
    length: "13.5 m",
    width: "3.3 m",
    height: "3.3 m",
    guests: "2–4 guests",
    weight: "≈10 t (with floor heating)",
    power: "11.5 kW · 17 kW peak",
    features: [
      "Skylight",
      "Primary suite + great-room living",
      "International chef's kitchen",
      "Custom bar + wardrobe",
      "Projector + projection screen",
    ],
    exteriorProtection: CAPSULE_EXTERIOR_SKYLIGHT,
    optionalConfigurations: [OPT_INSULATION, OPT_COMFORT_FULL, OPT_KITCHEN, OPT_ACCESSORIES],
  }),

  // ── F Series ────────────────────────────────────────────────────────────────
  m({
    slug: "f7",
    name: "Terra Pod F7",
    short: "F7",
    series: "F Series",
    seriesSlug: "f",
    silhouette: "linear",
    finish: "Pearl white",
    accent: "from-sky-500/15 to-transparent",
    tagline: "Glass-forward",
    description:
      "An expansive 38 m² pod with a glass-forward elevation and a cantilevered shoulder — designed to dissolve into views.",
    startingPrice: 77450,
    delivery: "14 weeks",
    area: "38.0 m²",
    areaSqft: "409 sq ft",
    dimensions: "11500 × 3300 × 3300 mm",
    length: "11.5 m",
    width: "3.3 m",
    height: "3.3 m",
    guests: "2–4 guests",
    weight: "≈8 t (with floor heating)",
    power: "9.9 kW · 15.4 kW peak",
    features: [
      "Hard-fitted wardrobe + shoe cabinet",
      "International kitchen package",
      "Custom bar counter",
      "Smart voice system",
      "Projector + projection screen",
    ],
    hardFittedFurniture: ["Wardrobe", "Shoe cabinet"],
    optionalConfigurations: [OPT_INSULATION, OPT_COMFORT_FULL, OPT_KITCHEN, OPT_ACCESSORIES],
  }),

  // ── H Series ────────────────────────────────────────────────────────────────
  m({
    slug: "h5",
    name: "Terra Pod H5",
    short: "H5",
    series: "H Series",
    seriesSlug: "h",
    silhouette: "capsule-aero",
    finish: "Pearl white",
    accent: "from-cyan-500/15 to-transparent",
    tagline: "Aerodynamic clarity",
    description:
      "A 30 m² pod with a sculpted leading edge and a continuous panoramic skylight. Reads as a single quiet gesture across the site.",
    startingPrice: 70350,
    delivery: "12 weeks",
    area: "30.0 m²",
    areaSqft: "323 sq ft",
    dimensions: "9100 × 3300 × 3400 mm",
    length: "9.1 m",
    width: "3.3 m",
    height: "3.4 m",
    guests: "2 guests",
    weight: "≈7 t (with floor heating)",
    power: "10 kW · 15 kW peak",
    features: [
      "Hollow laminated tempered glass skylight",
      "Bar counter (hard-fitted)",
      "Multi-scenario mode panel",
      "Smart voice control",
      "Hotel-grade access control",
    ],
    exteriorProtection: CAPSULE_EXTERIOR_SKYLIGHT,
    guestControl: CAPSULE_GUEST_SMART,
    hardFittedFurniture: ["Bar counter"],
    optionalConfigurations: [OPT_INSULATION, { title: "Comfort upgrade", items: ["Projector"] }, OPT_ACCESSORIES],
  }),

  // ── R Series ────────────────────────────────────────────────────────────────
  m({
    slug: "r5",
    name: "Terra Pod R5",
    short: "R5",
    series: "R Series",
    seriesSlug: "r",
    silhouette: "capsule-balcony",
    finish: "Pearl white",
    accent: "from-lime-500/15 to-transparent",
    tagline: "Capsule + balcony",
    description:
      "A 30 m² capsule with a stainless-steel entrance door and a panoramic balcony — for sites where you want to step out into the view.",
    startingPrice: 70350,
    delivery: "12 weeks",
    area: "30.0 m²",
    areaSqft: "323 sq ft",
    dimensions: "9100 × 3300 × 3400 mm",
    length: "9.1 m",
    width: "3.3 m",
    height: "3.4 m",
    guests: "2 guests",
    weight: "≈7 t (with floor heating)",
    power: "10 kW · 15 kW peak",
    features: [
      "Panoramic balcony",
      "Stainless steel swing door",
      "Bar counter (hard-fitted)",
      "Multi-scenario mode panel",
      "Smart voice control",
    ],
    exteriorProtection: BALCONY_EXTERIOR,
    guestControl: CAPSULE_GUEST_SMART,
    hardFittedFurniture: ["Bar counter"],
    optionalConfigurations: [OPT_INSULATION, { title: "Comfort upgrade", items: ["Projector"] }, OPT_ACCESSORIES],
  }),
  m({
    slug: "r7",
    name: "Terra Pod R7",
    short: "R7",
    series: "R Series",
    seriesSlug: "r",
    silhouette: "capsule-balcony",
    finish: "Pearl white",
    accent: "from-emerald-500/15 to-transparent",
    tagline: "Extended balcony residence",
    description:
      "A 38 m² R-Series pod with the panoramic balcony, a primary bedroom, and a full living core.",
    startingPrice: 80000,
    delivery: "14 weeks",
    area: "38.0 m²",
    areaSqft: "409 sq ft",
    dimensions: "11500 × 3300 × 3400 mm",
    length: "11.5 m",
    width: "3.3 m",
    height: "3.4 m",
    guests: "2–4 guests",
    weight: "≈8 t (with floor heating)",
    power: "10 kW · 15 kW peak",
    features: [
      "Panoramic balcony",
      "Stainless steel swing door",
      "Bar counter (hard-fitted)",
      "Multi-scenario mode panel",
      "Hotel-grade access control",
    ],
    exteriorProtection: BALCONY_EXTERIOR,
    guestControl: CAPSULE_GUEST_SMART,
    hardFittedFurniture: ["Bar counter"],
    optionalConfigurations: [OPT_INSULATION, { title: "Comfort upgrade", items: ["Projector"] }, OPT_ACCESSORIES],
  }),

  // ── P Series ────────────────────────────────────────────────────────────────
  m({
    slug: "p5",
    name: "Terra Pod P5",
    short: "P5",
    series: "P Series",
    seriesSlug: "p",
    silhouette: "linear",
    finish: "Pearl white",
    accent: "from-amber-500/15 to-transparent",
    tagline: "Linear precision",
    description:
      "A 31 m² pod with a continuous glazed elevation and a tightly composed interior. The P feels long, low, and luminous.",
    startingPrice: 74000,
    delivery: "12 weeks",
    area: "31.4 m²",
    areaSqft: "338 sq ft",
    dimensions: "9500 × 3300 × 3200 mm",
    length: "9.5 m",
    width: "3.3 m",
    height: "3.2 m",
    guests: "2 guests",
    weight: "≈6.5 t (with floor heating)",
    power: "7.5 kW · 12 kW peak",
    features: [
      "Panoramic balcony",
      "Hard-fitted wardrobe + shoe cabinet",
      "International kitchen package",
      "Multi-scenario mode panel",
      "Smart voice control",
    ],
    exteriorProtection: BALCONY_EXTERIOR,
    guestControl: CAPSULE_GUEST_SMART,
    hardFittedFurniture: ["Wardrobe", "Shoe cabinet"],
    optionalConfigurations: [OPT_INSULATION, { title: "Comfort upgrade", items: ["Projector"] }, OPT_KITCHEN, OPT_ACCESSORIES],
  }),
  m({
    slug: "p7",
    name: "Terra Pod P7",
    short: "P7",
    series: "P Series",
    seriesSlug: "p",
    silhouette: "linear",
    finish: "Pearl white",
    accent: "from-orange-500/15 to-transparent",
    tagline: "Extended P silhouette",
    description:
      "The 38 m² P at full length — a primary bedroom, a generous living core, and the P Series' signature horizontal glazing.",
    startingPrice: 84500,
    delivery: "14 weeks",
    area: "38.0 m²",
    areaSqft: "409 sq ft",
    dimensions: "11500 × 3300 × 3200 mm",
    length: "11.5 m",
    width: "3.3 m",
    height: "3.2 m",
    guests: "2–4 guests",
    weight: "≈8 t (with floor heating)",
    power: "11.5 kW · 17 kW peak",
    features: [
      "Panoramic balcony",
      "Hard-fitted wardrobe",
      "International kitchen package",
      "Smart voice control",
      "Hotel-grade access control",
    ],
    exteriorProtection: BALCONY_EXTERIOR,
    guestControl: CAPSULE_GUEST_SMART,
    hardFittedFurniture: ["Wardrobe"],
    optionalConfigurations: [OPT_INSULATION, { title: "Comfort upgrade", items: ["Projector"] }, OPT_KITCHEN, OPT_ACCESSORIES],
  }),

  // ── Z Series ────────────────────────────────────────────────────────────────
  m({
    slug: "z5",
    name: "Terra Pod Z5",
    short: "Z5",
    series: "Z Series",
    seriesSlug: "z",
    silhouette: "linear",
    finish: "Pearl white",
    accent: "from-stone-500/15 to-transparent",
    tagline: "Architectural minimalism",
    description:
      "A 31 m² Z — tightly composed proportions and a hard horizon line. Suited to clients who want the pod to disappear into the site.",
    startingPrice: 73200,
    delivery: "12 weeks",
    area: "31.4 m²",
    areaSqft: "338 sq ft",
    dimensions: "9500 × 3300 × 3200 mm",
    length: "9.5 m",
    width: "3.3 m",
    height: "3.2 m",
    guests: "2 guests",
    weight: "≈6.5 t (with floor heating)",
    power: "7.5 kW · 12 kW peak",
    features: [
      "Panoramic balcony",
      "Hard-fitted wardrobe + shoe cabinet",
      "International kitchen package",
      "Smart voice control",
      "Hotel-grade access control",
    ],
    exteriorProtection: BALCONY_EXTERIOR,
    guestControl: CAPSULE_GUEST_SMART,
    hardFittedFurniture: ["Wardrobe", "Shoe cabinet"],
    optionalConfigurations: [OPT_INSULATION, { title: "Comfort upgrade", items: ["Projector"] }, OPT_KITCHEN, OPT_ACCESSORIES],
  }),
  m({
    slug: "z7",
    name: "Terra Pod Z7",
    short: "Z7",
    series: "Z Series",
    seriesSlug: "z",
    silhouette: "linear",
    finish: "Pearl white",
    accent: "from-zinc-500/15 to-transparent",
    tagline: "Extended Z residence",
    description:
      "A 38 m² Z — the most architectural expression in the collection at this length. A primary suite, a living core, and a horizon line that holds.",
    startingPrice: 86600,
    delivery: "14 weeks",
    area: "38.0 m²",
    areaSqft: "409 sq ft",
    dimensions: "11500 × 3300 × 3200 mm",
    length: "11.5 m",
    width: "3.3 m",
    height: "3.2 m",
    guests: "2–4 guests",
    weight: "≈8 t (with floor heating)",
    power: "11.5 kW · 17 kW peak",
    features: [
      "Panoramic balcony",
      "Hard-fitted wardrobe",
      "International chef's kitchen",
      "Smart voice control",
      "Hotel-grade access control",
    ],
    exteriorProtection: BALCONY_EXTERIOR,
    guestControl: CAPSULE_GUEST_SMART,
    hardFittedFurniture: ["Wardrobe"],
    optionalConfigurations: [OPT_INSULATION, { title: "Comfort upgrade", items: ["Projector"] }, OPT_KITCHEN, OPT_ACCESSORIES],
  }),

  // ── E-II Series ─────────────────────────────────────────────────────────────
  m({
    slug: "e3-ii",
    name: "Terra Pod E3-II",
    short: "E3·II",
    series: "E-II Series",
    seriesSlug: "e",
    silhouette: "capsule-aero",
    finish: "Pearl white",
    accent: "from-amber-500/15 to-transparent",
    tagline: "Compact studio",
    description:
      "A second-generation E shell at studio scale — 14.6 m² of refined detail, with a continuous interior datum line and deeper insulation.",
    startingPrice: 49400,
    delivery: "10 weeks",
    area: "14.6 m²",
    areaSqft: "157 sq ft",
    dimensions: "5600 × 2600 × 3200 mm",
    length: "5.6 m",
    width: "2.6 m",
    height: "3.2 m",
    guests: "2 guests",
    weight: "≈4 t (with floor heating)",
    power: "6.7 kW · 8.2 kW peak",
    features: [
      "Refined snout silhouette",
      "Lighting ventilation fan",
      "Smart voice system option",
      "Starry-sky skylight option",
      "Entrance staircase option",
    ],
    optionalConfigurations: [OPT_INSULATION, OPT_COMFORT_BASIC, OPT_ACCESSORIES],
  }),
  m({
    slug: "e5-ii",
    name: "Terra Pod E5-II",
    short: "E5·II",
    series: "E-II Series",
    seriesSlug: "e",
    silhouette: "capsule-aero",
    finish: "Pearl white",
    accent: "from-emerald-500/15 to-transparent",
    tagline: "Mid E-II",
    description:
      "A 27 m² E-II — a balcony-ready entrance, a panoramic skylight, and the second-generation interior package.",
    startingPrice: 67800,
    delivery: "12 weeks",
    area: "27.2 m²",
    areaSqft: "293 sq ft",
    dimensions: "8500 × 3200 × 3200 mm",
    length: "8.5 m",
    width: "3.2 m",
    height: "3.2 m",
    guests: "2 guests",
    weight: "≈6.5 t (with floor heating)",
    power: "6.7 kW · 8.2 kW peak",
    features: [
      "Panoramic balcony",
      "Stainless steel swing door",
      "Lighting ventilation fan",
      "Custom bar counter (option)",
      "Projector (option)",
    ],
    exteriorProtection: BALCONY_EXTERIOR,
    optionalConfigurations: [
      OPT_INSULATION,
      { title: "Comfort upgrade", items: ["Custom bar counter", "Smart voice system", "Projector"] },
      OPT_ACCESSORIES,
    ],
  }),
  m({
    slug: "e6-ii",
    name: "Terra Pod E6-II",
    short: "E6·II",
    series: "E-II Series",
    seriesSlug: "e",
    silhouette: "capsule-aero",
    finish: "Pearl white",
    accent: "from-teal-500/15 to-transparent",
    tagline: "E-II with kitchen",
    description:
      "A 27 m² E-II with the international integrated kitchen package — for clients who want the pod to live as a primary residence.",
    startingPrice: 65350,
    delivery: "12 weeks",
    area: "27.2 m²",
    areaSqft: "293 sq ft",
    dimensions: "8500 × 3200 × 3200 mm",
    length: "8.5 m",
    width: "3.2 m",
    height: "3.2 m",
    guests: "2 guests",
    weight: "≈6.5 t (with floor heating)",
    power: "6.7 kW · 8.2 kW peak",
    features: [
      "International kitchen package",
      "Range hood / induction cooker",
      "Custom bar counter (option)",
      "Smart voice system",
      "Projector option",
    ],
    optionalConfigurations: [
      OPT_INSULATION,
      { title: "Comfort upgrade", items: ["Custom bar counter", "Smart voice system", "Projector"] },
      OPT_KITCHEN,
      OPT_ACCESSORIES,
    ],
  }),
  m({
    slug: "e7-ii",
    name: "Terra Pod E7-II",
    short: "E7·II",
    series: "E-II Series",
    seriesSlug: "e",
    silhouette: "capsule-aero",
    finish: "Pearl white",
    accent: "from-amber-500/20 to-transparent",
    tagline: "Flagship E-II",
    description:
      "The most generous E-II — 36.8 m² with a primary suite, a panoramic balcony, and a fully integrated kitchen.",
    startingPrice: 79500,
    delivery: "14 weeks",
    area: "36.8 m²",
    areaSqft: "396 sq ft",
    dimensions: "11500 × 3200 × 3200 mm",
    length: "11.5 m",
    width: "3.2 m",
    height: "3.2 m",
    guests: "2–4 guests",
    weight: "≈8 t (with floor heating)",
    power: "9.9 kW · 11.3 kW peak",
    features: [
      "Panoramic balcony",
      "International kitchen package",
      "Custom bar counter",
      "Smart voice system",
      "Projector + projection screen",
    ],
    exteriorProtection: BALCONY_EXTERIOR,
    optionalConfigurations: [
      OPT_INSULATION,
      { title: "Comfort upgrade", items: ["Custom bar counter", "Smart voice system", "Projector"] },
      OPT_KITCHEN,
      OPT_ACCESSORIES,
    ],
  }),

  // ── W Series ────────────────────────────────────────────────────────────────
  m({
    slug: "w3",
    name: "Terra Pod W3",
    short: "W3",
    series: "W Series",
    seriesSlug: "w",
    silhouette: "squared",
    finish: "Pearl white",
    accent: "from-stone-500/20 to-transparent",
    tagline: "Compact, residential",
    description:
      "A 19 m² W with squared corners and a residential proportion. Reads as architecture rather than as a pod.",
    startingPrice: 58800,
    delivery: "10 weeks",
    area: "19.1 m²",
    areaSqft: "206 sq ft",
    dimensions: "5600 × 3400 × 3400 mm",
    length: "5.6 m",
    width: "3.4 m",
    height: "3.4 m",
    guests: "2 guests",
    weight: "≈4 t (with floor heating)",
    power: "6.7 kW · 11.2 kW peak",
    features: [
      "Squared residential proportions",
      "Smart voice control",
      "Electric towel rack",
      "Micro-ventilation window",
      "Hotel-grade access control",
    ],
    guestControl: [...CAPSULE_GUEST_BASIC, "Smart voice control"],
    optionalConfigurations: [
      OPT_INSULATION,
      { title: "Comfort upgrade", items: ["Smart voice system", "Electric towel rack"] },
      OPT_ACCESSORIES,
    ],
  }),
  m({
    slug: "w6",
    name: "Terra Pod W6",
    short: "W6",
    series: "W Series",
    seriesSlug: "w",
    silhouette: "squared",
    finish: "Pearl white",
    accent: "from-stone-500/20 to-transparent",
    tagline: "Mid W residence",
    description:
      "A 32 m² W — a fully equipped kitchen, a laundry zone, and a primary bedroom.",
    startingPrice: 79500,
    delivery: "12 weeks",
    area: "32.3 m²",
    areaSqft: "348 sq ft",
    dimensions: "9500 × 3400 × 3400 mm",
    length: "9.5 m",
    width: "3.4 m",
    height: "3.4 m",
    guests: "2–4 guests",
    weight: "≈6.5 t (with floor heating)",
    power: "6.7 kW · 11.2 kW peak",
    features: [
      "Custom bar counter / wardrobe",
      "Range hood / induction cooker",
      "Washing machine package",
      "Smart voice system",
      "Projector + projection screen",
    ],
    guestControl: [...CAPSULE_GUEST_BASIC, "Smart voice control"],
    optionalConfigurations: [
      OPT_INSULATION,
      {
        title: "Comfort upgrade",
        items: [
          "Custom bar counter / custom wardrobe",
          "Smart voice system",
          "Projector + projection screen",
          "Washing machine",
          "Electric towel rack",
        ],
      },
      OPT_KITCHEN,
      OPT_ACCESSORIES,
    ],
  }),
  m({
    slug: "w9",
    name: "Terra Pod W9",
    short: "W9",
    series: "W Series",
    seriesSlug: "w",
    silhouette: "squared",
    finish: "Pearl white",
    accent: "from-stone-500/20 to-transparent",
    badge: "Residential",
    tagline: "Flagship W residence",
    description:
      "The W Series at full residential scale — 39 m², a primary suite, a great-room kitchen, and a full laundry.",
    startingPrice: 97100,
    delivery: "14 weeks",
    area: "39.1 m²",
    areaSqft: "421 sq ft",
    dimensions: "11500 × 3400 × 3400 mm",
    length: "11.5 m",
    width: "3.4 m",
    height: "3.4 m",
    guests: "2–4 guests",
    weight: "≈8 t (with floor heating)",
    power: "9.9 kW · 15.4 kW peak",
    features: [
      "Primary suite",
      "Great-room kitchen",
      "Full laundry package",
      "Custom bar / wardrobe",
      "Smart voice system",
    ],
    guestControl: [...CAPSULE_GUEST_BASIC, "Smart voice control"],
    optionalConfigurations: [
      OPT_INSULATION,
      {
        title: "Comfort upgrade",
        items: [
          "Custom bar counter / custom wardrobe",
          "Smart voice system",
          "Projector + projection screen",
          "Washing machine",
          "Electric towel rack",
        ],
      },
      OPT_KITCHEN,
      OPT_ACCESSORIES,
    ],
  }),

  // ── Specialty ───────────────────────────────────────────────────────────────
  m({
    slug: "a7s",
    name: "Terra Pod A7S",
    short: "A7S",
    series: "Specialty",
    seriesSlug: "specialty",
    silhouette: "specialty",
    finish: "Oxide red",
    accent: "from-red-700/30 to-transparent",
    badge: "Service center",
    tagline: "Hospitality service center",
    description:
      "A hospitality service center in oxide red — front desk, lounge, and bathrooms — engineered to land beside your accommodation pods.",
    startingPrice: 84500,
    delivery: "14 weeks",
    area: "38.0 m²",
    areaSqft: "409 sq ft",
    dimensions: "11500 × 3300 × 3300 mm",
    length: "11.5 m",
    width: "3.3 m",
    height: "3.3 m",
    guests: "2–4 staff",
    weight: "≈8 t (with floor heating)",
    power: "9.9 kW · 15.4 kW peak",
    features: [
      "Custom front desk",
      "Lounge swing door",
      "Two branded toilets",
      "Sliding glass entrance door",
      "Insulated tempered glazing",
    ],
    exteriorProtection: SPECIALTY_EXTERIOR,
    interiorDecoration: SPECIALTY_INTERIOR,
    hardFittedFurniture: ["Custom front desk", "Custom wall cabinet"],
    optionalConfigurations: [
      {
        title: "Insulation upgrade",
        items: [
          "Water-supply pipe electric auxiliary heating system",
          "Thickened insulation layer",
          "Electric underfloor heating",
          "Three-layer insulated tempered floor-to-ceiling glass",
          "UV-resistant heat insulation explosion-proof film",
        ],
      },
      { title: "Comfort upgrade", items: ["Smart voice system", "Projector + projection screen"] },
      OPT_ACCESSORIES,
    ],
  }),
  m({
    slug: "a9d",
    name: "Terra Pod A9D",
    short: "A9D",
    series: "Specialty",
    seriesSlug: "specialty",
    silhouette: "specialty",
    finish: "Oxide red",
    accent: "from-red-700/30 to-transparent",
    badge: "Dining room",
    tagline: "Hospitality dining capsule",
    description:
      "A 45 m² hospitality dining capsule in oxide red — a full bar, a chef's kitchen, and a dining room engineered for service.",
    startingPrice: 93700,
    delivery: "16 weeks",
    area: "44.6 m²",
    areaSqft: "480 sq ft",
    dimensions: "13500 × 3300 × 3300 mm",
    length: "13.5 m",
    width: "3.3 m",
    height: "3.3 m",
    guests: "2–4 staff",
    weight: "≈9 t (with floor heating)",
    power: "11.5 kW · 17 kW peak",
    features: [
      "Custom bar counter",
      "Chef's kitchen package",
      "Sunshade roller blind",
      "Sliding glass entrance door",
      "Smart voice system",
    ],
    exteriorProtection: SPECIALTY_EXTERIOR,
    interiorDecoration: [
      "Integrated ceiling and wall stone modules",
      "Crystal wood-grain flooring",
      "Tile floor in bar area",
      "Sink · water tap · range hood",
      "Coat hooks · shower storage shelf",
      "Branded water tap · floor drain",
      "Whole-house lighting system",
      "Whole-house water and electricity system",
      "Sunshade roller blind",
      "Split-type air conditioner (cooling & heating)",
      "Ventilation system",
      "Whole-house mosquito-proof screens",
    ],
    hardFittedFurniture: [
      "Custom bar counter / display wall cabinets",
      "Custom kitchen countertop / wall cabinets",
    ],
    optionalConfigurations: [
      {
        title: "Insulation upgrade",
        items: [
          "Water-supply pipe electric auxiliary heating system",
          "Thickened insulation layer",
          "Electric underfloor heating",
          "Three-layer insulated tempered floor-to-ceiling glass",
          "UV-resistant heat insulation explosion-proof film",
        ],
      },
      { title: "Comfort upgrade", items: ["Smart voice system", "Projector + projection screen"] },
      OPT_ACCESSORIES,
    ],
  }),

  // ── AE Cabin Series ─────────────────────────────────────────────────────────
  m({
    slug: "ae23-a",
    name: "Terra Pod AE23-A",
    short: "AE23·A",
    series: "AE Cabin Series",
    seriesSlug: "ae",
    silhouette: "cabin",
    finish: "Cabin oak",
    accent: "from-moss/30 to-transparent",
    tagline: "Compact cabin",
    description:
      "A 23 m² panelised cabin with a solar-ready roof, Low-E tempered glazing, and a kit-of-parts wall module that ships flat and assembles in days.",
    startingPrice: 72700,
    delivery: "12 weeks",
    area: "23.0 m²",
    areaSqft: "248 sq ft",
    dimensions: "6500 × 3480 × 3300 mm",
    length: "6.5 m",
    width: "3.48 m",
    height: "3.3 m",
    guests: "2 guests",
    weight: "≈4.3 t",
    power: "Solar-ready · grid-tie",
    features: [
      "Solar panel mounting clips",
      "PVDF-coated aluminium roof",
      "8 mm carbon-crystal wall panel",
      "Low-E tempered glazing",
      "Modular bathroom",
    ],
    exteriorProtection: [...CABIN_ROOF, ...CABIN_WALL, ...CABIN_BOTTOM],
    interiorDecoration: CABIN_INTERIOR,
    guestControl: [],
    productAccessories: [],
    optionalConfigurations: CABIN_OPT,
  }),
  m({
    slug: "ae31-a",
    name: "Terra Pod AE31-A",
    short: "AE31·A",
    series: "AE Cabin Series",
    seriesSlug: "ae",
    silhouette: "cabin",
    finish: "Cabin oak",
    accent: "from-moss/30 to-transparent",
    tagline: "31 m² cabin · plan A",
    description:
      "A 31 m² AE cabin in plan A — a primary bedroom, a living core, and a service zone.",
    startingPrice: 93500,
    delivery: "14 weeks",
    area: "31.1 m²",
    areaSqft: "335 sq ft",
    dimensions: "8940 × 3480 × 3300 mm",
    length: "8.94 m",
    width: "3.48 m",
    height: "3.3 m",
    guests: "2 guests",
    weight: "≈5.5 t",
    power: "Solar-ready · grid-tie",
    features: [
      "Plan A: bedroom + living + service",
      "Solar panel mounting clips",
      "8 mm carbon-crystal wall panel",
      "Modular bathroom",
      "Optional kitchen package",
    ],
    exteriorProtection: [...CABIN_ROOF, ...CABIN_WALL, ...CABIN_BOTTOM],
    interiorDecoration: CABIN_INTERIOR,
    guestControl: [],
    productAccessories: [],
    optionalConfigurations: CABIN_OPT,
  }),
  m({
    slug: "ae31-b",
    name: "Terra Pod AE31-B",
    short: "AE31·B",
    series: "AE Cabin Series",
    seriesSlug: "ae",
    silhouette: "cabin",
    finish: "Cabin oak",
    accent: "from-moss/30 to-transparent",
    tagline: "31 m² cabin · plan B",
    description:
      "Plan B of the 31 m² AE — the same shell, with a reconfigured interior optimized for a couple plus a child or workspace.",
    startingPrice: 93500,
    delivery: "14 weeks",
    area: "31.1 m²",
    areaSqft: "335 sq ft",
    dimensions: "8940 × 3480 × 3300 mm",
    length: "8.94 m",
    width: "3.48 m",
    height: "3.3 m",
    guests: "2–3 guests",
    weight: "≈5.5 t",
    power: "Solar-ready · grid-tie",
    features: [
      "Plan B: split-zone configuration",
      "Solar panel mounting clips",
      "8 mm carbon-crystal wall panel",
      "Modular bathroom",
      "Optional kitchen package",
    ],
    exteriorProtection: [...CABIN_ROOF, ...CABIN_WALL, ...CABIN_BOTTOM],
    interiorDecoration: CABIN_INTERIOR,
    guestControl: [],
    productAccessories: [],
    optionalConfigurations: CABIN_OPT,
  }),
  m({
    slug: "ae40-a",
    name: "Terra Pod AE40-A",
    short: "AE40·A",
    series: "AE Cabin Series",
    seriesSlug: "ae",
    silhouette: "cabin",
    finish: "Cabin oak",
    accent: "from-moss/30 to-transparent",
    badge: "Cabin flagship",
    tagline: "40 m² cabin · plan A",
    description:
      "A 40 m² AE cabin — a true two-zone residence with a primary suite, an open kitchen-living core, and a covered terrace zone.",
    startingPrice: 115200,
    delivery: "16 weeks",
    area: "39.6 m²",
    areaSqft: "426 sq ft",
    dimensions: "11380 × 3480 × 3300 mm",
    length: "11.38 m",
    width: "3.48 m",
    height: "3.3 m",
    guests: "2–4 guests",
    weight: "≈6.7 t",
    power: "Solar-ready · grid-tie",
    features: [
      "Plan A: bedroom + open kitchen-living",
      "Solar panel mounting clips",
      "8 mm carbon-crystal wall panel",
      "Modular bathroom",
      "Optional kitchen package",
    ],
    exteriorProtection: [...CABIN_ROOF, ...CABIN_WALL, ...CABIN_BOTTOM],
    interiorDecoration: CABIN_INTERIOR,
    guestControl: [],
    productAccessories: [],
    optionalConfigurations: CABIN_OPT,
  }),
  m({
    slug: "ae40-b",
    name: "Terra Pod AE40-B",
    short: "AE40·B",
    series: "AE Cabin Series",
    seriesSlug: "ae",
    silhouette: "cabin",
    finish: "Cabin oak",
    accent: "from-moss/30 to-transparent",
    tagline: "40 m² cabin · plan B",
    description:
      "Plan B of the 40 m² AE — a reconfigured layout with a separated dining zone and an enlarged primary suite.",
    startingPrice: 115200,
    delivery: "16 weeks",
    area: "39.6 m²",
    areaSqft: "426 sq ft",
    dimensions: "11380 × 3480 × 3300 mm",
    length: "11.38 m",
    width: "3.48 m",
    height: "3.3 m",
    guests: "2–4 guests",
    weight: "≈6.7 t",
    power: "Solar-ready · grid-tie",
    features: [
      "Plan B: separated dining + primary",
      "Solar panel mounting clips",
      "8 mm carbon-crystal wall panel",
      "Modular bathroom",
      "Optional kitchen package",
    ],
    exteriorProtection: [...CABIN_ROOF, ...CABIN_WALL, ...CABIN_BOTTOM],
    interiorDecoration: CABIN_INTERIOR,
    guestControl: [],
    productAccessories: [],
    optionalConfigurations: CABIN_OPT,
  }),
];

export function getModel(slug: string): Model | undefined {
  return models.find((mm) => mm.slug === slug);
}

export function getSeriesModels(seriesSlug: string): Model[] {
  return models.filter((mm) => mm.seriesSlug === seriesSlug);
}

export function getSeries(seriesSlug: string): Series | undefined {
  return series.find((s) => s.slug === seriesSlug);
}
