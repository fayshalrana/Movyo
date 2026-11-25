const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const MANIFEST_PATH = path.join(PUBLIC_DIR, 'assets-manifest.json');

if (!fs.existsSync(MANIFEST_PATH)) {
  console.error('Manifest not found. Run hash-assets.js first.');
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(function(f) {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      callback(path.join(dir, f));
    }
  });
}

console.log('Updating asset references with hashes...');

walkDir(PUBLIC_DIR, function(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext !== '.css' && ext !== '.html') return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;

  const sortedPaths = Object.keys(manifest).sort(function(a, b) {
    return b.length - a.length;
  });

  sortedPaths.forEach(function(originalPath) {
    const hashedPath = manifest[originalPath];
    const escapedPath = originalPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedPath + '(\\?[^\\s\\)"\']*)?', 'g');
    
    content = content.replace(regex, function(match) {
        if (match.indexOf(hashedPath) === 0) return match;
        return hashedPath;
    });
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    console.log('Updated references in: ' + path.relative(PUBLIC_DIR, filePath));
  }
});

console.log('Asset reference update complete.');
