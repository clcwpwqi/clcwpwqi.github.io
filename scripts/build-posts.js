#!/usr/bin/env node
/**
 * Markdown 文章解析脚本
 * 读取 /posts 目录下的 .md 文件，解析 frontmatter，生成文章数据
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const POSTS_DIR = path.join(__dirname, '..', 'posts');
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'data', 'posts.json');

/**
 * 解析 frontmatter
 * @param {string} content - 文件内容
 * @returns {object} - { frontmatter, content }
 */
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { frontmatter: {}, content: content.trim() };
  }

  const frontmatterText = match[1];
  const markdownContent = match[2].trim();

  // 解析 YAML 格式的 frontmatter
  const frontmatter = {};
  const lines = frontmatterText.split('\n');
  
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;
    
    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();
    
    // 处理字符串值（去除引号）
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    } else if (value.startsWith("'") && value.endsWith("'")) {
      value = value.slice(1, -1);
    }
    
    // 处理数组
    if (value.startsWith('[') && value.endsWith(']')) {
      try {
        value = JSON.parse(value.replace(/'/g, '"'));
      } catch {
        value = value.slice(1, -1).split(',').map(v => v.trim().replace(/["']/g, ''));
      }
    }
    
    // 处理数字
    if (!isNaN(value) && value !== '') {
      value = Number(value);
    }
    
    frontmatter[key] = value;
  }

  return { frontmatter, content: markdownContent };
}

/**
 * 生成文章 ID
 * @param {string} filename - 文件名
 * @returns {string} - 文章 ID
 */
function generateId(filename) {
  return filename.replace(/\.md$/, '');
}

/**
 * 计算阅读时间
 * @param {string} content - 文章内容
 * @returns {number} - 阅读时间（分钟）
 */
function calculateReadingTime(content) {
  const wordsPerMinute = 200;
  const wordCount = content.replace(/\s/g, '').length;
  return Math.ceil(wordCount / wordsPerMinute) || 1;
}

/**
 * 读取并解析所有文章
 */
async function buildPosts() {
  try {
    console.log('📖 开始读取文章...');
    
    // 读取 posts 目录
    const files = await fs.readdir(POSTS_DIR);
    const mdFiles = files.filter(file => file.endsWith('.md') && file !== 'TEMPLATE.md');
    
    console.log(`📄 找到 ${mdFiles.length} 篇文章`);
    
    const posts = [];
    
    for (const filename of mdFiles) {
      const filepath = path.join(POSTS_DIR, filename);
      const fileContent = await fs.readFile(filepath, 'utf-8');
      
      const { frontmatter, content } = parseFrontmatter(fileContent);
      
      // 检查必需的字段
      if (!frontmatter.title || !frontmatter.slug) {
        console.warn(`⚠️  跳过 ${filename}: 缺少必需的 frontmatter 字段 (title, slug)`);
        continue;
      }
      
      const post = {
        id: generateId(filename),
        title: frontmatter.title,
        slug: frontmatter.slug,
        excerpt: frontmatter.excerpt || '',
        content: content,
        date: frontmatter.date || new Date().toISOString().split('T')[0],
        updatedAt: frontmatter.updatedAt,
        category: frontmatter.category || 'uncategorized',
        tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
        cover: frontmatter.cover,
        readingTime: frontmatter.readingTime || calculateReadingTime(content),
        author: frontmatter.author || 'Developer',
      };
      
      posts.push(post);
      console.log(`✅ 已解析: ${post.title}`);
    }
    
    // 按日期排序（最新的在前）
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    // 写入 JSON 文件
    await fs.writeFile(OUTPUT_FILE, JSON.stringify(posts, null, 2), 'utf-8');
    
    console.log(`\n🎉 成功生成 ${posts.length} 篇文章！`);
    console.log(`📁 输出文件: ${OUTPUT_FILE}`);
    
    return posts;
  } catch (error) {
    console.error('❌ 构建失败:', error.message);
    process.exit(1);
  }
}

// 运行构建
buildPosts();
