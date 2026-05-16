export interface SiteConfig {
  title: string;
  description: string;
  author: string;
  email: string;
  github: string;
  telegram: string;
  wechat: string;
  logo: string;
  avatar: { src: string; width: number; height: number; alt: string };
  comment: {
    provider: string;
    repo: string;
    repoId: string;
    category: string;
    categoryId: string;
  };
}

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  show: boolean;
}

export interface NavigationConfig {
  brand: { showLogo: boolean; logo: string; logoImage: string; name: string };
  items: NavItem[];
  search: { enabled: boolean };
  themeToggle: { enabled: boolean };
}

export interface HomepageConfig {
  hero: { title: string; highlight: string; subtitle: string };
  featured: { enabled: boolean; title: string; posts: string[] };
  latest: { title: string };
}

export interface ContactItem {
  label: string;
  url?: string;
  icon: string;
  show: boolean;
  action: 'link' | 'copy';
  copyText?: string;
  text?: string;
}

export interface SupportMethod {
  text: string;
  icon: string;
  image: string;
}

export interface AboutConfig {
  hero: { title: string; subtitle: string };
  profile: { name: string; role: string; bio: string; avatar: string; skills: string[] };
  stats: { enabled: boolean };
  blog: { enabled: boolean; title: string; content: string };
  contacts: { enabled: boolean; items: ContactItem[] };
  support: { enabled: boolean; title: string; description: string; methods: SupportMethod[] };
}

export interface FooterConfig {
  brand: { logo: string; logoImage: string; name: string; description: string };
  socialLinks: { name: string; url: string; icon: string; show: boolean }[];
  copyright: { text: string };
}

export interface ToolConfig {
  id: string;
  name: string;
  description: string;
  icon: string;
  component: string;
  color: string;
  show: boolean;
}

export interface ToolsConfig {
  title: string;
  subtitle: string;
  tools: ToolConfig[];
}

export interface CategoryConfig {
  id: string;
  name: string;
  slug: string;
  description: string;
  order: number;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  category: string;
  tags: string[];
  readingTime: number;
  cover: string | null;
  content: string;
  categorySlug: string;
}

export interface LabelConfig {
  [key: string]: { id: string; name: string; slug: string; color: string };
}

export interface PostsData {
  categories: CategoryConfig[];
  articles: Article[];
  labels: LabelConfig;
}

export interface AllConfig {
  site: SiteConfig;
  navigation: NavigationConfig;
  homepage: HomepageConfig;
  about: AboutConfig;
  footer: FooterConfig;
  tools: ToolsConfig;
  aboutContent: Record<string, string>;
}
