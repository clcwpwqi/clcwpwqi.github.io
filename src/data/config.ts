/**
 * 站点配置入口
 * 从 config.json 加载，该文件由 scripts/build-configs.js 生成
 */
import type { SiteConfig, Tool, NavLink } from '@/types';
import configData from './config.json';

// 类型断言确保数据格式正确
const configs = configData as {
  site: SiteConfig;
  homepage: {
    hero: {
      title: string;
      highlight: string;
      subtitle: string;
      buttons: Array<{
        label: string;
        href: string;
        variant: string;
        icon: string;
      }>;
    };
    featured: {
      enabled: boolean;
      title: string;
      posts: string[];
    };
    latest: {
      title: string;
      showCount: number;
    };
  };
  about: {
    hero: {
      title: string;
      subtitle: string;
    };
    profile: {
      name: string;
      role: string;
      bio: string;
      avatar: string;
      skills: string[];
    };
    stats: {
      enabled: boolean;
    };
    blog: {
      enabled: boolean;
      title: string;
      content: string;
    };
    contacts: {
      title: string;
      items: Array<{
        label: string;
        url: string;
        icon: string;
        show: boolean;
        action?: string;
        copyText?: string;
        tooltip?: string;
      }>;
    };
    support: {
      enabled: boolean;
      title: string;
      description: string;
      methods: Array<{
        text: string;
        icon: string;
        image?: string;
        url?: string;
      }>;
    };
  };
  tools: {
    title: string;
    subtitle: string;
    tools: Array<Tool & { enabled: boolean; color: string }>;
  };
  footer: {
    brand: {
      showLogo?: boolean;
      logo?: string;
      logoImage?: string;
      name?: string;
      description?: string;
    };
    socialLinks: Array<{
      name: string;
      url: string;
      icon: string;
      show: boolean;
      action?: string;
      copyText?: string;
      tooltip?: string;
    }>;
    quickLinks: Array<{
      label: string;
      href: string;
      show: boolean;
    }>;
    contactInfo: {
      show: boolean;
      title: string;
      items: Array<{
        label: string;
        url?: string;
        show: boolean;
      }>;
    };
    copyright: {
      show: boolean;
      startYear?: number;
      text?: string;
    };
    madeWith: {
      show: boolean;
      text?: string;
    };
  };
  navigation: {
    brand?: {
      showLogo?: boolean;
      logo?: string;
      name?: string;
    };
    items: Array<NavLink & { show: boolean }>;
    search: { enabled: boolean };
    themeToggle: { enabled: boolean };
  };
};

// 站点基础配置
export const siteConfig: SiteConfig = configs.site || {
  title: 'DevBlog',
  description: '一个简洁、现代的开发者博客',
  author: 'Developer',
  email: '',
  github: '',
  avatar: '/images/avatar.png',
  url: '',
  comment: {
    provider: 'giscus',
    repo: '',
    category: 'Announcements',
    mapping: 'pathname',
    reactionsEnabled: true,
    emitMetadata: false,
    theme: 'preferred_color_scheme',
    crossorigin: 'anonymous',
  }
};

// 首页配置
export const homepageConfig = configs.homepage || {
  hero: {
    title: '探索技术的',
    highlight: '无限可能',
    subtitle: '分享技术文章，提供实用工具',
    buttons: []
  },
  featured: {
    enabled: true,
    title: '精选文章',
    posts: []
  },
  latest: {
    title: '最新文章',
    showCount: 6
  }
};

// 关于页面配置
export const aboutConfig = configs.about || {
  hero: {
    title: '关于我',
    subtitle: ''
  },
  profile: {
    name: 'Developer',
    role: '开发者',
    bio: '',
    avatar: '/images/avatar.png',
    skills: []
  },
  stats: {
    enabled: true
  },
  blog: {
    enabled: true,
    title: '关于博客',
    content: ''
  },
  contacts: {
    title: '联系方式',
    items: []
  },
  support: {
    enabled: true,
    title: '支持我',
    description: '',
    methods: []
  }
};

// 工具箱配置
export const toolsConfig = configs.tools || {
  title: '开发者工具箱',
  subtitle: '实用的纯前端开发工具',
  tools: []
};

// 启用的工具列表
export const enabledTools = toolsConfig.tools?.filter(t => t.enabled) || [];

// 页脚配置
export const footerConfig = configs.footer || {
  brand: {
    showLogo: true,
    logo: 'D',
    name: 'DevBlog',
    description: '一个简洁、现代的开发者博客'
  },
  socialLinks: [],
  quickLinks: [],
  contactInfo: {
    show: true,
    title: '联系方式',
    items: []
  },
  copyright: {
    show: true,
    startYear: 2024,
    text: 'DevBlog. All rights reserved.'
  },
  madeWith: {
    show: true,
    text: 'Made with'
  }
};

// 导航配置
interface BrandConfig {
  showLogo?: boolean;
  logo?: string;
  logoImage?: string;
  name?: string;
  description?: string;
}

interface NavigationConfigWithBrand {
  brand?: BrandConfig;
  items: Array<{ label: string; href: string; icon?: string; show: boolean }>;
  search: { enabled: boolean };
  themeToggle: { enabled: boolean };
}

export const navigationConfig: NavigationConfigWithBrand = (configs.navigation || {
  items: [],
  search: { enabled: true },
  themeToggle: { enabled: true }
}) as NavigationConfigWithBrand;

// 显示的导航链接
export const navLinks = navigationConfig.items?.filter(item => item.show) || [];

// 社交链接配置
export const socialLinks = {
  github: siteConfig.github,
  twitter: siteConfig.twitter,
  email: siteConfig.email ? `mailto:${siteConfig.email}` : '',
  rss: '/rss.xml',
};
