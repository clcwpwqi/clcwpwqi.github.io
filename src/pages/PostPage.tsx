/**
 * 文章详情页
 */
import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Tag, 
  ArrowLeft, 
  User,
  ChevronLeft,
  ChevronRight 
} from 'lucide-react';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { TableOfContents } from '@/components/TableOfContents';
import { GiscusComments } from '@/components/GiscusComments';
import { SEO } from '@/components/SEO';
import { getPostBySlug, posts } from '@/data/posts';
import { formatDate, getRelativeTime } from '@/utils/helpers';
import { siteConfig } from '@/data/config';
// import { cn } from '@/lib/utils';

export const PostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  // 滚动到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return <Navigate to="/404" replace />;
  }

  // 获取上一篇和下一篇文章
  const currentIndex = posts.findIndex((p) => p.id === post.id);
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        keywords={post.tags}
        url={`/post/${post.slug}`}
        type="article"
      />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Back Link */}
            <Link
              to="/"
              className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              返回首页
            </Link>

            {/* Category */}
            <Link
              to={`/categories?category=${post.category}`}
              className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-4"
            >
              {post.category}
            </Link>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center">
                <User className="w-4 h-4 mr-1.5" />
                {post.author || siteConfig.author}
              </span>
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1.5" />
                {formatDate(post.date)}
                <span className="ml-2 text-gray-400">
                  ({getRelativeTime(post.date)})
                </span>
              </span>
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1.5" />
                {post.readingTime} 分钟阅读
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/?tag=${encodeURIComponent(tag)}`}
                  className="inline-flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-sm hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <motion.article
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-1 max-w-3xl"
            >
              <MarkdownRenderer content={post.content} />

              {/* Comments */}
              <GiscusComments term={post.slug} />
            </motion.article>

            {/* Sidebar */}
            <aside className="lg:w-64 hidden lg:block">
              <div className="sticky top-24">
                <TableOfContents content={post.content} />
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-8 bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            {prevPost ? (
              <Link
                to={`/post/${prevPost.slug}`}
                className="flex items-start p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow"
              >
                <ChevronLeft className="w-5 h-5 text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">
                    上一篇
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
                    {prevPost.title}
                  </span>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextPost ? (
              <Link
                to={`/post/${nextPost.slug}`}
                className="flex items-start p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow text-right"
              >
                <div className="flex-1">
                  <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">
                    下一篇
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
                    {nextPost.title}
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 mt-0.5 ml-2 flex-shrink-0" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>
    </>
  );
};
