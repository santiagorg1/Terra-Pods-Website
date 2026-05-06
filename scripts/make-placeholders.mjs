import { createRequire } from "node:module";
const require = createRequire("/opt/node22/lib/node_modules/playwright/");
const { chromium } = require("playwright");
import { writeFile } from "node:fs/promises";

const NAMES = [
  ["pod-1-exterior", "White curved-roof pod"],
  ["pod-2-elevated", "Elevated pod with glass walls"],
  ["pod-3-interior", "Pod interior with cove lighting"],
  ["pod-4-modular", "Long modular pod"],
  ["factory", "Manufacturing floor"],
];

const html = (label) => `<!doctype html><html><body style="margin:0">
<div style="width:1600px;height:1067px;display:flex;align-items:center;justify-content:center;
background:linear-gradient(135deg,#1a1d20 0%,#0a0c0e 100%);font-family:system-ui;color:#6a7178;
flex-direction:column;gap:24px">
  <svg width="160" height="104" viewBox="0 0 200 130" fill="none">
    <rect x="3" y="3" width="194" height="124" rx="32" stroke="#c9a86a" stroke-width="6"/>
    <path d="M40 105 V70 a22 22 0 0 1 44 0 V105" stroke="#c9a86a" stroke-width="6" stroke-linecap="square" fill="none"/>
    <path d="M95 105 V80 h38 V105 Z" fill="#c9a86a"/>
    <line x1="40" y1="105" x2="160" y2="105" stroke="#c9a86a" stroke-width="6" stroke-linecap="square"/>
  </svg>
  <div style="font-size:28px;letter-spacing:6px;color:#9aa1a8">PLACEHOLDER · ${label.toUpperCase()}</div>
  <div style="font-size:14px;letter-spacing:3px;color:#3a4046">REPLACE WITH YOUR PHOTO</div>
</div></body></html>`;

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1600, height: 1067 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
for (const [name, label] of NAMES) {
  await page.setContent(html(label));
  await page.waitForTimeout(80);
  const buf = await page.screenshot({ type: "jpeg", quality: 78 });
  await writeFile(`public/images/${name}.jpg`, buf);
  console.log(`  ✓ public/images/${name}.jpg`);
}
await browser.close();
