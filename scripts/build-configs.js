#!/usr/bin/env node
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const rootDir = resolve(__dirname, '..');
const configsDir = join(rootDir, 'configs');
const outputDir = join(rootDir, 'src', 'data', 'generated');

mkdirSync(outputDir, { recursive: true });

function readJson(filePath) {
  try {
    return JSON.parse(readFileSync(filePath, 'utf-8'));
  } catch {
    return null;
  }
}

// Read all config files
const configFiles = ['site.json', 'navigation.json', 'homepage.json', 'about.json', 'footer.json', 'tools.json'];
const config = {};

for (const file of configFiles) {
  const data = readJson(join(configsDir, file));
  if (data) {
    const key = file.replace('.json', '');
    config[key] = data;
  }
}

// Read about/ markdown files
const aboutDir = join(configsDir, 'about');
if (existsSync(aboutDir)) {
  const aboutFiles = readdirSync(aboutDir).filter(f => f.endsWith('.md'));
  const aboutContent = {};
  for (const file of aboutFiles) {
    const key = file.replace('.md', '');
    aboutContent[key] = readFileSync(join(aboutDir, file), 'utf-8');
  }
  config.aboutContent = aboutContent;
}

// Write combined config
writeFileSync(
  join(outputDir, 'config.json'),
  JSON.stringify(config, null, 2),
  'utf-8'
);

console.log('✅ Configs built successfully');
