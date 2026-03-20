/**
 * Giscus 评论组件
 * 使用 GitHub Discussions 作为评论系统
 * 
 * 配置步骤：
 * 1. 访问 https://giscus.app/
 * 2. 按照指引配置你的仓库
 * 3. 将获取的配置填入 src/data/config.ts 中的 comment 部分
 */
import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { siteConfig } from '@/data/config';

interface GiscusCommentsProps {
  term?: string;
}

export const GiscusComments: React.FC<GiscusCommentsProps> = ({ term }) => {
  const { isDark } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (!containerRef.current || scriptLoaded.current) return;

    const { comment } = siteConfig;
    
    // 清空容器
    containerRef.current.innerHTML = '';

    // 创建 giscus 脚本
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', comment.repo);
    script.setAttribute('data-repo-id', comment.repoId || '');
    script.setAttribute('data-category', comment.category || 'Announcements');
    script.setAttribute('data-category-id', comment.categoryId || '');
    script.setAttribute('data-mapping', comment.mapping || 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', comment.reactionsEnabled ? '1' : '0');
    script.setAttribute('data-emit-metadata', comment.emitMetadata ? '1' : '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', isDark ? 'dark' : 'light');
    script.setAttribute('data-lang', 'zh-CN');
    script.setAttribute('crossorigin', comment.crossorigin || 'anonymous');
    script.async = true;

    containerRef.current.appendChild(script);
    scriptLoaded.current = true;

    return () => {
      scriptLoaded.current = false;
    };
  }, [term]);

  // 主题变化时更新 giscus 主题
  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
    if (iframe) {
      iframe.contentWindow?.postMessage(
        { giscus: { setConfig: { theme: isDark ? 'dark' : 'light' } } },
        'https://giscus.app'
      );
    }
  }, [isDark]);

  return (
    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        评论
      </h3>
      <div ref={containerRef} className="giscus-container" />
    </div>
  );
};
