const http = require("http");
const https = require("https");

const base = process.argv[2] || "https://dev-movyo-health.automatedpros.link";
const path = process.argv[3] || "/";
const TIMEOUT_MS = 8000;

function shouldProbe(url) {
  if (!url || url.startsWith("#") || url.startsWith("data:")) return false;
  if (/^(tel|mailto|javascript):/i.test(url)) return false;
  if (url.includes("#")) return false;
  return true;
}

function get(url) {
  const lib = url.startsWith("https") ? https : http;
  return new Promise((resolve, reject) => {
    const req = lib.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () =>
        resolve({
          status: res.statusCode,
          len: data.length,
        }),
      );
    });
    req.setTimeout(TIMEOUT_MS, () => req.destroy(new Error("timeout")));
    req.on("error", reject);
  });
}

async function main() {
  const page = await get(`${base}${path}`);
  const urls = new Set();
  for (const m of page.body.matchAll(/(?:src|href)="([^"]+)"/g)) urls.add(m[1]);
  for (const m of page.body.matchAll(/data-movyo-src="([^"]+)"/g)) urls.add(m[1]);

  const results = [];
  for (const u of urls) {
    if (!shouldProbe(u)) continue;
    const full = u.startsWith("http") ? u : `${base}${u}`;
    try {
      const res = await get(full);
      if (res.status >= 400) {
        results.push({ url: u, status: res.status, kb: Math.round(res.len / 1024) });
      }
    } catch (err) {
      results.push({ url: u, error: err.message });
    }
  }
  console.log(JSON.stringify(results, null, 2));
}

main().catch(console.error);
