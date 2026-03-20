/**
 * 站点配置文件
 * 修改此文件以自定义博客信息
 */
import type { SiteConfig, Category, Tool } from '@/types';

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

// 分类配置
export const categories: Category[] = [
  {
    id: '1',
    name: '前端开发',
    slug: 'frontend',
    description: 'HTML, CSS, JavaScript, React, Vue 等前端技术',
    count: 0,
  },
  {
    id: '2',
    name: '后端开发',
    slug: 'backend',
    description: 'Node.js, Python, Java, 数据库等后端技术',
    count: 0,
  },
  {
    id: '3',
    name: 'DevOps',
    slug: 'devops',
    description: 'Docker, Kubernetes, CI/CD, 云原生技术',
    count: 0,
  },
  {
    id: '4',
    name: '工具效率',
    slug: 'tools',
    description: '开发工具、编辑器、效率提升技巧',
    count: 0,
  },
  {
    id: '5',
    name: '最佳实践',
    slug: 'best-practices',
    description: '代码规范、架构设计、性能优化',
    count: 0,
  },
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
