/**
 * 滚动位置 Hook
 */
import { useState, useEffect } from 'react';
import browser from '@/lib/browser';

export const useScrollPosition = (threshold: number = 0) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!browser.isBrowser) return;

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

export default useScrollPosition;
