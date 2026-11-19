import { readdirSync, readFileSync, renameSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, acc);
    else acc.push(path);
  }
  return acc;
}

const root = join(process.cwd(), "out");
for (const file of walk(root)) {
  if (file.endsWith("/opengraph-image")) renameSync(file, `${file}.png`);
}

for (const file of walk(root)) {
  if (!file.endsWith(".html") && !file.endsWith(".txt")) continue;
  const text = readFileSync(file, "utf8");
  const next = text.replace(/opengraph-image\?[a-z0-9]+/g, "opengraph-image.png");
  if (next !== text) writeFileSync(file, next);
}
