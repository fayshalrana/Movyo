const fs = require("fs");
const path = require("path");

const COMPRESSION_OPTIONS = "{ threshold: 128, level: 6 }";
const PATCHED_MARKER = "threshold: 128";
const SEARCH_ROOTS = [
  path.join(process.cwd(), ".next", "standalone"),
  path.join(process.cwd(), ".next"),
  process.cwd(),
];

function findRouterServerFiles(rootDir) {
  const results = [];
  const directPath = path.join(
    rootDir,
    "node_modules",
    "next",
    "dist",
    "server",
    "lib",
    "router-server.js",
  );

  if (fs.existsSync(directPath)) {
    results.push(directPath);
  }

  const pnpmDir = path.join(rootDir, "node_modules", ".pnpm");
  if (!fs.existsSync(pnpmDir)) {
    return results;
  }

  for (const entry of fs.readdirSync(pnpmDir)) {
    if (!entry.startsWith("next@")) {
      continue;
    }

    const candidate = path.join(
      pnpmDir,
      entry,
      "node_modules",
      "next",
      "dist",
      "server",
      "lib",
      "router-server.js",
    );

    if (fs.existsSync(candidate) && !results.includes(candidate)) {
      results.push(candidate);
    }
  }

  return results;
}

function patchFile(filePath) {
  const original = fs.readFileSync(filePath, "utf8");

  if (original.includes(PATCHED_MARKER)) {
    console.log(`Already patched: ${filePath}`);
    return true;
  }

  const patched = original.replace(
    /\(0,\s*_compression\.default\)\(\s*\)/g,
    `(0, _compression.default)(${COMPRESSION_OPTIONS})`,
  );

  if (patched === original) {
    console.warn(`No compression hook found: ${filePath}`);
    return false;
  }

  fs.writeFileSync(filePath, patched);
  console.log(`Patched compression threshold: ${filePath}`);
  return true;
}

let patchedCount = 0;
let skippedCount = 0;
let failedCount = 0;

for (const root of SEARCH_ROOTS) {
  if (!fs.existsSync(root)) {
    continue;
  }

  for (const filePath of findRouterServerFiles(root)) {
    const original = fs.readFileSync(filePath, "utf8");

    if (original.includes(PATCHED_MARKER)) {
      skippedCount += 1;
      console.log(`Already patched: ${filePath}`);
      continue;
    }

    if (patchFile(filePath)) {
      patchedCount += 1;
    } else {
      failedCount += 1;
    }
  }
}

if (patchedCount === 0 && skippedCount === 0) {
  console.error("Failed to patch Next.js compression threshold.");
  process.exit(1);
}

console.log(
  `Compression threshold ready (${patchedCount} patched, ${skippedCount} already patched).`,
);
