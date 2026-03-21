/**
 * 标签云组件
 */
import { Link } from 'react-router-dom';
import { Tag } from 'lucide-react';
import { getTagByName } from '@/data/posts';

interface TagCloudProps {
  tags: string[];
  activeTag?: string;
  onTagClick?: (tag: string) => void;
  showCount?: boolean;
  tagCounts?: Record<string, number>;
}

export const TagCloud = ({
  tags,
  activeTag,
  onTagClick,
  showCount = false,
  tagCounts = {},
}: TagCloudProps) => {
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

  // 获取标签颜色
  const getTagColor = (tagName: string) => {
    const tag = getTagByName(tagName);
    return tag?.color || '#3B82F6';
  };

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => {
        const isActive = activeTag?.toLowerCase() === tag.toLowerCase();
        const tagColor = getTagColor(tag);
        
        if (onTagClick) {
          return (
            <button
              key={tag}
              onClick={() => onTagClick(tag)}
              className={`inline-flex items-center px-3 py-1.5 rounded-full transition-all duration-200 ${getTagSize(tag)} ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
              style={!isActive ? { borderLeft: `3px solid ${tagColor}` } : undefined}
            >
              <Tag className="w-3.5 h-3.5 mr-1.5" />
              {tag}
              {showCount && tagCounts[tag] !== undefined && (
                <span className={`ml-1.5 text-xs ${
                  isActive ? 'text-blue-200' : 'text-gray-500 dark:text-gray-400'
                }`}>
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
            className={`inline-flex items-center px-3 py-1.5 rounded-full transition-all duration-200 ${getTagSize(tag)} ${
              isActive
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400'
            }`}
            style={!isActive ? { borderLeft: `3px solid ${tagColor}` } : undefined}
          >
            <Tag className="w-3.5 h-3.5 mr-1.5" />
            {tag}
            {showCount && tagCounts[tag] !== undefined && (
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
