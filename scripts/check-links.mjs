import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = join(process.cwd(), "out");
const base = "/me";
const externalHosts = new Set([
  "github.com",
  "www.github.com",
  "isabelpontes.com.br",
  "www.isabelpontes.com.br",
  "jitpack.io",
  "portfolio-paulo-neon.vercel.app",
]);

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, acc);
    else if (name.endsWith(".html")) acc.push(path);
  }
  return acc;
}

function toFile(urlPath) {
  const rel = urlPath.slice(base.length).replace(/^\//, "");
  if (rel === "") return join(root, "index.html");
  if (rel.endsWith("/")) return join(root, rel, "index.html");
  return join(root, rel);
}

if (!existsSync(root)) {
  console.error("pasta out/ não encontrada. rode npm run build antes.");
  process.exit(1);
}

const pages = walk(root);
const missing = [];
const external = new Set();

for (const file of pages) {
  const html = readFileSync(file, "utf8");
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = match[1];
    if (!url || url.startsWith("#") || url.startsWith("mailto:") || url.startsWith("data:")) continue;
    if (url.startsWith(base)) {
      const pathOnly = url.split("#")[0].split("?")[0];
      const target = toFile(pathOnly);
      if (!existsSync(target)) missing.push(`${file}: ${url}`);
      continue;
    }
    if (url.startsWith("/")) {
      missing.push(`${file}: sem basePath ${url}`);
      continue;
    }
    if (url.startsWith("http://") || url.startsWith("https://")) {
      const host = new URL(url).host;
      if (externalHosts.has(host)) external.add(url.split("#")[0]);
    }
  }
}

const failures = [...missing];
const checks = await Promise.all(
  [...external].map(async (url) => {
    try {
      const response = await fetch(url, {
        redirect: "follow",
        headers: { "user-agent": "joao-dev-link-check" },
      });
      if (response.status === 404 || response.status === 410) return `${response.status} ${url}`;
      return null;
    } catch (error) {
      return `falha ${url} (${error instanceof Error ? error.message : "erro"})`;
    }
  }),
);
for (const item of checks) if (item) failures.push(item);

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`ok: ${pages.length} páginas, ${external.size} links externos`);
