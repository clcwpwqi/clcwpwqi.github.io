#!/usr/bin/env node
/**
 * Markdown 文章解析脚本
 * 读取 /posts 目录下的分类文件夹，解析 frontmatter，生成文章数据
 * 
 * 目录结构：
 * /posts/
 *   ├── labels.json              # 标签配置
 *   ├── frontend/                # 分类文件夹
 *   │   ├── frontend.json        # 分类配置
 *   │   └── article-1.md         # 文章
 *   └── ...
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const POSTS_DIR = path.join(__dirname, '..', 'posts');
const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'data');

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
    if (!isNaN(value) && value !== '' && !Array.isArray(value)) {
      const num = Number(value);
      if (!isNaN(num)) {
        value = num;
      }
    }
    
    frontmatter[key] = value;
  }

  return { frontmatter, content: markdownContent };
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
 * 读取标签配置
 */
async function loadLabels() {
  try {
    const labelsPath = path.join(POSTS_DIR, 'labels.json');
    const content = await fs.readFile(labelsPath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.warn('⚠️  未找到 labels.json，使用空标签配置');
    return {};
  }
}

/**
 * 读取分类配置
 * @param {string} categoryDir - 分类目录路径
 * @param {string} categoryName - 分类名称
 */
async function loadCategoryConfig(categoryDir, categoryName) {
  try {
    const configPath = path.join(categoryDir, `${categoryName}.json`);
    const content = await fs.readFile(configPath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.warn(`⚠️  分类 ${categoryName} 未找到配置文件`);
    return null;
  }
}

/**
 * 读取并解析所有文章
 */
async function buildPosts() {
  console.log('📖 开始读取文章...\n');
  
  // 加载标签配置
  const labelsConfig = await loadLabels();
  console.log(`🏷️  已加载 ${Object.keys(labelsConfig).length} 个标签配置`);
  
  // 读取 posts 目录
  const entries = await fs.readdir(POSTS_DIR, { withFileTypes: true });
  const categoryDirs = entries.filter(entry => entry.isDirectory());
  
  console.log(`📁 找到 ${categoryDirs.length} 个分类目录\n`);
  
  const posts = [];
  const categories = [];
  const allTags = new Set();
  const dynamicLabels = { ...labelsConfig };
  
  // 处理每个分类目录
  for (const dir of categoryDirs) {
    const categoryName = dir.name;
    const categoryDir = path.join(POSTS_DIR, categoryName);
    
    console.log(`📂 处理分类: ${categoryName}`);
    
    // 读取分类配置
    const categoryConfig = await loadCategoryConfig(categoryDir, categoryName);
    if (!categoryConfig) {
      console.log(`   ⏭️  跳过（无配置文件）`);
      continue;
    }
    
    categories.push(categoryConfig);
    
    // 读取该分类下的文章
    const files = await fs.readdir(categoryDir);
    const mdFiles = files.filter(file => file.endsWith('.md'));
    
    console.log(`   📝 找到 ${mdFiles.length} 篇文章`);
    
    for (const filename of mdFiles) {
      const filepath = path.join(categoryDir, filename);
      const fileContent = await fs.readFile(filepath, 'utf-8');
      
      const { frontmatter, content } = parseFrontmatter(fileContent);
      
      // 检查必需的字段
      if (!frontmatter.title || !frontmatter.slug) {
        console.warn(`   ⚠️  跳过 ${filename}: 缺少必需的 frontmatter 字段 (title, slug)`);
        continue;
      }
      
      // 收集标签
      const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags : [];
      tags.forEach(tag => {
        allTags.add(tag);
        // 如果标签不在配置中，自动创建默认配置
        if (!dynamicLabels[tag]) {
          dynamicLabels[tag] = {
            id: tag.toLowerCase().replace(/\s+/g, '-'),
            name: tag,
            slug: tag.toLowerCase().replace(/\s+/g, '-'),
            color: '#3B82F6' // 默认蓝色
          };
          console.log(`   🏷️  自动创建标签: ${tag}`);
        }
      });
      
      const post = {
        id: frontmatter.slug,
        title: frontmatter.title,
        slug: frontmatter.slug,
        excerpt: frontmatter.excerpt || '',
        content: content,
        date: frontmatter.date || new Date().toISOString().split('T')[0],
        updatedAt: frontmatter.updatedAt,
        category: frontmatter.category || categoryName,
        tags: tags,
        cover: frontmatter.cover,
        readingTime: frontmatter.readingTime || calculateReadingTime(content),
        author: frontmatter.author || 'Developer',
      };
      
      posts.push(post);
    }
    
    console.log('');
  }
  
  // 按日期排序（最新的在前）
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // 按 order 排序分类
  categories.sort((a, b) => (a.order || 0) - (b.order || 0));
  
  // 更新分类文章数
  categories.forEach(cat => {
    cat.count = posts.filter(p => p.category === cat.slug).length;
  });
  
  // 生成标签列表
  const tagsList = Array.from(allTags).map(tagName => {
    const config = dynamicLabels[tagName] || {
      id: tagName.toLowerCase().replace(/\s+/g, '-'),
      name: tagName,
      slug: tagName.toLowerCase().replace(/\s+/g, '-'),
      color: '#3B82F6'
    };
    return {
      ...config,
      count: posts.filter(p => p.tags.includes(tagName)).length
    };
  });
  
  // 写入输出文件
  const output = {
    posts,
    categories,
    tags: tagsList,
    labelsConfig: dynamicLabels
  };
  
  await fs.writeFile(
    path.join(OUTPUT_DIR, 'posts.json'),
    JSON.stringify(output, null, 2),
    'utf-8'
  );
  
  console.log('✅ 构建完成！');
  console.log(`   📄 文章: ${posts.length} 篇`);
  console.log(`   📁 分类: ${categories.length} 个`);
  console.log(`   🏷️  标签: ${tagsList.length} 个`);
  console.log(`   📁 输出: src/data/posts.json`);
  
  return output;
}

// 运行构建
buildPosts().catch(error => {
  console.error('❌ 构建失败:', error.message);
  process.exit(1);
});
