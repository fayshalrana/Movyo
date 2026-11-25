/**
 * Merge home-v2 route chunks into one external bundle (one script HTTP request).
 * Avoids base64+eval — webpack chunks must run as normal script files, not eval'd.
 */
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const NEXT_DIR = path.join(process.cwd(), ".next");
const STATIC_CHUNKS_DIR = path.join(NEXT_DIR, "static", "chunks");
const HTML_DIRS = [
  path.join(NEXT_DIR, "server", "app"),
  path.join(NEXT_DIR, "standalone", ".next", "server", "app"),
];

/** Relative paths under server/app to optimize (basename or nested path). */
const ROUTE_HTML_MATCHERS = [
  (rel) => rel === "index.html",
];

const SCRIPT_SRC_RE =
  /<script\b([^>]*)\bsrc="(\/_next\/static\/chunks\/[^"]+)"([^>]*)><\/script>/gi;

const MAX_MERGED_BYTES = 900 * 1024;

function getAllHtmlFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllHtmlFiles(filePath, fileList);
    } else if (file.endsWith(".html")) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

function shouldOptimize(htmlPath, appDir) {
  const rel = path.relative(appDir, htmlPath);
  return ROUTE_HTML_MATCHERS.some((match) => match(rel));
}

function readChunk(chunkSrc) {
  const relative = chunkSrc.replace(/^\/_next\/static\/chunks\//, "");
  const fullPath = path.join(STATIC_CHUNKS_DIR, relative);
  if (!fs.existsSync(fullPath)) return null;
  return fs.readFileSync(fullPath, "utf8");
}

function writeMergedBundle(mergedSource) {
  const hash = crypto
    .createHash("sha256")
    .update(mergedSource)
    .digest("hex")
    .slice(0, 10);
  const filename = `home-v2.merged.${hash}.js`;
  const outPath = path.join(STATIC_CHUNKS_DIR, filename);
  fs.writeFileSync(outPath, mergedSource);
  return `/_next/static/chunks/${filename}`;
}

function mergeRouteScripts(content) {
  const matches = [...content.matchAll(SCRIPT_SRC_RE)];
  if (matches.length === 0) {
    return { content, merged: 0, bytes: 0, bundleUrl: null };
  }

  const parts = [];
  for (const match of matches) {
    const chunkContent = readChunk(match[2]);
    if (!chunkContent) {
      console.warn(`merge-route-scripts: missing chunk ${match[2]}, skipping`);
      return { content, merged: 0, bytes: 0, bundleUrl: null };
    }
    parts.push(chunkContent);
  }

  const mergedSource = parts.join(";\n");
  const bytes = Buffer.byteLength(mergedSource, "utf8");
  if (bytes > MAX_MERGED_BYTES) {
    console.warn(
      `merge-route-scripts: skipped — ${Math.round(bytes / 1024)}KB exceeds ${Math.round(MAX_MERGED_BYTES / 1024)}KB cap`,
    );
    return { content, merged: 0, bytes: 0, bundleUrl: null };
  }

  const bundleUrl = writeMergedBundle(mergedSource);
  const mergedTag = `<script src="${bundleUrl}" defer></script>`;

  let next = content;
  next = next.replace(matches[0][0], mergedTag);
  for (let i = 1; i < matches.length; i += 1) {
    next = next.replace(matches[i][0], "");
  }

  return { content: next, merged: matches.length, bytes, bundleUrl };
}

let optimizedFiles = 0;
let mergedScripts = 0;

HTML_DIRS.forEach((appDir) => {
  getAllHtmlFiles(appDir).forEach((htmlPath) => {
    if (!shouldOptimize(htmlPath, appDir)) return;

    const original = fs.readFileSync(htmlPath, "utf8");
    const { content, merged, bytes, bundleUrl } = mergeRouteScripts(original);
    if (merged === 0 || content === original) return;

    fs.writeFileSync(htmlPath, content);
    optimizedFiles += 1;
    mergedScripts += merged;
    console.log(
      `Merged ${merged} script(s) (~${Math.round(bytes / 1024)}KB) → ${bundleUrl} in ${path.relative(process.cwd(), htmlPath)}`,
    );
  });
});

if (optimizedFiles === 0) {
  console.log("merge-route-scripts: no HTML files updated.");
} else {
  console.log(
    `merge-route-scripts: updated ${optimizedFiles} file(s), ${mergedScripts} external script tag(s) replaced.`,
  );
}
