const fs = require('fs');
const path = require('path');

const file = path.resolve(__dirname, '../index.html');
const content = fs.readFileSync(file, 'utf-8');

// Find all href="https://richind.org..."
const regex = /href=["']https:\/\/richind\.org([^"']*)["']/g;
let match;
const found = new Set();
while ((match = regex.exec(content)) !== null) {
  found.add(match[1] || '/');
}

console.log('Unique subpaths linked to richind.org:');
for (const p of found) {
  console.log(p);
}
