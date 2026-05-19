/**
 * 浏览器兼容的 hooks
 */
export {
  useMounted,
  useBrowserEffect,
  useScrollPosition,
  useLocalStorage,
  useClipboard,
  useTheme,
  useMobile,
  useScrollToTop,
  useIntersectionObserver,
} from './useBrowserHooks';

// Re-export individual hooks for backwards compatibility
export { useScrollPosition as default } from './useBrowserHooks';
