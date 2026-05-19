/**
 * 关于与联系页面
 */
import { useState, useMemo } from 'react';
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
  Copy,
  Tag
} from 'lucide-react';
import { SEO } from '@/components/SEO';
import { siteConfig, aboutConfig } from '@/data/config';
import { posts } from '@/data/posts';
import aboutContentData from '@/data/about-content.json';

// 联系方式图标映射
const contactIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Mail, Github, Twitter, Globe, Linkedin, Rss, Send, MessageCircle,
};

// 支持方式图标映射
const supportIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Coffee, Heart, Star, Share2, MessageCircle,
};

export const AboutPage = () => {
  const [copied, setCopied] = useState<string | null>(null);
  
  const stats = useMemo(() => ({
    posts: posts.length,
    categories: new Set(posts.map((p) => p.category)).size,
    tags: new Set(posts.flatMap((p) => p.tags)).size,
  }), []);

  // 从配置获取
  const profile = aboutConfig.profile;
  const enabledContacts = aboutConfig.contacts.items?.filter(item => item.show) || [];
  const supportMethods = aboutConfig.support.methods || [];
  
  // 从 about-content.json 获取动态内容
  const aboutMeContent = (aboutContentData as Record<string, any>)['about-me'];
  const aboutBlogContent = (aboutContentData as Record<string, any>)['about-blog'];
  const skillsContent = (aboutContentData as Record<string, any>)['skills'];
  const authorTagsContent = (aboutContentData as Record<string, any>)['author-tags'];
  
  // 技能列表（优先使用配置文件，回退到 about-content.json）
  const skills = profile.skills?.length ? profile.skills : (skillsContent?.skills || []);
  
  // 作者标签
  const authorTags = authorTagsContent?.tags || [];

  const handleCopy = (text: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(text);
        setTimeout(() => setCopied(null), 2000);
      });
    } else {
      // 降级方案
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(text);
        setTimeout(() => setCopied(null), 2000);
      } catch (err) {
        console.error('复制失败', err);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <>
      <SEO
        title="关于"
        description={`关于 ${siteConfig.author} 和 ${siteConfig.title}`}
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
            {/* 头像 */}
            <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              {profile.avatar ? (
                <img 
                  src={profile.avatar} 
                  alt={profile.name}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              ) : (
                <span className="text-white text-3xl font-bold">
                  {(profile.name || siteConfig.author).charAt(0)}
                </span>
              )}
            </div>
            
            {/* 名称 */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {profile.name || siteConfig.author}
            </h1>
            
            {/* 角色 */}
            {profile.role && (
              <p className="text-lg text-blue-600 dark:text-blue-400 mb-4">
                {profile.role}
              </p>
            )}
            
            {/* 作者标签（新增栏目） */}
            {authorTags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {authorTags.map((tag: string, index: number) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      {aboutConfig.stats.enabled && (
        <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.posts}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">文章</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stats.categories}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">分类</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">{stats.tags}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">标签</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-12 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* 关于我 */}
              {aboutMeContent && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm"
                >
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {aboutMeContent.title || '关于我'}
                  </h2>
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                      {aboutMeContent.content}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* 技术栈 */}
              {skills.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm"
                >
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Code className="w-6 h-6 mr-2 text-blue-500" />
                    {skillsContent?.title || '技术栈'}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill: string) => (
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

              {/* 关于博客 */}
              {aboutBlogContent && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm"
                >
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {aboutBlogContent.title || '关于博客'}
                  </h2>
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                      {aboutBlogContent.content}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="space-y-8">
              
              {/* 联系方式 */}
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
                      const isCopy = contact.action === 'copy';
                      
                      if (isCopy) {
                        return (
                          <button
                            key={index}
                            onClick={() => handleCopy(contact.copyText || contact.label)}
                            className="w-full flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
                          >
                            <IconComponent className="w-5 h-5 mr-3 flex-shrink-0" />
                            <span className="flex-1">{contact.label}</span>
                            {copied === (contact.copyText || contact.label) ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4 text-gray-400" />
                            )}
                          </button>
                        );
                      }
                      
                      return (
                        <a
                          key={index}
                          href={contact.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          <IconComponent className="w-5 h-5 mr-3 flex-shrink-0" />
                          {contact.label}
                        </a>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* 支持我 */}
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
                    <div className="space-y-3">
                      {supportMethods.map((method, index) => {
                        const IconComponent = supportIconMap[method.icon] || Coffee;
                        return (
                          <div key={index} className="flex flex-col">
                            <div className="flex items-center text-sm mb-1">
                              <IconComponent className="w-4 h-4 mr-2" />
                              {method.text}
                            </div>
                            {method.image && (
                              <img 
                                src={method.image} 
                                alt={method.text}
                                className="w-32 h-32 rounded-lg object-cover mx-auto"
                                loading="lazy"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none';
                                }}
                              />
                            )}
                            {method.url && (
                              <a 
                                href={method.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-200 hover:text-white underline"
                              >
                                点击支持
                              </a>
                            )}
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
