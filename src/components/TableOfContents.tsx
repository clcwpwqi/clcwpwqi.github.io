import { useMemo, useEffect } from 'react';

interface TOCProps {
  content: string;
}

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ content }: TOCProps) {
  const headings = useMemo(() => {
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const headings: Heading[] = [];
    let match;
    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      headings.push({ id, text, level });
    }
    return headings;
  }, [content]);

  if (headings.length === 0) return null;

  return (
    <nav className="space-y-1">
      <h3 className="font-semibold text-sm text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">目录</h3>
      {headings.map(h => (
        <a
          key={h.id}
          href={`#${h.id}`}
          className={`block py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate ${
            h.level === 2 ? 'ml-4' : h.level === 3 ? 'ml-8' : h.level >= 4 ? 'ml-12' : ''
          }`}
        >
          {h.text}
        </a>
      ))}
    </nav>
  );
}
