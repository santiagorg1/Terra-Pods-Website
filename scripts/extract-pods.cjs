// Build-time extractor for catalog assets.
//
//  – Pod 3D rendering (top-left of each catalog page) → /public/pods/<slug>.png
//      with a luminance-keyed alpha so the pod can glow on dark scenes.
//  – Interior photos (bottom strip of each catalog page) → /public/pods/<slug>-interior-N.jpg
//      auto-detected via column-scan for white gaps and trimmed to tight bounds.

const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

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

const POD_CROP = { left: 0, top: 100, width: 1050, height: 600 };
const FULL_TRANSPARENT = 244;
const SOFT_TRANSPARENT = 210;

// Bottom strip where interior photos live (after the floor-plan thumbnail).
// Height clipped before the "*Remarks…" disclaimer line at y ≈ 2370.
const STRIP = { left: 900, top: 1850, width: 2310, height: 515 };

const OUT_DIR = path.join(__dirname, "..", "public", "pods");

// ─── Pod render ─────────────────────────────────────────────────────────────

async function processPodRender({ n, slug }) {
  const src = path.join(
    __dirname,
    "..",
    "public",
    `TERRA PODS CATALOG 2028-images-${n}.jpg`,
  );
  const out = path.join(OUT_DIR, `${slug}.png`);

  const cropped = await sharp(src)
    .extract(POD_CROP)
    .resize({ width: 2000, withoutEnlargement: true, kernel: "lanczos3" })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data, info } = cropped;
  const channels = info.channels;
  const total = info.width * info.height;

  for (let i = 0; i < total; i++) {
    const o = i * channels;
    const r = data[o];
    const g = data[o + 1];
    const b = data[o + 2];
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    if (lum >= FULL_TRANSPARENT) {
      data[o + 3] = 0;
    } else if (lum >= SOFT_TRANSPARENT) {
      const t =
        (lum - SOFT_TRANSPARENT) / (FULL_TRANSPARENT - SOFT_TRANSPARENT);
      data[o + 3] = Math.round(255 * (1 - t));
    }
  }

  const buf = await sharp(data, { raw: info })
    .png({ compressionLevel: 9 })
    .toBuffer();

  await sharp(buf)
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 0 })
    .png({ compressionLevel: 9 })
    .toFile(out);

  return out;
}

// ─── Interior photos (auto-detected) ────────────────────────────────────────

// Column-scan the bottom strip and return run-length groups of non-white
// columns. Each group corresponds to one interior photo.
async function detectInteriorBounds(srcPath) {
  const { data, info } = await sharp(srcPath)
    .extract(STRIP)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const W = info.width;
  const H = info.height;
  const ch = info.channels;

  // For each column, decide if it's "mostly white" by sampling ~80 rows.
  const SAMPLE_ROWS = 80;
  const stride = Math.max(1, Math.floor(H / SAMPLE_ROWS));
  const colIsWhite = new Array(W);
  for (let x = 0; x < W; x++) {
    let whiteCount = 0;
    let total = 0;
    for (let y = 0; y < H; y += stride) {
      const o = (y * W + x) * ch;
      const r = data[o];
      const g = data[o + 1];
      const b = data[o + 2];
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      if (lum > 240) whiteCount++;
      total++;
    }
    colIsWhite[x] = whiteCount / total > 0.88;
  }

  // Group runs of non-white columns; ignore narrow ones.
  const MIN_PHOTO_W = 240;
  const photos = [];
  let inPhoto = false;
  let photoStart = 0;
  for (let x = 0; x <= W; x++) {
    const isWhite = x < W ? colIsWhite[x] : true;
    if (!isWhite && !inPhoto) {
      inPhoto = true;
      photoStart = x;
    } else if (isWhite && inPhoto) {
      const w = x - photoStart;
      if (w >= MIN_PHOTO_W) {
        photos.push({
          left: STRIP.left + photoStart,
          top: STRIP.top,
          width: w,
          height: STRIP.height,
        });
      }
      inPhoto = false;
    }
  }
  return photos;
}

async function processInteriors({ n, slug }) {
  const src = path.join(
    __dirname,
    "..",
    "public",
    `TERRA PODS CATALOG 2028-images-${n}.jpg`,
  );

  const bounds = await detectInteriorBounds(src);
  if (bounds.length === 0) return [];

  // Clean up existing interior files for this slug to avoid stale residue
  for (const f of fs.readdirSync(OUT_DIR)) {
    if (f.startsWith(`${slug}-interior-`)) {
      fs.unlinkSync(path.join(OUT_DIR, f));
    }
  }

  const written = [];
  for (let i = 0; i < bounds.length && i < 4; i++) {
    const b = bounds[i];
    // Detect tight vertical bounds for this photo: scan rows and crop to the
    // contiguous non-white region.
    const tight = await tightenVertical(src, b);
    const out = path.join(OUT_DIR, `${slug}-interior-${i + 1}.jpg`);
    await sharp(src)
      .extract(tight)
      .resize({ width: 2400, withoutEnlargement: true, kernel: "lanczos3" })
      .sharpen({ sigma: 0.5, m1: 0.5, m2: 0.5 })
      .jpeg({ quality: 92, mozjpeg: true, chromaSubsampling: "4:4:4" })
      .toFile(out);
    written.push(out);
  }
  return written;
}

// Given a horizontal bounding box, scan rows and find the tight vertical
// extent of the non-white content inside it.
async function tightenVertical(srcPath, box) {
  const { data, info } = await sharp(srcPath)
    .extract(box)
    .raw()
    .toBuffer({ resolveWithObject: true });
  const W = info.width;
  const H = info.height;
  const ch = info.channels;

  const rowIsWhite = new Array(H);
  for (let y = 0; y < H; y++) {
    let whiteCount = 0;
    let total = 0;
    for (let x = 0; x < W; x += 8) {
      const o = (y * W + x) * ch;
      const lum = 0.299 * data[o] + 0.587 * data[o + 1] + 0.114 * data[o + 2];
      if (lum > 240) whiteCount++;
      total++;
    }
    rowIsWhite[y] = whiteCount / total > 0.85;
  }

  let top = 0;
  while (top < H && rowIsWhite[top]) top++;
  let bottom = H - 1;
  while (bottom > top && rowIsWhite[bottom]) bottom--;

  const newHeight = Math.max(1, bottom - top + 1);
  return {
    left: box.left,
    top: box.top + top,
    width: box.width,
    height: newHeight,
  };
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  for (const item of SOURCES) {
    try {
      await processPodRender(item);
      const interiors = await processInteriors(item);
      console.log(
        `✓ ${item.slug.padEnd(8)} – pod render + ${interiors.length} interior photo${interiors.length === 1 ? "" : "s"}`,
      );
    } catch (err) {
      console.error(`✗ ${item.slug}:`, err.message);
    }
  }
}

main();
