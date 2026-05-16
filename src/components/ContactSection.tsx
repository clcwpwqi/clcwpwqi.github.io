import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { getIcon } from '../utils/icons';
import type { ContactItem } from '../types';

interface ContactSectionProps {
  items: ContactItem[];
}

export default function ContactSection({ items }: ContactSectionProps) {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopy = async (text: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 2000);
    } catch {}
  };

  return (
    <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
      <h2 className="text-xl font-bold mb-4">联系方式</h2>
      <div className="space-y-3">
        {items.filter(i => i.show).map((item, idx) => {
          const IconComponent = getIcon(item.icon);
          return (
            <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
              <div className="flex items-center gap-3">
                <IconComponent className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              {item.action === 'copy' ? (
                <button
                  onClick={() => handleCopy(item.copyText || item.text || '', idx)}
                  className="p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {copiedIdx === idx ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              ) : item.url ? (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  访问 →
                </a>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
