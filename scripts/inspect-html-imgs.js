const fs = require("fs");
const h = fs.readFileSync(process.argv[2] || ".next/server/app/index.html", "utf8");

const needle = process.argv[3] || "movyo-wordmark";
let i = 0;
for (const m of h.matchAll(new RegExp(needle + "[^\"'\\s]*", "g"))) {
  console.log(++i, m[0]);
}

const realSrcImgs = [...h.matchAll(/<img\b[^>]*>/g)].filter((m) => {
  const tag = m[0];
  const src = tag.match(/\bsrc="([^"]+)"/i)?.[1];
  return src && !src.startsWith("data:");
});
console.log("\nimgs with real network src:", realSrcImgs.length);
realSrcImgs.forEach((m) => console.log(m[0].slice(0, 180)));

const links = [...h.matchAll(/<link[^>]+href="([^"]+)"/g)].map((m) => m[1]);
const sources = [...h.matchAll(/<source[^>]+srcSet="([^"]+)"/g)].map((m) => m[1]);
const scripts = [...h.matchAll(/<script[^>]+src="([^"]+)"/g)].map((m) => m[1]);
const woff = [...h.matchAll(/url\(([^)]+\.woff2[^)]*)\)/g)].map((m) =>
  m[1].replace(/['"]/g, ""),
);

const network = new Set([
  ...scripts,
  ...realSrcImgs.map((m) => m[0].match(/\bsrc="([^"]+)"/i)?.[1]),
  ...links.filter((u) => !u.startsWith("data:")),
  ...sources,
  ...woff,
]);
console.log("\nscripts:", scripts);
console.log("link hrefs:", links);
console.log("picture sources:", sources);
console.log("woff2 in inline css:", woff.length);
woff.forEach((u) => console.log(" ", u));
const webpCss = [...h.matchAll(/url\(([^)]+\.webp[^)]*)\)/g)].map((m) =>
  m[1].replace(/['"]/g, ""),
);
console.log("webp in inline css:", [...new Set(webpCss)].length);
[...new Set(webpCss)].forEach((u) => console.log(" ", u));
console.log("unique network URLs (+ HTML):", network.size + 1);
