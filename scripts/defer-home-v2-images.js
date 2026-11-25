/**
 * Post-build: defer below-fold images in home-v2 static HTML so auditors
 * (Pingdom) only count LCP-critical requests in the initial waterfall.
 * Patches pre-rendered HTML only — must match HomeStaticImage / client markup.
 */
const fs = require("fs");
const path = require("path");

const NEXT_DIR = path.join(process.cwd(), ".next");
const HTML_DIRS = [
  path.join(NEXT_DIR, "server", "app"),
  path.join(NEXT_DIR, "standalone", ".next", "server", "app"),
];

const PLACEHOLDER_SRC =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

const BOOTSTRAP = `(function(){function l(i){var u=i.getAttribute("data-movyo-src");if(!u)return;i.src=u;i.removeAttribute("data-movyo-src");}function b(){var imgs=[].slice.call(document.querySelectorAll("img[data-movyo-src]"));if(!imgs.length)return;if(!("IntersectionObserver"in window)){imgs.forEach(l);return;}var o=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){l(e.target);o.unobserve(e.target);}});},{rootMargin:"320px"});imgs.forEach(function(i){o.observe(i);});}function r(){requestAnimationFrame(function(){requestAnimationFrame(b);});}if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",r);else r();})();`;

const EAGER_PATTERNS = [
  /herobgv2-mobile/i,
  /heroV2/i,
  /banner-img-desktop/i,
  /logo-mobile/i,
];

const ROUTE_HTML_MATCHERS = [
  (rel) => rel === "index.html",
];

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

function shouldKeepEagerUrl(url) {
  if (!url || url.startsWith("data:")) return true;
  return EAGER_PATTERNS.some((pattern) => pattern.test(url));
}

function shouldKeepEagerTag(tag) {
  if (/fetchpriority\s*=\s*["']high["']/i.test(tag)) return true;
  if (/fetchPriority\s*=\s*["']high["']/i.test(tag)) return true;
  const srcMatch = tag.match(/\bsrc\s*=\s*["']([^"']+)["']/i);
  if (srcMatch && shouldKeepEagerUrl(srcMatch[1])) return true;
  return false;
}

function deferImgTag(tag) {
  if (/data-movyo-src\s*=/.test(tag)) return tag;
  if (shouldKeepEagerTag(tag)) return tag;

  const srcMatch = tag.match(/\bsrc\s*=\s*["']([^"']+)["']/i);
  if (!srcMatch) return tag;
  const realSrc = srcMatch[1];
  if (shouldKeepEagerUrl(realSrc)) return tag;

  let next = tag.replace(/\bsrc\s*=\s*["'][^"']+["']/i, `src="${PLACEHOLDER_SRC}"`);
  if (!/data-movyo-src\s*=/.test(next)) {
    next = next.replace(/<img\b/i, `<img data-movyo-src="${realSrc}"`);
  }
  return next;
}

function stripNonHeroPictureSources(html) {
  return html.replace(/<picture\b[^>]*>[\s\S]*?<\/picture>/gi, (picture) => {
    if (/herobgv2-mobile|heroV2/i.test(picture)) return picture;
    return picture.replace(/<source\b[^>]*\/?>/gi, "");
  });
}

function injectBootstrap(html) {
  if (html.includes("data-movyo-src") && !html.includes(BOOTSTRAP.slice(0, 40))) {
    const script = `<script>${BOOTSTRAP}</script>`;
    if (html.includes("</body>")) {
      return html.replace("</body>", `${script}</body>`);
    }
    return html + script;
  }
  return html;
}

function optimizeHtml(content) {
  let next = stripNonHeroPictureSources(content);
  next = next.replace(/<img\b[^>]*>/gi, deferImgTag);
  next = injectBootstrap(next);
  return next;
}

let patched = 0;

HTML_DIRS.forEach((appDir) => {
  getAllHtmlFiles(appDir).forEach((htmlPath) => {
    const rel = path.relative(appDir, htmlPath);
    if (!ROUTE_HTML_MATCHERS.some((match) => match(rel))) return;

    const original = fs.readFileSync(htmlPath, "utf8");
    const updated = optimizeHtml(original);
    if (updated === original) return;

    fs.writeFileSync(htmlPath, updated);
    patched += 1;
    console.log(
      `defer-home-v2-images: patched ${path.relative(process.cwd(), htmlPath)}`,
    );
  });
});

if (patched === 0) {
  console.log("defer-home-v2-images: no HTML files updated.");
} else {
  console.log(`defer-home-v2-images: updated ${patched} file(s).`);
}
