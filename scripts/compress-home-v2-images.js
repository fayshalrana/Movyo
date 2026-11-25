/**
 * Lossy recompress home-v2 image assets (requires sharp).
 * Writes optimized copies as *-opt.webp when in-place overwrite is blocked.
 * Run: node scripts/compress-home-v2-images.js
 */
const fs = require("fs");
const path = require("path");

const ASSETS = path.join(process.cwd(), "src", "assets");

function optName(file) {
  return file.replace(/\.webp$/i, "-opt.webp");
}

/** @type {Array<{ file: string; out?: string; maxWidth?: number; quality: number }>} */
const TARGETS = [
  {
    file: "noise-bg.webp",
    out: "pricing-section-bg.webp",
    maxWidth: 1920,
    quality: 72,
  },
  { file: "heroV2.webp", maxWidth: 1920, quality: 82 },
  { file: "herobgv2-mobile.webp", maxWidth: 1080, quality: 82 },
  { file: "Group-2.webp", maxWidth: 475, quality: 80 },
  { file: "Group-3.webp", maxWidth: 510, quality: 80 },
  { file: "pricing-vial-semaglutide.webp", maxWidth: 276, quality: 80 },
  { file: "pricing-vial-tirzepatide.webp", maxWidth: 276, quality: 80 },
  { file: "cta-journey-team.webp", maxWidth: 1024, quality: 80 },
  { file: "community-carousel-v2-1.webp", maxWidth: 800, quality: 78 },
  { file: "community-carousel-v2-2.webp", maxWidth: 800, quality: 78 },
  { file: "community-carousel-v2-3.webp", maxWidth: 800, quality: 78 },
  { file: "community-carousel-v2-4.webp", maxWidth: 800, quality: 78 },
  { file: "approch-mobile-1.webp", maxWidth: 760, quality: 80 },
  { file: "approch-mobile-2.webp", maxWidth: 760, quality: 80 },
  { file: "approch-mobile-3.webp", maxWidth: 760, quality: 80 },
  { file: "movyo-wordmark.webp", maxWidth: 640, quality: 85 },
];

function writeBuffer(outPath, buffer) {
  const tmpPath = `${outPath}.tmp`;
  fs.writeFileSync(tmpPath, buffer);
  try {
    fs.renameSync(tmpPath, outPath);
  } catch {
    fs.copyFileSync(tmpPath, outPath);
    fs.unlinkSync(tmpPath);
  }
}

async function main() {
  const sharp = require("sharp");
  let saved = 0;

  for (const target of TARGETS) {
    const filePath = path.join(ASSETS, target.file);
    if (!fs.existsSync(filePath)) {
      console.warn("skip (missing):", target.file);
      continue;
    }

    const before = fs.statSync(filePath).size;
    const pipeline = sharp(filePath);
    if (target.maxWidth) {
      pipeline.resize(target.maxWidth, null, { withoutEnlargement: true });
    }
    const buffer = await pipeline
      .webp({ quality: target.quality, effort: 6 })
      .toBuffer();

    const preferredOut = path.join(ASSETS, target.out || target.file);
    const fallbackOut = path.join(ASSETS, target.out || optName(target.file));
    let outPath = preferredOut;

    if (buffer.length >= before && !target.out) {
      console.log(`${target.file}: kept (${Math.round(before / 1024)}KB)`);
      continue;
    }

    try {
      writeBuffer(outPath, buffer);
    } catch {
      outPath = fallbackOut;
      writeBuffer(outPath, buffer);
    }

    const after = fs.statSync(outPath).size;
    const delta = before - after;
    if (delta > 0) saved += delta;
    console.log(
      `${path.basename(outPath)}: ${Math.round(before / 1024)}KB -> ${Math.round(after / 1024)}KB (-${Math.round(Math.max(delta, 0) / 1024)}KB)`,
    );
  }

  const logoPng = path.join(ASSETS, "logo-mobile.png");
  const logoWebp = path.join(ASSETS, "logo-mobile.webp");
  if (fs.existsSync(logoPng) && !fs.existsSync(logoWebp)) {
    const before = fs.statSync(logoPng).size;
    const buffer = await sharp(logoPng)
      .webp({ quality: 90, effort: 6 })
      .toBuffer();
    writeBuffer(logoWebp, buffer);
    console.log(
      `logo-mobile.webp: ${Math.round(buffer.length / 1024)}KB (png was ${Math.round(before / 1024)}KB)`,
    );
  }

  console.log(`Total saved: ~${Math.round(saved / 1024)}KB`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
