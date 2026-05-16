import { useEffect, useRef, useState } from 'react';
import hljs from 'highlight.js';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  language?: string;
  children: string;
}

export default function CodeBlock({ language, children }: CodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (codeRef.current && language) {
      const lang = hljs.getLanguage(language);
      if (lang) {
        codeRef.current.innerHTML = hljs.highlight(children, { language }).value;
      }
    }
  }, [children, language]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="relative group">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 rounded-md bg-gray-700/80 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-600"
        aria-label="复制代码"
      >
        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
      </button>
      {language && (
        <div className="absolute top-2 left-2 text-xs text-gray-400">{language}</div>
      )}
      <pre className="bg-gray-900 dark:bg-gray-950 text-gray-100 rounded-lg p-4 pt-8 overflow-x-auto">
        <code ref={codeRef} className={language ? `language-${language}` : ''}>
          {!language && children}
        </code>
      </pre>
    </div>
  );
}
