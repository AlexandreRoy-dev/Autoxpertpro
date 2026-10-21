import { access, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const outDir = path.resolve("out");

try {
  await access(outDir);
} catch {
  console.log("no out/ directory, skipping html lang");
  process.exit(0);
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else if (entry.name.endsWith(".html")) files.push(full);
  }
  return files;
}

const files = await walk(outDir);
let updated = 0;

for (const file of files) {
  const relative = path.relative(outDir, file);
  const lang = relative === "en" || relative.startsWith(`en${path.sep}`) ? "en-CA" : "fr-CA";
  const html = await readFile(file, "utf8");
  const next = html.replace(/<html(?![^>]*\blang=)([^>]*)>/, `<html lang="${lang}"$1>`).replace(
    /<html\s+lang="[^"]*"/,
    `<html lang="${lang}"`,
  );
  if (next !== html) {
    await writeFile(file, next);
    updated += 1;
  }
}

console.log(`set html lang on ${updated} files`);
