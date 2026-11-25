/**
 * Clear Next.js build artifacts that commonly block production builds on Windows.
 * - `.next/dev` from `npm run dev`
 * - `.next/standalone` from a prior `node server.js` / standalone server
 */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ROOT = process.cwd();
const TARGETS = [
  path.join(ROOT, ".next", "dev"),
  path.join(ROOT, ".next", "standalone"),
];

function isWindows() {
  return process.platform === "win32";
}

function portInUse(port) {
  if (!isWindows()) return false;
  try {
    const out = execSync(`netstat -ano | findstr :${port}`, {
      encoding: "utf8",
      stdio: ["pipe", "pipe", "ignore"],
    });
    return /LISTENING/.test(out);
  } catch {
    return false;
  }
}

function clearDir(target) {
  if (!fs.existsSync(target)) return;

  try {
    fs.rmSync(target, {
      recursive: true,
      force: true,
      maxRetries: 8,
      retryDelay: 250,
    });
    console.log(`Removed ${path.relative(ROOT, target)}`);
    return;
  } catch (err) {
    if (err.code !== "EBUSY" && err.code !== "EPERM" && err.code !== "ENOTEMPTY") {
      throw err;
    }
  }

  const backup = `${target}.locked.${Date.now()}`;
  try {
    fs.renameSync(target, backup);
    console.warn(
      `Could not delete ${path.relative(ROOT, target)}; renamed to ${path.basename(backup)}`,
    );
  } catch (renameErr) {
    console.error(`\nFailed to clear ${path.relative(ROOT, target)}: ${renameErr.message}`);
    console.error(
      "Stop local Next.js servers before building:\n" +
        "  - Ctrl+C in the terminal running `npm run dev`\n" +
        "  - any `node .next/standalone/server.js` or `next start` process\n" +
        "Then run `git push` again.\n",
    );
    process.exit(1);
  }
}

const blockedPorts = [3000, 3001, 3002].filter(portInUse);
if (blockedPorts.length > 0) {
  console.error(
    `\nLocal Next.js server port(s) in use: ${blockedPorts.join(", ")}.\n` +
      "Stop `npm run dev` / `next start` / standalone `node server.js` before pushing.\n",
  );
  process.exit(1);
}

for (const target of TARGETS) {
  clearDir(target);
}
