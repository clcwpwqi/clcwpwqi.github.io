#!/usr/bin/env node
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync, statSync } from 'fs';
import { join, resolve, extname, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const rootDir = resolve(__dirname, '..');
const postsDir = join(rootDir, 'posts');
const publicPostsDir = join(rootDir, 'public', 'posts');
const outputDir = join(rootDir, 'src', 'data', 'generated');

mkdirSync(outputDir, { recursive: true });
mkdirSync(publicPostsDir, { recursive: true });

// Simple frontmatter parser
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, content };
  
  const fm = {};
  match[1].split('\n').forEach(line => {
    const colonIdx = line.indexOf(':');
    if (colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim();
      let value = line.slice(colonIdx + 1).trim();
      // Remove quotes
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      // Parse arrays
      if (value.startsWith('[') && value.endsWith(']')) {
        try { value = JSON.parse(value); } catch {}
      }
      fm[key] = value;
    }
  });
  
  return { frontmatter: fm, content: match[2].trim() };
}

// Read labels
const labelsPath = join(postsDir, 'labels.json');
const labels = existsSync(labelsPath) ? JSON.parse(readFileSync(labelsPath, 'utf-8')) : {};

// Read categories and articles
const categories = [];
const articles = [];

const entries = readdirSync(postsDir, { withFileTypes: true });

for (const entry of entries) {
  if (!entry.isDirectory() || entry.name === 'node_modules') continue;
  
  const categoryDir = join(postsDir, entry.name);
  const categoryConfigPath = join(categoryDir, `${entry.name}.json`);
  
  // Read category config
  if (existsSync(categoryConfigPath)) {
    const catConfig = JSON.parse(readFileSync(categoryConfigPath, 'utf-8'));
    categories.push(catConfig);
  }
  
  // Copy images to public/posts/
  if (existsSync(publicPostsDir)) {
    const catPublicDir = join(publicPostsDir, entry.name);
    mkdirSync(catPublicDir, { recursive: true });
    const files = readdirSync(categoryDir);
    for (const file of files) {
      const ext = extname(file).toLowerCase();
      if (['.png', '.jpg', '.jpeg', '.webp', '.gif'].includes(ext)) {
        copyFileSync(join(categoryDir, file), join(catPublicDir, file));
      }
    }
  }
  
  // Read articles
  const files = readdirSync(categoryDir);
  for (const file of files) {
    if (!file.endsWith('.md')) continue;
    
    const filePath = join(categoryDir, file);
    const content = readFileSync(filePath, 'utf-8');
    const { frontmatter, content: articleContent } = parseFrontmatter(content);
    
    // Check for cover image
    let cover = frontmatter.cover || null;
    if (!cover) {
      const baseName = basename(file, '.md');
      const imgExts = ['.png', '.jpg', '.jpeg', '.webp'];
      for (const ext of imgExts) {
        if (existsSync(join(categoryDir, baseName + ext))) {
          cover = `/posts/${entry.name}/${baseName}${ext}`;
          break;
        }
      }
    }
    
    // Generate excerpt from content if not provided
    let excerpt = frontmatter.excerpt || '';
    if (!excerpt && articleContent) {
      const text = articleContent.replace(/[#*`>\[\]!()]/g, '').trim();
      excerpt = text.slice(0, 150) + (text.length > 150 ? '...' : '');
    }
    
    articles.push({
      id: frontmatter.slug || basename(file, '.md'),
      title: frontmatter.title || basename(file, '.md'),
      slug: frontmatter.slug || basename(file, '.md'),
      excerpt,
      date: frontmatter.date || new Date().toISOString().split('T')[0],
      category: frontmatter.category || entry.name,
      tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
      readingTime: frontmatter.readingTime || Math.ceil(articleContent.length / 500),
      cover,
      content: articleContent,
      categorySlug: entry.name,
    });
  }
}

// Sort articles by date (newest first)
articles.sort((a, b) => new Date(b.date) - new Date(a.date));

// Sort categories by order
categories.sort((a, b) => (a.order || 0) - (b.order || 0));

// Build posts data
const postsData = { categories, articles, labels };

writeFileSync(
  join(outputDir, 'posts.json'),
  JSON.stringify(postsData, null, 2),
  'utf-8'
);

console.log(`✅ Posts built: ${articles.length} articles, ${categories.length} categories`);
