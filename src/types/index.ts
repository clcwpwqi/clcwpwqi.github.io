/**
 * 博客项目类型定义
 */

// 文章类型
export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  updatedAt?: string;
  category: string;
  tags: string[];
  cover?: string;
  readingTime: number;
  author?: string;
}

// 分类类型
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  count: number;
}

// 标签类型
export interface Tag {
  id: string;
  name: string;
  slug: string;
  count: number;
}

// 导航链接类型
export interface NavLink {
  label: string;
  href: string;
  icon?: string;
}

// 工具类型
export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  component: string;
}

// 主题类型
export type Theme = 'light' | 'dark' | 'system';

// SEO 类型
export interface SEO {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
}

// 评论配置类型
export interface CommentConfig {
  provider: 'giscus' | 'utterances';
  repo: string;
  repoId?: string;
  category?: string;
  categoryId?: string;
  mapping?: string;
  reactionsEnabled?: boolean;
  emitMetadata?: boolean;
  theme?: string;
  crossorigin?: string;
}

// 站点配置类型
export interface SiteConfig {
  title: string;
  description: string;
  author: string;
  email: string;
  github: string;
  twitter?: string;
  avatar: string;
  url: string;
  comment: CommentConfig;
}
