/**
 * Giscus 评论组件
 * 使用 GitHub Discussions 作为评论系统
 * 
 * 配置步骤：
 * 1. 访问 https://giscus.app/
 * 2. 按照指引配置你的仓库
 * 3. 将获取的配置填入 configs/site.json 中的 comment 部分
 * 
 * 注意：如果点击"使用 GitHub 登录"无响应，请检查：
 * 1. 仓库是否公开
 * 2. Discussions 功能是否已启用
 * 3. giscus app 是否已安装到仓库
 */
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { siteConfig } from '@/data/config';
import { MessageCircle, ExternalLink } from 'lucide-react';

interface GiscusCommentsProps {
  term?: string;
}

export const GiscusComments = ({ term }: GiscusCommentsProps) => {
  const { isDark } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (typeof document === 'undefined' || !containerRef.current) return;

    const { comment } = siteConfig;
    
    // 清空容器
    containerRef.current.innerHTML = '';

    // 检查配置是否完整
    if (!comment.repo || comment.repo === 'username/blog-comments') {
      console.warn('Giscus 评论未配置，请在 configs/site.json 中设置');
      setLoadError(true);
      return;
    }

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
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    // 错误处理
    script.onerror = () => {
      console.error('Giscus 加载失败');
      setLoadError(true);
    };

    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [term, isDark]);

  // 主题变化时更新 giscus 主题
  useEffect(() => {
    if (typeof document === 'undefined') return;
    
    const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
    if (iframe) {
      iframe.contentWindow?.postMessage(
        { giscus: { setConfig: { theme: isDark ? 'dark' : 'light' } } },
        'https://giscus.app'
      );
    }
  }, [isDark]);

  // 如果评论未配置，显示提示
  if (loadError) {
    return (
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <MessageCircle className="w-5 h-5 mr-2" />
          评论
        </h3>
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            评论系统尚未配置
          </p>
          <a
            href="https://giscus.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            了解如何配置 Giscus
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
        <MessageCircle className="w-5 h-5 mr-2" />
        评论
      </h3>
      <div ref={containerRef} className="giscus-container" />
    </div>
  );
};
