/**
 * 关于页面内容构建脚本
 * 读取 /configs/about/ 目录下的 .md 文件，生成 about-content.json
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
    
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    } else if (value.startsWith("'") && value.endsWith("'")) {
      value = value.slice(1, -1);
    }
    
    if (value.startsWith('[') && value.endsWith(']')) {
      try {
        value = JSON.parse(value.replace(/'/g, '"'));
      } catch {
        value = value.slice(1, -1).split(',').map(v => v.trim().replace(/["']/g, ''));
      }
    }
    
    frontmatter[key] = value;
  }

  return { frontmatter, content: markdownContent };
}

async function buildAboutContent() {
  console.log('📖 开始构建关于页面内容...\n');

  const defaultContent = {
    'about-me': {
      title: '关于我',
      content: '我是一名热爱技术的全栈开发者，拥有多年的 Web 开发经验。专注于前端开发，同时也熟悉后端技术和 DevOps 实践。\n\n创建这个博客的初衷是记录学习过程中的点滴，分享技术心得，同时也希望能够帮助到其他开发者。'
    },
    'about-blog': {
      title: '关于博客',
      content: '这是一个基于 React + TypeScript + Tailwind CSS 构建的静态博客。博客采用纯前端架构，部署在 GitHub Pages 上。\n\n博客的主要功能包括：文章展示、分类标签、搜索功能、暗黑模式、响应式设计等。'
    },
    'skills': {
      title: '技术栈',
      skills: ['React', 'TypeScript', 'Node.js', 'Next.js', 'Tailwind CSS', 'Docker', 'Git']
    },
    'author-tags': {
      title: '作者标签',
      tags: ['全栈开发者', '开源爱好者', '技术博主']
    }
  };

  try {
    // 检查 /configs/about/ 目录是否存在
    try {
      await fs.access(ABOUT_DIR);
    } catch {
      console.log('⚠️  /configs/about/ 目录不存在，使用默认内容');
      await fs.writeFile(OUTPUT_FILE, JSON.stringify(defaultContent, null, 2), 'utf-8');
      return;
    }

    const files = await fs.readdir(ABOUT_DIR);
    const mdFiles = files.filter(file => file.endsWith('.md'));

    if (mdFiles.length === 0) {
      console.log('⚠️  /configs/about/ 下没有 .md 文件，使用默认内容');
      await fs.writeFile(OUTPUT_FILE, JSON.stringify(defaultContent, null, 2), 'utf-8');
      return;
    }

    const content = { ...defaultContent };

    for (const filename of mdFiles) {
      const fileId = filename.replace(/\.md$/, '');
      const filepath = path.join(ABOUT_DIR, filename);
      const fileContent = await fs.readFile(filepath, 'utf-8');
      
      const { frontmatter, content: markdownContent } = parseFrontmatter(fileContent);
      
      content[fileId] = {
        title: frontmatter.title || defaultContent[fileId]?.title || fileId,
        content: markdownContent || frontmatter.content || '',
        ...frontmatter
      };
      
      // 如果 frontmatter 中有 skills 字段，添加它
      if (frontmatter.skills) {
        content[fileId].skills = Array.isArray(frontmatter.skills) 
          ? frontmatter.skills 
          : frontmatter.skills.split(',').map(s => s.trim());
      }
      
      // 如果 frontmatter 中有 tags 字段，添加它
      if (frontmatter.tags) {
        content[fileId].tags = Array.isArray(frontmatter.tags) 
          ? frontmatter.tags 
          : frontmatter.tags.split(',').map(t => t.trim());
      }
      
      console.log(`✅ 已加载: ${filename} (${fileId})`);
    }

    await fs.writeFile(OUTPUT_FILE, JSON.stringify(content, null, 2), 'utf-8');
    console.log(`\n🎉 关于页面内容构建完成！已加载 ${mdFiles.length} 个文件`);
    console.log(`📁 输出: ${OUTPUT_FILE}`);

  } catch (error) {
    console.error('❌ 构建关于页面内容失败:', error.message);
    // 写入默认内容
    await fs.writeFile(OUTPUT_FILE, JSON.stringify(defaultContent, null, 2), 'utf-8');
  }
}

buildAboutContent();
