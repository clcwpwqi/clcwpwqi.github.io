import { Link } from 'react-router-dom';
import { Calendar, Clock, Tag } from 'lucide-react';
import type { Article } from '../types';
import { getLabels } from '../data';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const labels = getLabels();

  return (
    <Link to={`/article/${article.slug}`} className="group block">
      <article className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all duration-300">
        {article.cover && (
          <div className="aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
            <img
              src={article.cover}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
        )}
        <div className="p-5">
          <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {article.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readingTime} 分钟
            </span>
          </div>
          {article.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {article.tags.slice(0, 3).map(tag => {
                const label = labels[tag];
                return (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
                    style={{ backgroundColor: `${label?.color || '#3B82F6'}20`, color: label?.color || '#3B82F6' }}
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
