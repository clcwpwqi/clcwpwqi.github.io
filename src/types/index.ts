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
  order?: number;
  count?: number;
}

// 标签类型
export interface Tag {
  id: string;
  name: string;
  slug: string;
  color?: string;
  count?: number;
}

// 标签配置类型
export interface LabelConfig {
  id: string;
  name: string;
  slug: string;
  color: string;
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
  color?: string;
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

// 头像配置类型
export interface AvatarConfig {
  src: string;
  width: number;
  height: number;
  alt?: string;
}

// 站点配置类型
export interface SiteConfig {
  title: string;
  description: string;
  author: string;
  email: string;
  github: string;
  twitter?: string;
  telegram?: string;
  wechat?: string;
  logo?: string;
  avatar?: string | AvatarConfig;
  url: string;
  favicon?: string;
  comment: CommentConfig;
  analytics?: {
    provider?: string;
    id?: string;
  };
}

// 文章数据输出类型
export interface PostsData {
  posts: Post[];
  categories: Category[];
  tags: Tag[];
  labelsConfig: Record<string, LabelConfig>;
}

// 品牌配置类型
export interface BrandConfig {
  showLogo?: boolean;
  logo?: string;
  logoImage?: string;
  name?: string;
  description?: string;
}

// 联系方式类型
export interface ContactItem {
  type: string;
  label: string;
  value: string;
  url: string;
  icon: string;
  show: boolean;
  action?: 'link' | 'copy';
  copyText?: string;
}

// 导航配置类型
export interface NavigationConfig {
  brand?: BrandConfig;
  items: Array<NavLink & { show: boolean; icon?: string }>;
  search: { enabled: boolean };
  themeToggle: { enabled: boolean };
}

// 页脚配置类型
export interface FooterConfig {
  brand?: BrandConfig;
  socialLinks?: Array<{
    name: string;
    url: string;
    icon: string;
    show: boolean;
  }>;
  quickLinks?: Array<{
    label: string;
    href: string;
    show: boolean;
  }>;
  contactInfo?: {
    enabled: boolean;
    email?: string;
    wechat?: string;
    telegram?: string;
  };
  copyright?: {
    enabled: boolean;
    text?: string;
  };
  madeWith?: {
    enabled: boolean;
    text?: string;
  };
}

// 首页 Hero 按钮类型
export interface HeroButton {
  label: string;
  href: string;
  variant: 'primary' | 'secondary';
  icon: string;
}
