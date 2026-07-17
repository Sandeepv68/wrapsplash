const fs = require('fs');
const path = require('path');
const src = fs.readFileSync(path.join(__dirname, 'src', 'index.ts'), 'utf8');
const methods = new Set();
for (const m of src.matchAll(/\n\s*([a-zA-Z0-9_]+)\s*=\s*\(/g)) methods.add(m[1]);
for (const m of src.matchAll(/\n\s*([a-zA-Z0-9_]+)\s*\(.*\): Promise<any> =/g)) methods.add(m[1]);
for (const m of src.matchAll(/\n\s*([a-zA-Z0-9_]+)\s*=\s*\(.*\)\s*=>/g)) methods.add(m[1]);
methods.add('init');
const examplesDir = path.join(__dirname, 'examples');
const files = fs.readdirSync(examplesDir).filter((f) => f.endsWith('.js'));
let allOk = true;
for (const file of files) {
  const content = fs.readFileSync(path.join(examplesDir, file), 'utf8');
  const calls = Array.from(content.matchAll(/wrapsplash\.([a-zA-Z0-9_]+)\s*\(/g)).map((m) => m[1]);
  const invalid = calls.filter((c) => !methods.has(c));
  if (invalid.length > 0) {
    allOk = false;
    console.log(file, 'invalid method calls:', Array.from(new Set(invalid)).join(', '));
  }
}
if (allOk) {
  console.log('All examples call valid methods.');
}
