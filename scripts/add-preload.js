const fs = require("fs");
const path = require("path");

const NEXT_DIR = path.join(process.cwd(), ".next");
const SERVER_APP_DIR = path.join(NEXT_DIR, "server", "app");
const STANDALONE_APP_DIR = path.join(NEXT_DIR, "standalone", ".next", "server", "app");
const MEDIA_DIR = path.join(NEXT_DIR, "static", "media");
const HTML_DIRS = [SERVER_APP_DIR, STANDALONE_APP_DIR];

/** Route directory name → filename substrings for LCP-critical media only. */
const ROUTE_CRITICAL_PATTERNS = {
  home: [/mobile-charing/i, /pricing-vial-semaglutide/i, /logo-mobile/i],
};

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

function findMediaUrls(patterns) {
  if (!fs.existsSync(MEDIA_DIR) || !patterns?.length) return [];
  const matches = fs
    .readdirSync(MEDIA_DIR)
    .filter((filename) => patterns.some((pattern) => pattern.test(filename)))
    .map((filename) => `/_next/static/media/${filename}`);
  // One high-priority preload — extra preloads compete with the real LCP candidate.
  return matches.slice(0, 1);
}

function resolveRouteKey(htmlPath, appDir) {
  const relative = path.relative(appDir, htmlPath);
  if (relative === "index.html") return "home";
  return null;
}

function buildPreloadTags(urls) {
  return urls
    .map(
      (url) =>
        `<link rel="preload" as="image" href="${url}" fetchpriority="high" />`,
    )
    .join("\n");
}

function injectPreloads(content, preloadTags) {
  if (!preloadTags || content.includes(preloadTags)) return content;
  if (content.includes("<head>")) {
    return content.replace("<head>", `<head>\n${preloadTags}`);
  }
  return content;
}

const htmlFiles = HTML_DIRS.flatMap((dir) => getAllHtmlFiles(dir));
let updatedCount = 0;

htmlFiles.forEach((htmlPath) => {
  const appDir = HTML_DIRS.find((dir) => htmlPath.startsWith(dir));
  if (!appDir) return;
  const routeKey = resolveRouteKey(htmlPath, appDir);
  if (!routeKey) return;

  const patterns = ROUTE_CRITICAL_PATTERNS[routeKey];
  const mediaUrls = findMediaUrls(patterns);
  if (mediaUrls.length === 0) return;

  const preloadTags = buildPreloadTags(mediaUrls);
  const original = fs.readFileSync(htmlPath, "utf8");
  const updated = injectPreloads(original, preloadTags);

  if (updated !== original) {
    fs.writeFileSync(htmlPath, updated);
    updatedCount += 1;
    console.log(
      `Injected ${mediaUrls.length} preload tag(s) into ${path.relative(process.cwd(), htmlPath)}`,
    );
  }
});

console.log(`add-preload: updated ${updatedCount} HTML file(s).`);
