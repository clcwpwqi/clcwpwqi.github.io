/**
 * 404 页面
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, AlertCircle } from 'lucide-react';
import { SEO } from '@/components/SEO';

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <SEO
        title="404 - 页面未找到"
        description="抱歉，您访问的页面不存在"
        noindex
      />

      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center px-4"
        >
          {/* 404 Icon */}
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <AlertCircle className="w-16 h-16 text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-6xl md:text-8xl font-bold text-gray-900 dark:text-white mb-4">
            404
          </h1>

          {/* Subtitle */}
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            页面未找到
          </h2>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
            抱歉，您访问的页面不存在或已被移除。
            请检查 URL 是否正确，或返回首页浏览其他内容。
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
            >
              <Home className="w-5 h-5 mr-2" />
              返回首页
            </Link>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full font-medium border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Search className="w-5 h-5 mr-2" />
              搜索文章
            </Link>
          </div>

          {/* Decorative Elements */}
          <div className="mt-16 flex justify-center space-x-4 text-gray-300 dark:text-gray-700">
            <div className="w-2 h-2 rounded-full bg-current" />
            <div className="w-2 h-2 rounded-full bg-current" />
            <div className="w-2 h-2 rounded-full bg-current" />
          </div>
        </motion.div>
      </div>
    </>
  );
};
