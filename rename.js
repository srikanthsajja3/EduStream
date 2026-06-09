const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'frontend/public/images');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpeg'));

files.forEach((file, index) => {
  const oldPath = path.join(dir, file);
  const newPath = path.join(dir, `gallery-${index + 1}.jpeg`);
  fs.renameSync(oldPath, newPath);
});
console.log('Renamed ' + files.length + ' files.');
