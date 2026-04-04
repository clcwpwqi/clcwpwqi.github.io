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
    contacts: {
      items: Array<{
        type: string;
        label: string;
        value: string;
        url: string;
        icon: string;
        show: boolean;
      }>;
    };
    support: {
      enabled: boolean;
      title: string;
      description: string;
      methods: Array<{
        icon: string;
        text: string;
      }>;
      donate?: {
        enabled: boolean;
        title: string;
        description: string;
        methods: Array<{
          name: string;
          image: string;
        }>;
      };
    };
    blog: {
      enabled: boolean;
      title: string;
      content: string;
    };
    stats: {
      enabled: boolean;
    };
  };
  tools: {
    title: string;
    subtitle: string;
    tools: Array<Tool & { enabled: boolean; color: string }>;
  };
  footer: {
    brand: {
      showLogo: boolean;
      showDescription: boolean;
    };
    links: {
      enabled: boolean;
      title: string;
      items: Array<{ label: string; href: string }>;
    };
    contact: {
      enabled: boolean;
      title: string;
      showEmail: boolean;
      showGithub: boolean;
      showTwitter: boolean;
    };
    social: {
      enabled: boolean;
      items: Array<{ type: string; show: boolean }>;
    };
    copyright: {
      enabled: boolean;
      showYear: boolean;
      customText: string;
      showCredit: boolean;
    };
  };
  navigation: {
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
  contacts: {
    items: []
  },
  support: {
    enabled: true,
    title: '支持我',
    description: '',
    methods: []
  },
  blog: {
    enabled: true,
    title: '关于博客',
    content: ''
  },
  stats: {
    enabled: true
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
    showDescription: true
  },
  links: {
    enabled: true,
    title: '快速链接',
    items: []
  },
  contact: {
    enabled: true,
    title: '联系方式',
    showEmail: true,
    showGithub: true,
    showTwitter: true
  },
  social: {
    enabled: true,
    items: []
  },
  copyright: {
    enabled: true,
    showYear: true,
    customText: '',
    showCredit: true
  }
};

// 导航配置
export const navigationConfig = configs.navigation || {
  items: [],
  search: { enabled: true },
  themeToggle: { enabled: true }
};

// 显示的导航链接
export const navLinks = navigationConfig.items?.filter(item => item.show) || [];

// 社交链接配置
export const socialLinks = {
  github: siteConfig.github,
  twitter: siteConfig.twitter,
  email: siteConfig.email ? `mailto:${siteConfig.email}` : '',
  rss: '/rss.xml',
};
