const AdmZip = require('adm-zip');
const fs = require('fs');
const path = require('path');

const zip = new AdmZip();

function addDir(dirPath, zipPath) {
  fs.readdirSync(dirPath).forEach(file => {
    const full = path.join(dirPath, file);
    const zp = zipPath ? zipPath + '/' + file : file;
    if (fs.statSync(full).isDirectory()) {
      if (!['node_modules', '.git', 'scripts'].includes(file)) addDir(full, zp);
    } else {
      zip.addLocalFile(full, zipPath || '');
    }
  });
}

zip.addLocalFile('.env.server', '', '.env');
addDir('src', 'src');
addDir('database', 'database');
zip.addLocalFile('package.json', '');
zip.addLocalFile('package-lock.json', '');
addDir('public', 'public');

zip.writeZip('backend_upload.zip');

const entries = zip.getEntries().map(e => e.entryName);
console.log('Key files:', entries.filter(e => ['src/server.js','package.json','.env'].includes(e)));
console.log('Total files:', entries.length);
