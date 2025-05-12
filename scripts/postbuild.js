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

const maybeCopy = (src, dest, name) => {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`\x1b[1m\x1b[32m✅\x1b[0m Copied ${name}`);
  } else {
    console.warn(`\x1b[1m\x1b[33m⚠️  Warning\x1b[0m: ${name} not found at ${src}`);
  }
};

maybeCopy(path.join(emulatorDataDir, 'loader.js'), path.join(dataDir, 'loader.js'), 'loader.js');
maybeCopy(path.join(emulatorDataDir, 'emulator.min.js'), path.join(dataDir, 'emulator.min.js'), 'emulator.min.js');
maybeCopy(path.join(emulatorDataDir, 'emulator.min.css'), path.join(dataDir, 'emulator.min.css'), 'emulator.min.css');

// Copy .data files from core-mgba
fs.readdirSync(coreMgbaDir).forEach(file => {
  if (file.endsWith('.data')) {
    const src = path.join(coreMgbaDir, file);
    const dest = path.join(coresDir, file);
    fs.copyFileSync(src, dest);
    console.log(`\x1b[1m\x1b[32m✅\x1b[0m Copied .data: ${file}`);
  }
});

// Copy everything from compression
fs.readdirSync(compressionSrcDir).forEach(file => {
  const src = path.join(compressionSrcDir, file);
  const dest = path.join(compressionDir, file);
  fs.copyFileSync(src, dest);
  console.log(`\x1b[1m\x1b[32m✅\x1b[0m Copied compression: ${file}`);
});
