/**
 * 浏览器 API 统一封装
 * 提供 SSR/客户端兼容的浏览器 API 访问接口
 */

export const browser = {
  /**
   * 检查是否在浏览器环境
   */
  isBrowser: typeof window !== 'undefined' && typeof document !== 'undefined',

  /**
   * 获取 window 对象
   */
  getWindow: () => {
    if (typeof window === 'undefined') {
      return null;
    }
    return window;
  },

  /**
   * 获取 document 对象
   */
  getDocument: () => {
    if (typeof document === 'undefined') {
      return null;
    }
    return document;
  },

  /**
   * 获取 localStorage
   */
  getLocalStorage: () => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage;
      }
      return null;
    } catch {
      return null;
    }
  },

  /**
   * 获取 sessionStorage
   */
  getSessionStorage: () => {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        return window.sessionStorage;
      }
      return null;
    } catch {
      return null;
    }
  },

  /**
   * 获取 navigator 对象
   */
  getNavigator: () => {
    if (typeof navigator === 'undefined') {
      return null;
    }
    return navigator;
  },

  /**
   * 检查是否支持 clipboard API
   */
  hasClipboard: () => {
    return typeof navigator !== 'undefined' && typeof navigator.clipboard !== 'undefined';
  },

  /**
   * 检查是否支持 IntersectionObserver
   */
  hasIntersectionObserver: () => {
    if (typeof window === 'undefined') return false;
    return typeof window.IntersectionObserver !== 'undefined';
  },

  /**
   * 检查是否支持 MutationObserver
   */
  hasMutationObserver: () => {
    if (typeof window === 'undefined') return false;
    return typeof window.MutationObserver !== 'undefined';
  },

  /**
   * 获取屏幕宽度
   */
  getScreenWidth: () => {
    if (typeof window === 'undefined') return 0;
    return window.screen?.width || 0;
  },

  /**
   * 获取屏幕高度
   */
  getScreenHeight: () => {
    if (typeof window === 'undefined') return 0;
    return window.screen?.height || 0;
  },

  /**
   * 获取视口宽度
   */
  getViewportWidth: () => {
    if (typeof window === 'undefined') return 0;
    return window.innerWidth || document.documentElement?.clientWidth || 0;
  },

  /**
   * 获取视口高度
   */
  getViewportHeight: () => {
    if (typeof window === 'undefined') return 0;
    return window.innerHeight || document.documentElement?.clientHeight || 0;
  },

  /**
   * 获取滚动位置
   */
  getScrollPosition: () => {
    if (typeof window === 'undefined') return { x: 0, y: 0 };
    return {
      x: window.scrollX || window.pageXOffset || document.documentElement?.scrollLeft || 0,
      y: window.scrollY || window.pageYOffset || document.documentElement?.scrollTop || 0,
    };
  },

  /**
   * 滚动到指定位置
   */
  scrollTo: (x: number, y: number, behavior: 'smooth' | 'auto' = 'auto') => {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: y, left: x, behavior });
  },

  /**
   * 滚动到顶部
   */
  scrollToTop: (behavior: 'smooth' | 'auto' = 'auto') => {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: 0, behavior });
  },

  /**
   * 复制文本到剪贴板
   */
  copyToClipboard: async (text: string): Promise<boolean> => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        return true;
      }
      
      // 降级方案
      if (typeof document !== 'undefined') {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        textArea.style.top = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const success = document.execCommand('copy');
        document.body.removeChild(textArea);
        return success;
      }
      
      return false;
    } catch {
      return false;
    }
  },

  /**
   * 获取 DOM 元素
   */
  getElementById: (id: string) => {
    if (typeof document === 'undefined') return null;
    return document.getElementById(id);
  },

  /**
   * 查询选择器
   */
  querySelector: (selector: string) => {
    if (typeof document === 'undefined') return null;
    return document.querySelector(selector);
  },

  /**
   * 查询所有选择器
   */
  querySelectorAll: (selector: string) => {
    if (typeof document === 'undefined') return [];
    return Array.from(document.querySelectorAll(selector));
  },

  /**
   * 添加事件监听器
   */
  addEventListener: (
    event: string,
    handler: EventListenerOrEventListenerObject,
    options?: AddEventListenerOptions
  ) => {
    if (typeof window === 'undefined') return () => {};
    window.addEventListener(event, handler, options);
    return () => {
      window.removeEventListener(event, handler, options);
    };
  },

  /**
   * 获取 body 元素
   */
  getBody: () => {
    if (typeof document === 'undefined') return null;
    return document.body;
  },

  /**
   * 添加 class 到 body
   */
  addBodyClass: (className: string) => {
    if (typeof document === 'undefined' || !document.body) return;
    document.body.classList.add(className);
  },

  /**
   * 移除 class 从 body
   */
  removeBodyClass: (className: string) => {
    if (typeof document === 'undefined' || !document.body) return;
    document.body.classList.remove(className);
  },

  /**
   * 切换 class
   */
  toggleBodyClass: (className: string, force?: boolean) => {
    if (typeof document === 'undefined' || !document.body) return;
    document.body.classList.toggle(className, force);
  },

  /**
   * 获取根元素
   */
  getRoot: () => {
    if (typeof document === 'undefined') return null;
    return document.documentElement;
  },

  /**
   * 检查是否有某个 class
   */
  hasClass: (className: string) => {
    if (typeof document === 'undefined') return false;
    return document.documentElement.classList.contains(className);
  },

  /**
   * 添加 class
   */
  addClass: (className: string) => {
    if (typeof document === 'undefined') return;
    document.documentElement.classList.add(className);
  },

  /**
   * 移除 class
   */
  removeClass: (className: string) => {
    if (typeof document === 'undefined') return;
    document.documentElement.classList.remove(className);
  },

  /**
   * 监听系统主题变化
   */
  matchMedia: (query: string) => {
    if (typeof window === 'undefined') return null;
    return window.matchMedia(query);
  },
};

export default browser;
