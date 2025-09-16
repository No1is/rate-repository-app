const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'dist', 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');
content = content.replace(/\"\/_expo\//g, '"/rate-repository-app/_expo/');
fs.writeFileSync(indexPath, content);
