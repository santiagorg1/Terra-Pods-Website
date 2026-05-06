import { createRequire } from "node:module";
const require = createRequire("/opt/node22/lib/node_modules/playwright/");
const { chromium } = require("playwright");
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const BASE = process.env.BASE_URL || "http://localhost:3000";
const OUT = resolve("screenshots");
const ROUTES = [
  ["home", "/"],
  ["models", "/models"],
  ["financing", "/financing"],
  ["gallery", "/gallery"],
  ["contact", "/contact"],
];

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
  colorScheme: "dark",
});

for (const [name, path] of ROUTES) {
  const page = await context.newPage();
  const url = `${BASE}${path}`;
  console.log(`→ ${name}: ${url}`);
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });

  // Slow scroll through the entire page to trigger framer-motion whileInView reveals.
  await page.evaluate(async () => {
    const total = document.body.scrollHeight;
    const step = 240;
    for (let y = 0; y <= total; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((r) => setTimeout(r, 600));
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 600));
  });

  // Force-show any elements still hidden by motion's initial state.
  await page.evaluate(() => {
    document
      .querySelectorAll('[style*="opacity: 0"], [style*="opacity:0"]')
      .forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
  });
  await page.waitForTimeout(500);

  await page.screenshot({
    path: `${OUT}/${name}.png`,
    fullPage: true,
    type: "png",
  });
  await page.close();
  console.log(`  ✓ saved screenshots/${name}.png`);
}

await browser.close();
console.log("done");
