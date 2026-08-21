#!/usr/bin/env node
// nogeneric token checker — zero dependencies.
//
// Usage:
//   node scripts/check.mjs file.html [more files...] [--allow 6,10]
//
// Checks (per SKILL.md Phase 4):
//   1. No raw hex colors outside :root blocks
//   2. No px values outside the locked scales (spacing/type/radius/borders)
//   3. No more than 2 Google Fonts families loaded
//
// Exit code 1 if any check fails.

import { readFileSync } from "node:fs";

const BASE_ALLOWED_PX = new Set([
  0, 1, 2, 3, 4, // borders, hairlines, small radii
  8, 12, 16, 24, 40, 64, // spacing scale
  14, 20, 25, 31, 39, // type scale (12/16 already present)
  6, 10, // common radius steps used by directions
]);

const args = process.argv.slice(2);
const files = [];
const allowed = new Set(BASE_ALLOWED_PX);

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--allow") {
    for (const v of (args[++i] || "").split(",")) {
      if (v.trim() !== "") allowed.add(Number(v));
    }
  } else {
    files.push(args[i]);
  }
}

if (files.length === 0) {
  console.error("usage: node scripts/check.mjs <file...> [--allow 6,10]");
  process.exit(2);
}

let errors = 0;
const report = (file, line, msg) => {
  errors++;
  console.log(`${file}:${line}  ${msg}`);
};

// Return [start, end] index ranges of token blocks: :root { ... },
// .theme-* { ... }, or [data-theme] { ... } (for scoped/multi-theme apps).
function rootRanges(text) {
  const ranges = [];
  const re = /(?::root\b|\.theme-[\w-]+|\[data-theme[^\]]*\])[^{;]*\{/g;
  let m;
  while ((m = re.exec(text))) {
    let depth = 1;
    let i = m.index + m[0].length;
    while (i < text.length && depth > 0) {
      if (text[i] === "{") depth++;
      else if (text[i] === "}") depth--;
      i++;
    }
    ranges.push([m.index, i]);
  }
  return ranges;
}

// Blank out @media preludes and CSS/HTML/JS comments so their contents
// are not flagged, while preserving offsets and line numbers.
function maskIgnored(text) {
  const blank = (s) => s.replace(/[^\n]/g, " ");
  return text
    .replace(/@media[^{]*/g, blank)
    .replace(/\/\*[\s\S]*?\*\//g, blank)
    .replace(/<!--[\s\S]*?-->/g, blank);
}

const lineOf = (text, index) => text.slice(0, index).split("\n").length;

for (const file of files) {
  let raw;
  try {
    raw = readFileSync(file, "utf8");
  } catch (e) {
    report(file, 0, `cannot read file: ${e.message}`);
    continue;
  }

  const roots = rootRanges(raw);
  const inRoot = (i) => roots.some(([a, b]) => i >= a && i < b);
  const masked = maskIgnored(raw);

  // 1. Raw hex outside :root
  const hexRe = /#[0-9a-fA-F]{3,8}\b/g;
  let m;
  while ((m = hexRe.exec(masked))) {
    const len = m[0].length - 1;
    if (![3, 4, 6, 8].includes(len)) continue; // not a color (e.g. anchor id)
    if (!inRoot(m.index)) {
      report(file, lineOf(raw, m.index), `raw hex ${m[0]} outside :root — use var(--...)`);
    }
  }

  // 2. px values off the locked scales (outside :root; :root defines them)
  const pxRe = /(-?\d+(?:\.\d+)?)px\b/g;
  while ((m = pxRe.exec(masked))) {
    if (inRoot(m.index)) continue;
    const n = Math.abs(Number(m[1]));
    if (!allowed.has(n)) {
      report(file, lineOf(raw, m.index), `off-scale value ${m[0]} — use a token or --allow ${n}`);
    }
  }

  // 3. Max 2 Google Fonts families
  const links = masked.match(/fonts\.googleapis\.com\/css2[^"'\s>]*/g) || [];
  const families = links.flatMap((u) => u.match(/family=/g) || []);
  if (families.length > 2) {
    const idx = masked.indexOf("fonts.googleapis.com");
    report(file, lineOf(raw, idx), `${families.length} font families loaded — max is 2`);
  }
}

if (errors) {
  console.log(`\n${errors} problem${errors === 1 ? "" : "s"} found.`);
  process.exit(1);
} else {
  console.log("All checks passed — no raw hex, no off-scale px, fonts within limit.");
}
