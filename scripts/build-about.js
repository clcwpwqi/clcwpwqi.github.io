#!/usr/bin/env node
/**
 * 关于页面 Markdown 文件解析脚本
 * 读取 /configs/about/ 目录下的 MD 文件，合并到 about 配置中
 * 
 * 目录结构：
 * /configs/about/
 *   ├── about-me.md      # 关于我
 *   ├── about-blog.md    # 关于博客
 *   ├── tech-stack.md    # 技术栈
 *   └── author-tags.md   # 作者标签
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ABOUT_DIR = path.join(__dirname, '..', 'configs', 'about');
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'data', 'about-content.json');

/**
 * 解析 frontmatter
 */
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { frontmatter: {}, content: content.trim() };
  }

  const frontmatterText = match[1];
  const markdownContent = match[2].trim();

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
    }
    
    frontmatter[key] = value;
  }

  return { frontmatter, content: markdownContent };
}

/**
 * 解析技术栈（每行一个技术）
 */
function parseTechStack(content) {
  return content
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0 && !line.startsWith('#'));
}

/**
 * 解析作者标签（每行一个标签）
 */
function parseAuthorTags(content) {
  return content
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0 && !line.startsWith('#'));
}

/**
 * 构建关于页面内容
 */
async function buildAboutContent() {
  console.log('📖 开始读取关于页面内容...\n');
  
  const aboutContent = {
    aboutMe: null,
    aboutBlog: null,
    techStack: [],
    authorTags: [],
  };
  
  try {
    // 读取 about 目录
    const files = await fs.readdir(ABOUT_DIR);
    const mdFiles = files.filter(f => f.endsWith('.md'));
    
    console.log(`📁 找到 ${mdFiles.length} 个 Markdown 文件`);
    
    for (const filename of mdFiles) {
      const filepath = path.join(ABOUT_DIR, filename);
      const content = await fs.readFile(filepath, 'utf-8');
      const { frontmatter, content: mdContent } = parseFrontmatter(content);
      
      // 检查是否显示
      if (frontmatter.show === 'false') {
        console.log(`   ⏭️  跳过 ${filename} (show: false)`);
        continue;
      }
      
      console.log(`   📄 处理: ${filename}`);
      
      // 根据文件名判断类型
      const baseName = path.basename(filename, '.md');
      
      switch (baseName) {
        case 'about-me':
          aboutContent.aboutMe = {
            title: frontmatter.title || '关于我',
            content: mdContent,
            order: parseInt(frontmatter.order) || 1,
          };
          console.log(`      ✅ 关于我: ${mdContent.length} 字符`);
          break;
          
        case 'about-blog':
          aboutContent.aboutBlog = {
            title: frontmatter.title || '关于博客',
            content: mdContent,
            order: parseInt(frontmatter.order) || 2,
          };
          console.log(`      ✅ 关于博客: ${mdContent.length} 字符`);
          break;
          
        case 'tech-stack':
          aboutContent.techStack = {
            title: frontmatter.title || '技术栈',
            items: parseTechStack(mdContent),
            order: parseInt(frontmatter.order) || 3,
          };
          console.log(`      ✅ 技术栈: ${aboutContent.techStack.items.length} 项`);
          break;
          
        case 'author-tags':
          aboutContent.authorTags = {
            title: frontmatter.title || '作者标签',
            items: parseAuthorTags(mdContent),
            order: parseInt(frontmatter.order) || 4,
          };
          console.log(`      ✅ 作者标签: ${aboutContent.authorTags.items.length} 个`);
          break;
          
        default:
          // 自定义内容块
          aboutContent[baseName] = {
            title: frontmatter.title || baseName,
            content: mdContent,
            order: parseInt(frontmatter.order) || 99,
          };
          console.log(`      ✅ 自定义: ${baseName}`);
          break;
      }
    }
    
    // 写入输出文件
    await fs.writeFile(OUTPUT_FILE, JSON.stringify(aboutContent, null, 2), 'utf-8');
    
    console.log(`\n✅ 构建完成！`);
    console.log(`📁 输出: src/data/about-content.json`);
    
    return aboutContent;
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('⚠️  configs/about/ 目录不存在，使用空配置');
      // 创建默认输出
      await fs.writeFile(OUTPUT_FILE, JSON.stringify(aboutContent, null, 2), 'utf-8');
      return aboutContent;
    }
    console.error('❌ 构建失败:', error.message);
    process.exit(1);
  }
}

// 运行构建
buildAboutContent();
