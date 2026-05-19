/**
 * 浏览器安全操作 Hooks
 * 提供 SSR 兼容的浏览器 API 操作
 */
import { useState, useEffect, useCallback, useRef } from 'react';
import browser from '@/lib/browser';

/**
 * 检查组件是否已挂载
 */
export const useMounted = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
};

/**
 * 安全的 useEffect - 仅在浏览器环境执行
 */
export const useBrowserEffect = (
  effect: () => void | (() => void),
  deps?: React.DependencyList
) => {
  const mounted = useMounted();

  useEffect(() => {
    if (mounted && browser.isBrowser) {
      return effect();
    }
  }, [mounted, ...(deps || [])]);
};

/**
 * 滚动位置 Hook
 */
export const useScrollPosition = (threshold: number = 0) => {
  const [scrolled, setScrolled] = useState(false);

  useBrowserEffect(() => {
    const handleScroll = () => {
      const { y } = browser.getScrollPosition();
      setScrolled(y > threshold);
    };

    // 初始检查
    handleScroll();

    // 添加监听
    const cleanup = browser.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return cleanup;
  }, [threshold]);

  return scrolled;
};

/**
 * 本地存储 Hook
 */
export const useLocalStorage = <T,>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void, () => void] => {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // 从本地存储读取
  useBrowserEffect(() => {
    try {
      const item = browser.getLocalStorage()?.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
    }
  }, [key]);

  // 设置值
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        browser.getLocalStorage()?.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  // 删除值
  const removeValue = useCallback(() => {
    try {
      browser.getLocalStorage()?.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
};

/**
 * 复制到剪贴板 Hook
 */
export const useClipboard = () => {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (text: string) => {
    const success = await browser.copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
    return success;
  }, []);

  return { copied, copy };
};

/**
 * 主题检测 Hook
 */
export const useTheme = () => {
  const [isDark, setIsDark] = useState(false);

  useBrowserEffect(() => {
    setIsDark(browser.hasClass('dark'));
  });

  return isDark;
};

/**
 * 移动端检测 Hook
 */
export const useMobile = (breakpoint: number = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useBrowserEffect(() => {
    const checkMobile = () => {
      setIsMobile(browser.getViewportWidth() < breakpoint);
    };

    checkMobile();

    const cleanup = browser.addEventListener('resize', checkMobile, {
      passive: true,
    });

    return cleanup;
  }, [breakpoint]);

  return isMobile;
};

/**
 * 滚动到顶部
 */
export const useScrollToTop = () => {
  const scrollToTop = useCallback((behavior: 'smooth' | 'auto' = 'smooth') => {
    browser.scrollToTop(behavior);
  }, []);

  return scrollToTop;
};

/**
 * Intersection Observer Hook
 */
export const useIntersectionObserver = (
  options?: IntersectionObserverInit
): [React.RefObject<HTMLElement | null>, boolean] => {
  const ref = useRef<HTMLElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useBrowserEffect(() => {
    if (!ref.current || !browser.hasIntersectionObserver()) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [options?.root, options?.rootMargin, options?.threshold]);

  return [ref, isIntersecting];
};
