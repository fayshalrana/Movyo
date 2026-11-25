const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const MANIFEST_PATH = path.join(PUBLIC_DIR, 'assets-manifest.json');

// Extensions to hash
const ASSET_EXTENSIONS = ['.css', '.js', '.png', '.jpg', '.jpeg', '.webp', '.svg', '.woff', '.woff2', '.ttf', '.eot'];

function getFileHash(filePath) {
  const content = fs.readFileSync(filePath);
  return crypto.createHash('md5').update(content).digest('hex').slice(0, 8);
}

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

const manifest = {};

console.log('Starting asset hashing...');

walkDir(PUBLIC_DIR, function(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ASSET_EXTENSIONS.indexOf(ext) === -1) return;
  if (filePath === MANIFEST_PATH) return;
  
  const filename = path.basename(filePath);
  
  // Skip already hashed files (filename.8chars.ext)
  if (/\.[a-f0-9]{8}\.[a-z0-9]+$/i.test(filename)) {
    console.log('Skipping already hashed file: ' + filename);
    return;
  }

  const hash = getFileHash(filePath);
  const dir = path.dirname(filePath);
  const baseName = path.basename(filePath, ext);
  const hashedName = baseName + '.' + hash + ext;
  const hashedPath = path.join(dir, hashedName);

  // Copy file to hashed version
  fs.copyFileSync(filePath, hashedPath);
  
  const relativePath = path.relative(PUBLIC_DIR, filePath);
  const relativeHashedPath = path.relative(PUBLIC_DIR, hashedPath);
  
  // Add to manifest with leading slash
  manifest['/' + relativePath.split(path.sep).join('/')] = '/' + relativeHashedPath.split(path.sep).join('/');
  console.log('Hashed: ' + relativePath + ' -> ' + relativeHashedPath);
});

fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
console.log('Asset manifest created at ' + MANIFEST_PATH);
