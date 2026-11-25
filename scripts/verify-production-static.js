/**
 * Fail the build if production static output is missing or looks like a dev/turbopack build.
 */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const CHUNKS_DIR = path.join(ROOT, ".next", "static", "chunks");
const HOME_HTML = path.join(ROOT, ".next", "server", "app", "index.html");

function fail(message) {
  console.error(`verify-production-static: ${message}`);
  process.exit(1);
}

if (!fs.existsSync(CHUNKS_DIR)) {
  fail("`.next/static/chunks` is missing — standalone deploy will 404 all JS.");
}

const chunkFiles = fs
  .readdirSync(CHUNKS_DIR)
  .filter((name) => name.endsWith(".js"));

if (chunkFiles.length === 0) {
  fail("No JS files in `.next/static/chunks`.");
}

const turbopackChunks = chunkFiles.filter((name) => name.includes("turbopack"));
if (turbopackChunks.length > 0) {
  fail(
    `Found turbopack chunk(s): ${turbopackChunks.join(", ")}. Use \`next build --webpack\` for production.`,
  );
}

if (fs.existsSync(HOME_HTML)) {
  const html = fs.readFileSync(HOME_HTML, "utf8");
  if (/turbopack-[^"']+\.js/.test(html)) {
    fail("index.html references turbopack chunks — not a webpack production build.");
  }
  if (/\(0,eval\)\(atob\(/.test(html)) {
    fail("index.html uses eval(atob()) inline JS — use external merged bundle instead.");
  }

  const scriptSrcs = [...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map(
    (m) => m[1],
  );
  for (const src of scriptSrcs) {
    const file = src.replace(/^\/_next\/static\/chunks\//, "");
    const fullPath = path.join(CHUNKS_DIR, file);
    if (!fs.existsSync(fullPath)) {
      fail(`index.html references missing chunk: ${src}`);
    }
  }

  const eagerImgs = [...html.matchAll(/<img\b[^>]*>/gi)].filter((m) => {
    const src = m[0].match(/\bsrc="([^"]+)"/i)?.[1];
    return src && !src.startsWith("data:");
  });
  if (eagerImgs.length > 3) {
    fail(
      `index.html has ${eagerImgs.length} eager <img src> network URLs (max 3). Run scripts/inspect-html-imgs.js`,
    );
  }

  const nextFontFaces = [
    ...html.matchAll(/@font-face[^}]*\/_next\/static\/media\/[^}]+}/g),
  ];
  if (nextFontFaces.length > 0) {
    fail(
      `index.html inlines ${nextFontFaces.length} next/font @font-face rule(s) — keep Google fonts off the home route.`,
    );
  }
}

console.log(
  `verify-production-static: OK (${chunkFiles.length} chunk file(s) in .next/static/chunks).`,
);
