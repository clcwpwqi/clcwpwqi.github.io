/**
 * 标签云组件
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Tag } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TagCloudProps {
  tags: string[];
  activeTag?: string;
  onTagClick?: (tag: string) => void;
  showCount?: boolean;
  tagCounts?: Record<string, number>;
}

export const TagCloud: React.FC<TagCloudProps> = ({
  tags,
  activeTag,
  onTagClick,
  showCount = false,
  tagCounts = {},
}) => {
  // 根据使用频率计算标签大小
  const getTagSize = (tag: string) => {
    if (!showCount) return 'text-sm';
    
    const count = tagCounts[tag] || 1;
    const maxCount = Math.max(...Object.values(tagCounts), 1);
    const ratio = count / maxCount;

    if (ratio > 0.8) return 'text-lg font-semibold';
    if (ratio > 0.5) return 'text-base font-medium';
    return 'text-sm';
  };

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => {
        const isActive = activeTag?.toLowerCase() === tag.toLowerCase();
        
        if (onTagClick) {
          return (
            <button
              key={tag}
              onClick={() => onTagClick(tag)}
              className={cn(
                'inline-flex items-center px-3 py-1.5 rounded-full transition-all duration-200',
                getTagSize(tag),
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400'
              )}
            >
              <Tag className="w-3.5 h-3.5 mr-1.5" />
              {tag}
              {showCount && tagCounts[tag] && (
                <span className={cn(
                  'ml-1.5 text-xs',
                  isActive ? 'text-blue-200' : 'text-gray-500 dark:text-gray-400'
                )}>
                  ({tagCounts[tag]})
                </span>
              )}
            </button>
          );
        }

        return (
          <Link
            key={tag}
            to={`/?tag=${encodeURIComponent(tag)}`}
            className={cn(
              'inline-flex items-center px-3 py-1.5 rounded-full transition-all duration-200',
              getTagSize(tag),
              isActive
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400'
            )}
          >
            <Tag className="w-3.5 h-3.5 mr-1.5" />
            {tag}
            {showCount && tagCounts[tag] && (
              <span className="ml-1.5 text-xs text-gray-500 dark:text-gray-400">
                ({tagCounts[tag]})
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
};
