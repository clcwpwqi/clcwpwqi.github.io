import { useState, useEffect, useRef } from 'react';
import { X, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getArticles, getLabels } from '../data';

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const articles = getArticles();
  const labels = getLabels();

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  const results = query.trim()
    ? articles.filter(a =>
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        a.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 10)
    : [];

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed inset-x-4 top-20 z-50 max-w-2xl mx-auto"
          >
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="flex items-center gap-3 px-4 border-b border-gray-200 dark:border-gray-800">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="搜索文章..."
                  className="flex-1 py-4 bg-transparent outline-none text-sm"
                />
                <button onClick={onClose} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              {query && (
                <div className="max-h-80 overflow-y-auto">
                  {results.length === 0 ? (
                    <p className="p-6 text-center text-gray-500 text-sm">没有找到相关文章</p>
                  ) : (
                    results.map(article => (
                      <Link
                        key={article.slug}
                        to={`/article/${article.slug}`}
                        onClick={onClose}
                        className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <h4 className="font-medium text-sm">{article.title}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">{article.excerpt}</p>
                        <div className="flex gap-1 mt-1">
                          {article.tags.slice(0, 3).map(tag => (
                            <span
                              key={tag}
                              className="text-xs px-1.5 py-0.5 rounded"
                              style={{ backgroundColor: `${labels[tag]?.color || '#3B82F6'}20`, color: labels[tag]?.color || '#3B82F6' }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
