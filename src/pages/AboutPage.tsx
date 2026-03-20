/**
 * 关于与联系页面
 */
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Github, 
  Twitter, 
  Code,
  Heart,
  Coffee
} from 'lucide-react';
import { SEO } from '@/components/SEO';
import { siteConfig } from '@/data/config';
import { posts } from '@/data/posts';

export const AboutPage: React.FC = () => {
  const stats = {
    posts: posts.length,
    categories: new Set(posts.map((p) => p.category)).size,
    tags: new Set(posts.flatMap((p) => p.tags)).size,
  };

  const skills = [
    'React', 'TypeScript', 'Node.js', 'Next.js', 
    'Tailwind CSS', 'Docker', 'Git', 'Linux'
  ];

  return (
    <>
      <SEO
        title="关于"
        description={`关于 ${siteConfig.author} 和 ${siteConfig.title} 博客`}
        url="/about"
      />

      {/* Hero */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {siteConfig.author.charAt(0)}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {siteConfig.author}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              全栈开发者，热爱开源，喜欢分享技术文章和开发经验
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {stats.posts}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">文章</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {stats.categories}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">分类</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">
                {stats.tags}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">标签</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-12 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  关于我
                </h2>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    我是一名热爱技术的全栈开发者，拥有多年的 Web 开发经验。
                    专注于前端开发，同时也熟悉后端技术和 DevOps 实践。
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
                    创建这个博客的初衷是记录学习过程中的点滴，分享技术心得，
                    同时也希望能够帮助到其他开发者。我相信知识的价值在于分享，
                    通过写作可以更好地理解和巩固所学的内容。
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
                    在工作之余，我喜欢研究新技术，参与开源项目，
                    也热衷于探索各种开发工具来提升效率。
                  </p>
                </div>
              </motion.div>

              {/* Skills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Code className="w-6 h-6 mr-2 text-blue-500" />
                  技术栈
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* About Blog */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  关于博客
                </h2>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {siteConfig.title} 是一个基于 React + TypeScript + Tailwind CSS
                    构建的静态博客。博客采用纯前端架构，部署在 GitHub Pages 上，
                    无需后端服务器即可运行。
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
                    博客的主要功能包括：文章展示、分类标签、搜索功能、
                    暗黑模式、响应式设计等。同时还提供了一系列实用的开发工具。
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
                    如果你对这个博客的源码感兴趣，可以在 GitHub 上找到它，
                    欢迎 Star 和 Fork。
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  联系方式
                </h3>
                <div className="space-y-4">
                  <a
                    href={siteConfig.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <Github className="w-5 h-5 mr-3" />
                    GitHub
                  </a>
                  {siteConfig.twitter && (
                    <a
                      href={siteConfig.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      <Twitter className="w-5 h-5 mr-3" />
                      Twitter
                    </a>
                  )}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="flex items-center text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Mail className="w-5 h-5 mr-3" />
                    {siteConfig.email}
                  </a>
                </div>
              </motion.div>

              {/* Support */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white"
              >
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <Heart className="w-5 h-5 mr-2" />
                  支持我
                </h3>
                <p className="text-blue-100 text-sm mb-4">
                  如果我的文章对你有帮助，欢迎通过以下方式支持我：
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Coffee className="w-4 h-4 mr-2" />
                    在 GitHub 上 Star 这个项目
                  </li>
                  <li className="flex items-center">
                    <Coffee className="w-4 h-4 mr-2" />
                    分享文章给更多开发者
                  </li>
                  <li className="flex items-center">
                    <Coffee className="w-4 h-4 mr-2" />
                    在评论区留下你的反馈
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
