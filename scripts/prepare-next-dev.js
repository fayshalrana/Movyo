const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TARGETS = [
  path.join(ROOT, ".next", "dev"),
  path.join(ROOT, ".next", "cache"),
];

for (const target of TARGETS) {
  fs.rmSync(target, {
    recursive: true,
    force: true,
    maxRetries: 6,
    retryDelay: 200,
  });
}

console.log("Cleared .next/dev and .next/cache for a clean Turbopack start.");
