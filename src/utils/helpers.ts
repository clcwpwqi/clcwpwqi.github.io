/**
 * 工具函数库
 */
import browser from '@/lib/browser';

/**
 * 复制到剪贴板
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  return browser.copyToClipboard(text);
};

/**
 * 滚动到顶部
 */
export const scrollToTop = (smooth = true): void => {
  browser.scrollToTop(smooth ? 'smooth' : 'auto');
};

/**
 * 检查元素是否在视口内
 */
export const isInViewport = (element: HTMLElement): boolean => {
  if (!browser.isBrowser) return false;

  try {
    const rect = element.getBoundingClientRect();
    const viewportWidth = browser.getViewportWidth();
    const viewportHeight = browser.getViewportHeight();

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= viewportHeight &&
      rect.right <= viewportWidth
    );
  } catch {
    return false;
  }
};

/**
 * 本地存储封装
 */
export const storage = {
  get: <T,>(key: string, defaultValue: T): T => {
    try {
      const ls = browser.getLocalStorage();
      if (!ls) return defaultValue;

      const item = ls.getItem(key);
      return item ? (JSON.parse(item) as T) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  set: <T,>(key: string, value: T): void => {
    try {
      const ls = browser.getLocalStorage();
      if (ls) {
        ls.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error('Storage set error:', error);
    }
  },

  remove: (key: string): void => {
    try {
      const ls = browser.getLocalStorage();
      if (ls) {
        ls.removeItem(key);
      }
    } catch (error) {
      console.error('Storage remove error:', error);
    }
  },

  clear: (): void => {
    try {
      const ls = browser.getLocalStorage();
      if (ls) {
        ls.clear();
      }
    } catch (error) {
      console.error('Storage clear error:', error);
    }
  },
};

/**
 * 防抖函数
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
};

/**
 * 节流函数
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean = false;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

/**
 * 格式化日期
 */
export const formatDate = (
  date: string | Date,
  options?: Intl.DateTimeFormatOptions
): string => {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  return new Intl.DateTimeFormat('zh-CN', options || defaultOptions).format(
    dateObj
  );
};

/**
 * 计算阅读时间
 */
export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

/**
 * 生成随机 ID
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

/**
 * 延迟函数
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * 安全的 JSON 解析
 */
export const safeJsonParse = <T,>(
  json: string,
  fallback: T
): T => {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
};

/**
 * 检查是否为移动设备
 */
export const isMobile = (): boolean => {
  return browser.getViewportWidth() < 768;
};

/**
 * 检查是否支持触摸
 */
export const supportsTouch = (): boolean => {
  const nav = browser.getNavigator();
  return !!(
    nav && ('ontouchstart' in nav || navigator.maxTouchPoints > 0)
  );
};

/**
 * 获取相对时间
 */
export const getRelativeTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffSeconds < 60) {
    return '刚刚';
  } else if (diffMinutes < 60) {
    return `${diffMinutes} 分钟前`;
  } else if (diffHours < 24) {
    return `${diffHours} 小时前`;
  } else if (diffDays < 7) {
    return `${diffDays} 天前`;
  } else if (diffWeeks < 4) {
    return `${diffWeeks} 周前`;
  } else if (diffMonths < 12) {
    return `${diffMonths} 个月前`;
  } else {
    return `${diffYears} 年前`;
  }
};
