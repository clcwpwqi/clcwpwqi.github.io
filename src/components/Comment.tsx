import { useEffect, useRef } from 'react';
import { getConfig } from '../data';

export default function Comment() {
  const containerRef = useRef<HTMLDivElement>(null);
  const config = getConfig();
  const { comment } = config.site;

  useEffect(() => {
    if (comment.provider !== 'giscus' || !containerRef.current) return;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', comment.repo);
    script.setAttribute('data-repo-id', comment.repoId);
    script.setAttribute('data-category', comment.category);
    script.setAttribute('data-category-id', comment.categoryId);
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', 'preferred_color_scheme');
    script.setAttribute('data-lang', 'zh-CN');
    script.crossOrigin = 'anonymous';
    script.async = true;

    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [comment]);

  return <div ref={containerRef} className="mt-12" />;
}
