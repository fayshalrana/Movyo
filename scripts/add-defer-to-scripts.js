const fs = require("fs");
const path = require("path");

const NEXT_DIR = path.join(process.cwd(), ".next");
const SERVER_APP_DIR = path.join(NEXT_DIR, "server", "app");
const STANDALONE_APP_DIR = path.join(NEXT_DIR, "standalone", ".next", "server", "app");
const BUILD_MANIFEST = path.join(NEXT_DIR, "build-manifest.json");

function getPolyfillChunkNames() {
  if (!fs.existsSync(BUILD_MANIFEST)) return [];
  const manifest = JSON.parse(fs.readFileSync(BUILD_MANIFEST, "utf8"));
  return (manifest.polyfillFiles || []).map((file) => path.basename(file));
}

function getAllHtmlFiles(dir, fileList) {
  fileList = fileList || [];
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  files.forEach(function (file) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllHtmlFiles(filePath, fileList);
    } else if (file.endsWith(".html")) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

function stripPolyfillScripts(content, polyfillNames) {
  let next = content;
  polyfillNames.forEach(function (name) {
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    next = next.replace(
      new RegExp(`<script[^>]*src="/_next/static/chunks/${escaped}"[^>]*></script>`, "g"),
      "",
    );
  });
  next = next.replace(
    /<script[^>]*src="\/_next\/static\/chunks\/polyfills-[^"]+"[^>]*><\/script>/g,
    "",
  );
  next = next.replace(/<script[^>]*nomodule=""[^>]*>.*?<\/script>/gi, "");
  next = next.replace(
    /<script[^>]*\bsrc="\/_next\/static\/chunks\/polyfills-[^"]+"[^>]*><\/script>/gi,
    "",
  );
  next = next.replace(
    /<link[^>]+rel="preload"[^>]+as="script"[^>]*>/g,
    "",
  );
  // CSS is inlined — multi-path data-href causes bogus 404 fetches in auditors.
  next = next.replace(/\sdata-href="\/_next\/static\/css\/[^"]*"/g, "");
  // Remove stale polyfill references embedded in RSC flight payloads.
  next = next.replace(/\/_next\/static\/chunks\/polyfills-[^"'\\]+/g, "");
  return next;
}

const polyfillNames = getPolyfillChunkNames();
const htmlDirs = [SERVER_APP_DIR, STANDALONE_APP_DIR];
let patched = 0;

htmlDirs.forEach(function (dir) {
  getAllHtmlFiles(dir).forEach(function (htmlPath) {
    const originalContent = fs.readFileSync(htmlPath, "utf8");
    const content = stripPolyfillScripts(originalContent, polyfillNames);
    if (content !== originalContent) {
      fs.writeFileSync(htmlPath, content);
      patched += 1;
    }
  });
});

if (patched > 0) {
  console.log(`Removed polyfill script tags from ${patched} HTML file(s).`);
}
