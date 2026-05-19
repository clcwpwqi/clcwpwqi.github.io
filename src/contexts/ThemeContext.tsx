/**
 * 主题上下文
 * 提供主题切换功能，支持亮色/暗色/系统主题
 */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import browser from '@/lib/browser';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 获取系统主题
const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  return mediaQuery.matches ? 'dark' : 'light';
};

// 从本地存储获取主题
const getStoredTheme = (): Theme => {
  const stored = browser.getLocalStorage()?.getItem('theme');
  if (stored === 'light' || stored === 'dark' || stored === 'system') {
    return stored;
  }
  return 'system';
};

// 保存主题到本地存储
const storeTheme = (theme: Theme) => {
  try {
    browser.getLocalStorage()?.setItem('theme', theme);
  } catch (error) {
    console.error('Failed to store theme:', error);
  }
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('system');
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 应用主题到 DOM
  const applyTheme = useCallback((newTheme: Theme) => {
    if (!browser.isBrowser) return;

    const root = browser.getRoot();
    if (!root) return;

    const effectiveTheme = newTheme === 'system' ? getSystemTheme() : newTheme;

    if (effectiveTheme === 'dark') {
      browser.addClass('dark');
      setIsDark(true);
    } else {
      browser.removeClass('dark');
      setIsDark(false);
    }
  }, []);

  // 设置主题
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    storeTheme(newTheme);
    applyTheme(newTheme);
  }, [applyTheme]);

  // 切换主题
  const toggleTheme = useCallback(() => {
    const newTheme = isDark ? 'light' : 'dark';
    setTheme(newTheme);
  }, [isDark, setTheme]);

  // 初始化主题
  useEffect(() => {
    const initialTheme = getStoredTheme();
    setThemeState(initialTheme);
    setMounted(true);
    
    // 延迟应用主题，确保 DOM 已准备好
    requestAnimationFrame(() => {
      applyTheme(initialTheme);
    });
  }, [applyTheme]);

  // 监听系统主题变化
  useEffect(() => {
    if (!mounted) return;

    const mediaQuery = browser.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };

    mediaQuery?.addEventListener('change', handleChange);

    return () => {
      mediaQuery?.removeEventListener('change', handleChange);
    };
  }, [theme, mounted, applyTheme]);

  // 确保始终提供 Context
  const value = {
    theme,
    setTheme,
    toggleTheme,
    isDark,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};

// Helper to get effective theme
export const useEffectiveTheme = (): 'light' | 'dark' => {
  const { theme, isDark } = useTheme();
  
  if (theme === 'system') {
    return isDark ? 'dark' : 'light';
  }
  
  return theme;
};

export default ThemeContext;
