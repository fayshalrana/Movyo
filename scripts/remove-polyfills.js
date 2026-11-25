const fs = require("fs");
const path = require("path");

const chunksDir = path.join(process.cwd(), ".next", "static", "chunks");
const standaloneChunksDir = path.join(
  process.cwd(),
  ".next",
  "standalone",
  ".next",
  "static",
  "chunks",
);
const buildManifestPath = path.join(process.cwd(), ".next", "build-manifest.json");

const STUB_SOURCE = "/* modern browsers — polyfills intentionally empty */\n";

function replacePolyfillFiles(dir) {
  if (!fs.existsSync(dir)) return;

  const names = new Set();
  if (fs.existsSync(buildManifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(buildManifestPath, "utf8"));
    (manifest.polyfillFiles || []).forEach((file) => names.add(path.basename(file)));
    manifest.polyfillFiles = [];
    fs.writeFileSync(buildManifestPath, JSON.stringify(manifest, null, 2));
  }

  fs.readdirSync(dir).forEach(function (file) {
    if (!file.startsWith("polyfills-") && !names.has(file)) return;
    const filePath = path.join(dir, file);
    fs.writeFileSync(filePath, STUB_SOURCE);
    console.log("Stubbed polyfill chunk: " + file);
  });
}

replacePolyfillFiles(chunksDir);
replacePolyfillFiles(standaloneChunksDir);
