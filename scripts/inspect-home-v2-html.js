const fs = require("fs");

const htmlPath = process.argv[2] || ".next/server/app/index.html";
const html = fs.readFileSync(htmlPath, "utf8");

const externalScripts = [
  ...html.matchAll(/<script[^>]*\ssrc="([^"]+)"[^>]*><\/script>/g),
].map((m) => m[1]);

const inlineScripts = (html.match(/<script(?:\s[^>]*)?>(?!.*src=)/g) || []).length;

console.log("HTML KB:", Math.round(html.length / 1024));
console.log("External scripts:", externalScripts.length);
externalScripts.forEach((s) => console.log(" ", s));

const chunksDir = ".next/static/chunks";
let totalKb = 0;
externalScripts.forEach((src) => {
  const rel = src.replace("/_next/static/chunks/", "").replace(/^\//, "");
  const paths = [
    `${chunksDir}/${rel}`,
    `${chunksDir}/app/${rel.replace(/^app\//, "")}`,
  ];
  for (const p of paths) {
    if (fs.existsSync(p)) {
      const kb = Math.round(fs.statSync(p).size / 1024);
      totalKb += kb;
      console.log(`  -> ${kb}KB ${p}`);
      break;
    }
  }
});
console.log("Total external JS KB:", totalKb);
console.log("Inline script open tags (approx):", inlineScripts);
