const fs = require("fs");

const html = fs.readFileSync(process.argv[2] || "tmp-home-v2.html", "utf8");
const scripts = [...html.matchAll(/<script[^>]+src=["']([^"']+)["']/gi)].map(
  (m) => m[1],
);
const links = [...html.matchAll(/<link[^>]+href=["']([^"']+)["']/gi)].map(
  (m) => m[1],
);
const imgs = [...html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map(
  (m) => m[1],
);
const deferredImgs = [
  ...html.matchAll(/<img[^>]+data-movyo-src=["']([^"']+)["']/gi),
].map((m) => m[1]);
const srcset = [
  ...html.matchAll(/srcset=["']([^"']+)["']/gi),
].flatMap((m) => m[1].split(",").map((s) => s.trim().split(" ")[0]));

const eagerUnique = new Set([...scripts, ...links, ...imgs, ...srcset]);
console.log("Scripts:", scripts.length, [...new Set(scripts)]);
console.log("Eager images (src=):", imgs.length, "unique", new Set(imgs).size);
console.log("Deferred images (data-movyo-src):", deferredImgs.length, "unique", new Set(deferredImgs).size);
console.log("Eager unique refs (Pingdom initial):", eagerUnique.size);
console.log("HTML size KB:", Math.round(html.length / 1024));
