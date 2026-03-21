/**
 * 页脚组件
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Mail, Rss, Heart } from 'lucide-react';
import { siteConfig, socialLinks } from '@/data/config';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-xl font-bold text-gray-900 dark:text-white mb-4"
            >
              <span className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm">
                D
              </span>
              <span>DevBlog</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
              {siteConfig.description}
            </p>
            <div className="flex items-center space-x-4">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 dark:text-gray-400 hover:text-blue-400 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              <a
                href={socialLinks.email}
                className="text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href={socialLinks.rss}
                className="text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors"
                aria-label="RSS"
              >
                <Rss className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              快速链接
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  首页
                </Link>
              </li>
              <li>
                <Link 
                  to="/categories" 
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  分类
                </Link>
              </li>
              <li>
                <Link 
                  to="/tools" 
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  工具箱
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  关于
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              联系方式
            </h3>
            <ul className="space-y-3">
              <li className="text-gray-600 dark:text-gray-400">
                作者：{siteConfig.author}
              </li>
              <li>
                <a 
                  href={socialLinks.email}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a 
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  GitHub 主页
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              &copy; {currentYear} {siteConfig.title}. All rights reserved.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
              Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> using React & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
