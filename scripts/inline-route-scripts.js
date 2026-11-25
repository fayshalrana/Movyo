/**
 * Inline external Next.js chunk scripts into pre-rendered HTML to cut HTTP requests.
 * Scoped to marketing routes by default (home-v2) so large app bundles stay external.
 *
 * DISABLED in package.json build: webpack chunks embed HTML/script strings containing
 * literal `</script>` which breaks inline <script> tags and causes SyntaxError on load.
 */
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

const MAX_INLINE_BYTES = 900 * 1024;

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

function escapeForInlineScript(source) {
  return source.replace(/<\/script/gi, "<\\/script");
}

function inlineExternalScripts(content) {
  const scriptRegex =
    /<script\b([^>]*)\bsrc="(\/_next\/static\/chunks\/[^"]+)"([^>]*)><\/script>/gi;

  const matches = [...content.matchAll(scriptRegex)];
  if (matches.length === 0) return { content, inlined: 0, bytes: 0 };

  let totalBytes = 0;
  const replacements = [];

  for (const match of matches) {
    const chunkContent = readChunk(match[2]);
    if (!chunkContent) continue;
    totalBytes += Buffer.byteLength(chunkContent, "utf8");
    replacements.push({
      from: match[0],
      to: `<script defer>${escapeForInlineScript(chunkContent)}</script>`,
    });
  }

  if (totalBytes > MAX_INLINE_BYTES) {
    console.warn(
      `inline-route-scripts: skipped — ${Math.round(totalBytes / 1024)}KB exceeds ${Math.round(MAX_INLINE_BYTES / 1024)}KB cap`,
    );
    return { content, inlined: 0, bytes: 0 };
  }

  let next = content;
  replacements.forEach(({ from, to }) => {
    next = next.replace(from, to);
  });

  return { content: next, inlined: replacements.length, bytes: totalBytes };
}

let optimizedFiles = 0;
let inlinedScripts = 0;

HTML_DIRS.forEach((appDir) => {
  getAllHtmlFiles(appDir).forEach((htmlPath) => {
    if (!shouldOptimize(htmlPath, appDir)) return;

    const original = fs.readFileSync(htmlPath, "utf8");
    const { content, inlined, bytes } = inlineExternalScripts(original);
    if (inlined === 0 || content === original) return;

    fs.writeFileSync(htmlPath, content);
    optimizedFiles += 1;
    inlinedScripts += inlined;
    console.log(
      `Inlined ${inlined} script(s) (~${Math.round(bytes / 1024)}KB) in ${path.relative(process.cwd(), htmlPath)}`,
    );
  });
});

if (optimizedFiles === 0) {
  console.log("inline-route-scripts: no HTML files updated.");
} else {
  console.log(
    `inline-route-scripts: updated ${optimizedFiles} file(s), ${inlinedScripts} script tag(s) inlined.`,
  );
}
