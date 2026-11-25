const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const source = path.join(root, "scripts", "git-pre-push.sh");
const hooksDir = path.join(root, ".git", "hooks");
const target = path.join(hooksDir, "pre-push");

if (!fs.existsSync(source)) {
  console.warn("setup-git-hooks: source hook not found, skipping");
  process.exit(0);
}

if (!fs.existsSync(hooksDir)) {
  console.warn("setup-git-hooks: .git/hooks not found, skipping");
  process.exit(0);
}

fs.copyFileSync(source, target);

if (process.platform !== "win32") {
  fs.chmodSync(target, 0o755);
}

console.log("setup-git-hooks: installed pre-push hook");
