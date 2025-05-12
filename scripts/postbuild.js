import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const dataDir = path.join(distDir, 'data');
const coresDir = path.join(dataDir, 'cores');
const compressionDir = path.join(dataDir, 'compression');

fs.mkdirSync(coresDir, { recursive: true });
fs.mkdirSync(compressionDir, { recursive: true });

const emulatorDataDir = path.resolve('node_modules/@emulatorjs/emulatorjs/data');
const coreMgbaDir = path.resolve('node_modules/@emulatorjs/core-mgba');
const compressionSrcDir = path.join(emulatorDataDir, 'compression');

fs.copyFileSync(path.join(emulatorDataDir, 'loader.js'), path.join(dataDir, 'loader.js'));
fs.copyFileSync(path.join(emulatorDataDir, 'emulator.min.js'), path.join(dataDir, 'emulator.min.js'));
fs.copyFileSync(path.join(emulatorDataDir, 'emulator.min.css'), path.join(dataDir, 'emulator.min.css'));
console.log('\x1b[1m\x1b[32m:D\x1b[0m Copied loader.js');
console.log('\x1b[1m\x1b[32m:D\x1b[0m Copied emulator.min.js');
console.log('\x1b[1m\x1b[32m:D\x1b[0m Copied emulator.min.css');

fs.readdirSync(coreMgbaDir).forEach(file => {
  if (file.endsWith('.data')) {
    const src = path.join(coreMgbaDir, file);
    const dest = path.join(coresDir, file);
    fs.copyFileSync(src, dest);
    console.log(`\x1b[1m\x1b[32m:D\x1b[0m Copied .data: ${file}`);
  }
});

fs.readdirSync(compressionSrcDir).forEach(file => {
  const src = path.join(compressionSrcDir, file);
  const dest = path.join(compressionDir, file);
  fs.copyFileSync(src, dest);
  console.log(`\x1b[1m\x1b[32m:D\x1b[0m Copied compression: ${file}`);
});
