// Build-time extractor for pod renders.
// Crops the pod 3D rendering region from each catalog page, trims white borders,
// and writes a transparent PNG to /public/pods/<slug>.png. Chroma-key the
// near-white background to transparent so the silhouette can glow on dark.

const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

// Catalog index → model slug
const SOURCES = [
  { n: 1, slug: "a3" },
  { n: 2, slug: "a5" },
  { n: 3, slug: "a7" },
  { n: 4, slug: "a9" },
  { n: 5, slug: "f7" },
  { n: 6, slug: "h5" },
  { n: 7, slug: "r5" },
  { n: 8, slug: "r7" },
  { n: 9, slug: "p5" },
  { n: 10, slug: "p7" },
  { n: 11, slug: "z5" },
  { n: 12, slug: "z7" },
  { n: 13, slug: "e3-ii" },
  { n: 14, slug: "e5-ii" },
  { n: 15, slug: "e6-ii" },
  { n: 16, slug: "e7-ii" },
  { n: 17, slug: "w3" },
  { n: 18, slug: "w6" },
  { n: 19, slug: "w9" },
  { n: 20, slug: "a7s" },
  { n: 21, slug: "a9d" },
  { n: 22, slug: "ae23-a" },
  { n: 23, slug: "ae31-a" },
  { n: 24, slug: "ae31-b" },
  { n: 25, slug: "ae40-a" },
  { n: 26, slug: "ae40-b" },
];

// The pod render sits in the top-left region of every catalog page.
const CROP = { left: 0, top: 100, width: 1050, height: 600 };
const OUT_DIR = path.join(__dirname, "..", "public", "pods");

// Chroma-key threshold: pixels brighter than this are made transparent.
// Soft falloff between FULL and SOFT for anti-aliased edges.
const FULL_TRANSPARENT = 244;
const SOFT_TRANSPARENT = 210;

async function processOne({ n, slug }) {
  const src = path.join(
    __dirname,
    "..",
    "public",
    `TERRA PODS CATALOG 2028-images-${n}.jpg`,
  );
  const out = path.join(OUT_DIR, `${slug}.png`);

  // First crop the upper-left region.
  const cropped = await sharp(src)
    .extract(CROP)
    .resize({ width: 1400, withoutEnlargement: true, kernel: "lanczos3" })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data, info } = cropped;
  const { width, height, channels } = info;

  // Chroma-key: near-white pixels → transparent. Soft falloff for AA edges.
  for (let i = 0; i < width * height; i++) {
    const o = i * channels;
    const r = data[o];
    const g = data[o + 1];
    const b = data[o + 2];
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;

    if (lum >= FULL_TRANSPARENT) {
      data[o + 3] = 0;
    } else if (lum >= SOFT_TRANSPARENT) {
      // Linear falloff between SOFT and FULL.
      const t = (lum - SOFT_TRANSPARENT) / (FULL_TRANSPARENT - SOFT_TRANSPARENT);
      data[o + 3] = Math.round(255 * (1 - t));
    }
  }

  // Trim transparent borders.
  const flushed = await sharp(data, { raw: info })
    .png({ compressionLevel: 9 })
    .toBuffer();

  await sharp(flushed)
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 0 })
    .png({ compressionLevel: 9 })
    .toFile(out);

  return out;
}

async function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  for (const item of SOURCES) {
    try {
      const out = await processOne(item);
      const stats = fs.statSync(out);
      console.log(
        `✓ ${item.slug.padEnd(8)} → ${path.relative(process.cwd(), out)} (${(stats.size / 1024).toFixed(0)} kB)`,
      );
    } catch (err) {
      console.error(`✗ ${item.slug}:`, err.message);
    }
  }
}

main();
