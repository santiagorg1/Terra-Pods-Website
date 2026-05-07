export type InventoryUnit = {
  id: string;
  series: string;
  badge: string;
  size: string;
  bedrooms: string;
  price: number;
  shipDays: number;
  features: string[];
  image: string;
  status: "available" | "reserved" | "in-transit";
};

export const inventory: InventoryUnit[] = [
  {
    id: "DR-A9-001",
    series: "A9 · Flagship",
    badge: "On the yard",
    size: "27.2 m²",
    bedrooms: "1 BR + balcony",
    price: 67800,
    shipDays: 5,
    features: [
      "Panoramic balcony",
      "Full kitchen + bar counter",
      "Heated floors",
      "Marble bath",
    ],
    image: "/images/pod-1-exterior.jpg",
    status: "available",
  },
  {
    id: "DR-AE31-002",
    series: "AE31 · Flagship",
    badge: "Showroom unit",
    size: "31 m²",
    bedrooms: "1 BR + study",
    price: 84500,
    shipDays: 7,
    features: [
      "Elevated steel chassis",
      "Floor-to-ceiling glass",
      "Smart voice control",
      "Skylight ceiling",
    ],
    image: "/images/pod-2-elevated.jpg",
    status: "available",
  },
  {
    id: "DR-W9-003",
    series: "W9 · Flagship",
    badge: "Configured",
    size: "40 m²",
    bedrooms: "2 BR · long format",
    price: 119500,
    shipDays: 10,
    features: [
      "Continuous glass facade",
      "Full kitchen + projector",
      "Solar package installed",
      "All-weather rated",
    ],
    image: "/images/pod-4-modular.jpg",
    status: "available",
  },
];

export type CoverageCity = {
  name: string;
  region: "tx" | "sw" | "south" | "mw" | "se" | "ne" | "wc" | "mx";
  // angle in degrees (0 = east, 90 = south), distance 0-1
  angle: number;
  distance: number;
  days: number;
};

export const coverageCities: CoverageCity[] = [
  // Zone 1 (5-7 days) — Texas + immediate
  { name: "Austin, TX", region: "tx", angle: 60, distance: 0.18, days: 4 },
  { name: "Houston, TX", region: "tx", angle: 80, distance: 0.32, days: 5 },
  { name: "San Antonio, TX", region: "tx", angle: 70, distance: 0.12, days: 3 },
  { name: "Dallas, TX", region: "tx", angle: 40, distance: 0.32, days: 5 },

  // Zone 2 (7-10 days) — Southwest + South + Midwest
  { name: "Phoenix, AZ", region: "sw", angle: 270, distance: 0.5, days: 7 },
  { name: "Albuquerque, NM", region: "sw", angle: 305, distance: 0.4, days: 7 },
  { name: "Denver, CO", region: "sw", angle: 320, distance: 0.55, days: 8 },
  { name: "Oklahoma City, OK", region: "mw", angle: 20, distance: 0.4, days: 7 },
  { name: "New Orleans, LA", region: "south", angle: 100, distance: 0.55, days: 8 },
  { name: "Atlanta, GA", region: "se", angle: 75, distance: 0.7, days: 9 },
  { name: "Nashville, TN", region: "se", angle: 50, distance: 0.7, days: 9 },

  // Zone 3 (10-14 days) — Coasts + North
  { name: "Los Angeles, CA", region: "wc", angle: 280, distance: 0.85, days: 10 },
  { name: "San Francisco, CA", region: "wc", angle: 295, distance: 1.0, days: 12 },
  { name: "Seattle, WA", region: "wc", angle: 320, distance: 1.0, days: 13 },
  { name: "Chicago, IL", region: "mw", angle: 30, distance: 0.75, days: 10 },
  { name: "Miami, FL", region: "se", angle: 95, distance: 0.85, days: 12 },
  { name: "New York, NY", region: "ne", angle: 50, distance: 1.0, days: 13 },
  { name: "Boston, MA", region: "ne", angle: 45, distance: 1.05, days: 14 },

  // Mexico
  { name: "Monterrey, MX", region: "mx", angle: 180, distance: 0.25, days: 4 },
  { name: "CDMX", region: "mx", angle: 170, distance: 0.6, days: 8 },
  { name: "Guadalajara, MX", region: "mx", angle: 200, distance: 0.7, days: 9 },
];

export const coverageZones = [
  { range: "3 — 5 days", label: "Texas core", color: "rgba(212,74,38,0.95)" },
  { range: "7 — 10 days", label: "Southwest · South · Midwest", color: "rgba(212,74,38,0.6)" },
  { range: "10 — 14 days", label: "Coasts · North · Deep Mexico", color: "rgba(212,74,38,0.3)" },
];

export type MarketRate = {
  name: string;
  slug: string;
  nightly: number;
  occupancy: number;
};

export const airbnbMarkets: MarketRate[] = [
  { name: "Austin, TX (Hill Country)", slug: "austin", nightly: 215, occupancy: 0.62 },
  { name: "Hill Country / Fredericksburg, TX", slug: "hillcountry", nightly: 245, occupancy: 0.68 },
  { name: "Houston / Galveston, TX", slug: "houston", nightly: 175, occupancy: 0.58 },
  { name: "Joshua Tree / Palm Springs, CA", slug: "joshua", nightly: 285, occupancy: 0.66 },
  { name: "Big Bear / Lake Arrowhead, CA", slug: "bigbear", nightly: 225, occupancy: 0.55 },
  { name: "Sedona / Flagstaff, AZ", slug: "sedona", nightly: 240, occupancy: 0.6 },
  { name: "Asheville, NC", slug: "asheville", nightly: 220, occupancy: 0.64 },
  { name: "Smoky Mountains, TN", slug: "smokies", nightly: 235, occupancy: 0.7 },
  { name: "Florida Keys", slug: "keys", nightly: 320, occupancy: 0.65 },
  { name: "Catskills / Hudson Valley, NY", slug: "catskills", nightly: 260, occupancy: 0.55 },
  { name: "Custom market", slug: "custom", nightly: 200, occupancy: 0.6 },
];
