const fs = require("fs");

const html = fs.readFileSync(process.argv[2] || "tmp-home-v2.html", "utf8");
const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
const eager = imgs.filter((tag) => /src=/.test(tag) && !/data-movyo-src=/.test(tag));
const deferred = imgs.filter((tag) => /data-movyo-src=/.test(tag));
const eagerUrls = [
  ...new Set(
    eager.map((tag) => {
      const match = tag.match(/src="([^"]+)"/);
      return match ? match[1] : null;
    }).filter(Boolean),
  ),
];

const scripts = [
  ...new Set(
    [...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map((m) => m[1]),
  ),
];

const srcset = [
  ...new Set(
    [...html.matchAll(/srcset="([^"]+)"/g)].flatMap((m) =>
      m[1].split(",").map((s) => s.trim().split(" ")[0]),
    ),
  ),
];

const fonts = [
  ...new Set(
    [...html.matchAll(/url\(([^)]+\.woff2[^)]*)\)/g)].map((m) =>
      m[1].replace(/['"]/g, ""),
    ),
  ),
];

const sfProFonts = fonts.filter((u) => u.includes("sf-pro-display"));
const nextFonts = fonts.filter((u) => u.includes("/_next/static/media/"));

console.log("img tags:", imgs.length);
console.log("eager img tags:", eager.length, "unique urls:", eagerUrls.length);
console.log("deferred img tags:", deferred.length);
console.log("scripts:", scripts.length);
console.log("srcset urls:", srcset);
console.log("font urls in CSS:", fonts.length, "(sf-pro:", sfProFonts.length, ")");
console.log(
  "estimated initial requests:",
  scripts.length + eagerUrls.length + srcset.length + 1,
);
console.log("eager urls:", eagerUrls);
if (sfProFonts.length) console.log("sf-pro fonts (should be 0):", sfProFonts);
