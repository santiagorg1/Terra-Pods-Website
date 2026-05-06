import { createRequire } from "node:module";
const require = createRequire("/opt/node22/lib/node_modules/playwright/");
const { chromium } = require("playwright");
import { mkdir } from "node:fs/promises";

await mkdir("screenshots", { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 240 },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();
await page.goto("http://localhost:3000/contact", { waitUntil: "networkidle" });
await page.waitForTimeout(400);
await page.screenshot({ path: "screenshots/logo-header.png" });

await page.setViewportSize({ width: 1440, height: 600 });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.evaluate(() =>
  window.scrollTo(0, document.body.scrollHeight - window.innerHeight)
);
await page.waitForTimeout(400);
await page.screenshot({ path: "screenshots/logo-footer.png" });

await browser.close();
console.log("done");
