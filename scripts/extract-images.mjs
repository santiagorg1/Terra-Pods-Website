import { readFile, writeFile, mkdir } from "node:fs/promises";
import { Buffer } from "node:buffer";

const path = "/root/.claude/projects/-home-user-Terra-Pods-Website/26dcd089-aa53-4a27-b5f2-7a71385b0adc.jsonl";
const out = "/tmp/extracted-images";
await mkdir(out, { recursive: true });

const text = await readFile(path, "utf8");
const lines = text.split("\n").filter(Boolean);

let count = 0;
for (let i = 0; i < lines.length; i++) {
  let entry;
  try { entry = JSON.parse(lines[i]); } catch { continue; }
  const blocks = collectBlocks(entry);
  for (const b of blocks) {
    if (b?.type === "image" && b.source?.data) {
      const ext =
        b.source.media_type?.includes("jpeg") ? "jpg" :
        b.source.media_type?.includes("png") ? "png" :
        b.source.media_type?.includes("webp") ? "webp" : "bin";
      const buf = Buffer.from(b.source.data, "base64");
      const file = `${out}/img-${String(i).padStart(4, "0")}-${count++}.${ext}`;
      await writeFile(file, buf);
      console.log(`  ${file}  (${(buf.length / 1024).toFixed(0)} KB, line ${i})`);
    }
  }
}

function collectBlocks(node, acc = []) {
  if (!node || typeof node !== "object") return acc;
  if (Array.isArray(node)) {
    for (const v of node) collectBlocks(v, acc);
    return acc;
  }
  if (node.type === "image") acc.push(node);
  for (const k of Object.keys(node)) collectBlocks(node[k], acc);
  return acc;
}

console.log(`extracted ${count} images`);
