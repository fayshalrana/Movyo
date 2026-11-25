const fs = require('fs');
const path = require('path');

const NEXT_DIR = path.join(process.cwd(), '.next');
const STATIC_CHUNKS_DIR = path.join(NEXT_DIR, 'static', 'chunks');
const SERVER_APP_DIR = path.join(NEXT_DIR, 'server', 'app');

function getAllHtmlFiles(dir, fileList) {
  fileList = fileList || [];
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  files.forEach(function(file) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const htmlFiles = getAllHtmlFiles(SERVER_APP_DIR);

function getChunkContent(chunkPath) {
    if (fs.existsSync(chunkPath)) {
        return fs.readFileSync(chunkPath, 'utf8');
    }
    return null;
}

htmlFiles.forEach(function(htmlPath) {
  let content = fs.readFileSync(htmlPath, 'utf8');
  let originalContent = content;

  // Single-pass replacement to avoid recursive replacements inside inlined JS
  const scriptRegex = /<script[^>]*src="\/_next\/static\/chunks\/([^"]+)"[^>]*><\/script>/g;
  
  content = content.replace(scriptRegex, (match, chunkPath) => {
    const fullChunkPath = path.join(STATIC_CHUNKS_DIR, chunkPath);
    const chunkContent = getChunkContent(fullChunkPath);

    if (chunkContent) {
      console.log('Inlining chunk: ' + chunkPath);
      // Escape </script> to prevent early script termination
      const escapedContent = chunkContent.replace(/<\/script>/g, '<\\/script>');
      return '<script defer>' + escapedContent + '</script>';
    }
    return match;
  });

  if (content !== originalContent) {
    fs.writeFileSync(htmlPath, content);
  }
});
