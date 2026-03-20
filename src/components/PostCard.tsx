/**
 * 文章卡片组件
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Tag, ArrowRight } from 'lucide-react';
import type { Post } from '@/types';
import { formatDate, getRelativeTime } from '@/utils/helpers';
// import { cn } from '@/lib/utils';

interface PostCardProps {
  post: Post;
  variant?: 'default' | 'compact' | 'featured';
}

export const PostCard: React.FC<PostCardProps> = ({ post, variant = 'default' }) => {
  if (variant === 'compact') {
    return (
      <article className="group">
        <Link to={`/post/${post.slug}`} className="block">
          <div className="flex items-start space-x-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                {post.title}
              </h3>
              <div className="flex items-center space-x-3 mt-1 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-1" />
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1" />
                  {post.readingTime} 分钟
                </span>
              </div>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  if (variant === 'featured') {
    return (
      <article className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
        <Link to={`/post/${post.slug}`} className="block">
          {/* Cover Image Placeholder */}
          <div className="aspect-[16/9] bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-white/30 text-6xl font-bold">
              {post.title.charAt(0)}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center space-x-2 mb-3">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white">
                  {post.category}
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white line-clamp-2">
                {post.title}
              </h3>
            </div>
          </div>
          
          <div className="p-6">
            <p className="text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1.5" />
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1.5" />
                  {post.readingTime} 分钟
                </span>
              </div>
              <span className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                阅读更多
                <ArrowRight className="w-4 h-4 ml-1" />
              </span>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  // Default variant
  return (
    <article className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700">
      <Link to={`/post/${post.slug}`} className="block">
        {/* Cover Image Placeholder */}
        <div className="aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500 text-4xl font-bold">
            {post.title.charAt(0)}
          </div>
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
              {post.category}
            </span>
          </div>
        </div>
        
        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-2">
            {post.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
            {post.excerpt}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
          
          {/* Meta */}
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-3">
              <span className="flex items-center">
                <Calendar className="w-3.5 h-3.5 mr-1" />
                {getRelativeTime(post.date)}
              </span>
              <span className="flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1" />
                {post.readingTime} 分钟
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};
