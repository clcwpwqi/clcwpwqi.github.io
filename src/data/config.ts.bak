/**
 * 站点配置文件
 * 修改此文件以自定义博客信息
 */
import type { SiteConfig, Tool } from '@/types';

// 站点基本信息配置
export const siteConfig: SiteConfig = {
  title: 'DevBlog',
  description: '一个简洁、现代的开发者博客，分享技术文章与实用工具',
  author: 'Developer',
  email: 'developer@example.com',
  github: 'https://github.com/username',
  twitter: 'https://twitter.com/username',
  avatar: '/images/avatar.png',
  url: 'https://username.github.io',
  
  // 评论系统配置 (Giscus)
  // 配置步骤：
  // 1. 访问 https://giscus.app/ 获取配置
  // 2. 替换以下配置项
  comment: {
    provider: 'giscus',
    repo: 'username/blog-comments',  // 替换为你的仓库
    repoId: 'R_kgDOG...',            // 从 giscus.app 获取
    category: 'Announcements',
    categoryId: 'DIC_kwDOG...',      // 从 giscus.app 获取
    mapping: 'pathname',
    reactionsEnabled: true,
    emitMetadata: false,
    theme: 'preferred_color_scheme',
    crossorigin: 'anonymous',
  }
};

// 导航链接配置
export const navLinks = [
  { label: '首页', href: '/' },
  { label: '分类', href: '/categories' },
  { label: '工具箱', href: '/tools' },
  { label: '关于', href: '/about' },
];

// 工具箱配置
export const tools: Tool[] = [
  {
    id: 'json-formatter',
    name: 'JSON 格式化',
    description: '格式化、验证、压缩 JSON 数据',
    icon: 'Braces',
    component: 'JsonFormatter',
  },
  {
    id: 'base64',
    name: 'Base64 编解码',
    description: 'Base64 编码和解码工具',
    icon: 'Code',
    component: 'Base64Tool',
  },
  {
    id: 'timestamp',
    name: '时间戳转换',
    description: 'Unix 时间戳与日期时间互转',
    icon: 'Clock',
    component: 'TimestampTool',
  },
  {
    id: 'text-diff',
    name: '文本对比',
    description: '比较两段文本的差异',
    icon: 'GitCompare',
    component: 'TextDiffTool',
  },
  {
    id: 'url-encoder',
    name: 'URL 编解码',
    description: 'URL 编码和解码工具',
    icon: 'Link',
    component: 'UrlEncoderTool',
  },
  {
    id: 'color-converter',
    name: '颜色转换器',
    description: 'HEX、RGB、HSL 颜色格式互转',
    icon: 'Palette',
    component: 'ColorConverterTool',
  },
];

// 社交链接配置
export const socialLinks = {
  github: siteConfig.github,
  twitter: siteConfig.twitter,
  email: `mailto:${siteConfig.email}`,
  rss: '/rss.xml',
};

// 注意：分类和标签配置现在从 /posts 目录动态加载
// 详见 /posts/labels.json 和各分类文件夹下的 [分类名].json
