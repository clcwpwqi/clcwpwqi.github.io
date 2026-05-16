/**
 * 关于与联系页面
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Github, 
  Twitter, 
  Code,
  Heart,
  Coffee,
  Globe,
  Linkedin,
  Rss,
  Star,
  Share2,
  MessageCircle,
  Send,
  Check,
  Tag
} from 'lucide-react';
import { SEO } from '@/components/SEO';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { siteConfig, aboutConfig } from '@/data/config';
import { posts } from '@/data/posts';

// 尝试导入关于页面 MD 内容
let aboutContent: any = null;
try {
  aboutContent = (await import('@/data/about-content.json')).default;
} catch {
  // 如果没有构建过的 about-content.json，使用空配置
  aboutContent = { aboutMe: null, aboutBlog: null, techStack: [], authorTags: [] };
}

// 图标映射
const contactIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Mail,
  Github,
  Twitter,
  Globe,
  Linkedin,
  Rss,
  Send,
  MessageCircle,
};

const supportIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Coffee,
  Heart,
  Star,
  Share2,
  MessageCircle,
};

export const AboutPage: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);
  
  const stats = {
    posts: posts.length,
    categories: new Set(posts.map((p) => p.category)).size,
    tags: new Set(posts.flatMap((p) => p.tags)).size,
  };

  // 从配置获取技能列表
  const skills = aboutConfig.profile.skills || [];
  
  // 从配置获取启用的联系方式
  const enabledContacts = aboutConfig.contacts.items?.filter(item => item.show) || [];
  
  // 从配置获取支持方式
  const supportMethods = aboutConfig.support.methods || [];
  
  // 处理复制操作
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(text);
      setTimeout(() => setCopied(null), 2000);
    });
  };

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
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold overflow-hidden">
              {aboutConfig.profile.avatar ? (
                <img 
                  src={aboutConfig.profile.avatar} 
                  alt={aboutConfig.profile.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                aboutConfig.profile.name?.charAt(0) || siteConfig.author?.charAt(0) || 'D'
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {aboutConfig.profile.name || siteConfig.author}
            </h1>
            {aboutConfig.profile.role && (
              <p className="text-lg text-blue-600 dark:text-blue-400 mb-4">
                {aboutConfig.profile.role}
              </p>
            )}
            {/* 作者标签 */}
            {aboutConfig.authorTags?.enabled && (aboutConfig.authorTags.tags?.length > 0 || (aboutContent?.authorTags?.items?.length > 0)) && (
              <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                {(aboutContent?.authorTags?.items?.length > 0 ? aboutContent.authorTags.items : aboutConfig.authorTags.tags).map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {aboutConfig.profile.bio || aboutConfig.hero.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      {aboutConfig.stats.enabled && (
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
      )}

      {/* About Content */}
      <section className="py-12 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About Me - 从 MD 文件读取 */}
              {aboutContent?.aboutMe && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm"
                >
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {aboutContent.aboutMe.title}
                  </h2>
                  <MarkdownRenderer content={aboutContent.aboutMe.content} />
                </motion.div>
              )}

              {/* Fallback: 如果没有 MD 文件，使用配置的 bio */}
              {!aboutContent?.aboutMe && aboutConfig.profile.bio && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm"
                >
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {aboutConfig.hero.title}
                  </h2>
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                      {aboutConfig.profile.bio}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Skills/技术栈 - 从 MD 文件或配置读取 */}
              {((aboutContent?.techStack?.items?.length > 0) || skills.length > 0) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm"
                >
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Code className="w-6 h-6 mr-2 text-blue-500" />
                    {aboutContent?.techStack?.title || '技术栈'}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {(aboutContent?.techStack?.items?.length > 0 ? aboutContent.techStack.items : skills).map((skill: string) => (
                      <span
                        key={skill}
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* About Blog - 从 MD 文件或配置读取 */}
              {aboutConfig.blog.enabled && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm"
                >
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {aboutContent?.aboutBlog?.title || aboutConfig.blog.title}
                  </h2>
                  {aboutContent?.aboutBlog?.content ? (
                    <MarkdownRenderer content={aboutContent.aboutBlog.content} />
                  ) : aboutConfig.blog.content ? (
                    <div className="prose dark:prose-invert max-w-none">
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                        {aboutConfig.blog.content}
                      </p>
                    </div>
                  ) : (
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
                  )}
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Contact Info */}
              {enabledContacts.length > 0 && (
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
                    {enabledContacts.map((contact, index) => {
                      const IconComponent = contactIconMap[contact.icon] || Globe;
                      
                      // 处理复制操作（微信公众号）
                      if (contact.action === 'copy' && contact.copyText) {
                        return (
                          <button
                            key={index}
                            onClick={() => handleCopy(contact.copyText!)}
                            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors w-full text-left relative"
                            title={contact.tooltip || `点击复制: ${contact.copyText}`}
                          >
                            <IconComponent className="w-5 h-5 mr-3" />
                            {contact.label}
                            {copied === contact.copyText && (
                              <span className="ml-2 inline-flex items-center text-green-500 text-sm">
                                <Check className="w-4 h-4 mr-1" />
                                已复制微信公众号名称
                              </span>
                            )}
                          </button>
                        );
                      }
                      
                      return (
                        <a
                          key={index}
                          href={contact.url}
                          target={contact.url?.startsWith('http') ? '_blank' : undefined}
                          rel={contact.url?.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          <IconComponent className="w-5 h-5 mr-3" />
                          {contact.label}
                        </a>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Support */}
              {aboutConfig.support.enabled && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white"
                >
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <Heart className="w-5 h-5 mr-2" />
                    {aboutConfig.support.title}
                  </h3>
                  <p className="text-blue-100 text-sm mb-4">
                    {aboutConfig.support.description}
                  </p>
                  {supportMethods.length > 0 && (
                    <div className="space-y-3 mt-4">
                      {supportMethods.map((method, index) => {
                        const IconComponent = supportIconMap[method.icon] || Heart;
                        
                        // 如果有图片（微信/支付宝二维码）
                        if (method.image) {
                          return (
                            <div key={index} className="flex flex-col items-center">
                              <span className="flex items-center text-sm mb-2">
                                <IconComponent className="w-4 h-4 mr-2" />
                                {method.text}
                              </span>
                              <img 
                                src={method.image} 
                                alt={method.text}
                                className="w-32 h-32 rounded-lg object-cover"
                              />
                            </div>
                          );
                        }
                        
                        // 如果有URL（爱发电）
                        if (method.url) {
                          return (
                            <a
                              key={index}
                              href={method.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-sm hover:text-blue-200 transition-colors"
                            >
                              <IconComponent className="w-4 h-4 mr-2" />
                              {method.text}
                            </a>
                          );
                        }
                        
                        return (
                          <div key={index} className="flex items-center text-sm">
                            <IconComponent className="w-4 h-4 mr-2" />
                            {method.text}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
