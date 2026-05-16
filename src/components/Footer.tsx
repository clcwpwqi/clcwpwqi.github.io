/**
 * 页脚组件
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Github, 
  Twitter, 
  Mail, 
  Rss, 
  Heart, 
  MessageCircle, 
  Send,
  Globe
} from 'lucide-react';
import { siteConfig, footerConfig, navLinks } from '@/data/config';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Github,
  Twitter,
  Mail,
  Rss,
  MessageCircle,
  Send,
  Globe,
};

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [copied, setCopied] = useState(false);
  const [logoError, setLogoError] = useState(false);
  
  const { brand, socialLinks, quickLinks, contactInfo, copyright, madeWith } = footerConfig;

  // 过滤显示的社交链接
  const enabledSocialLinks = socialLinks?.filter(item => item.show) || [];
  
  // 过滤显示的快速链接
  const enabledQuickLinks = quickLinks?.filter(item => item.show) || navLinks;

  // 处理复制微信号
  const handleCopyWechat = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          {brand?.showLogo !== false && (
            <div className="col-span-1 md:col-span-2">
              <Link 
                to="/" 
                className="flex items-center space-x-2 text-xl font-bold text-gray-900 dark:text-white mb-4"
              >
                <span className="w-8 h-8 flex items-center justify-center overflow-hidden rounded-lg">
                  {(brand as any)?.logoImage && !logoError ? (
                    <img 
                      src={(brand as any).logoImage} 
                      alt="Logo"
                      className="w-full h-full object-contain"
                      onError={() => setLogoError(true)}
                    />
                  ) : (
                    <span className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm">
                      {brand?.logo || siteConfig.logo || siteConfig.title.charAt(0)}
                    </span>
                  )}
                </span>
                <span>{brand?.name || siteConfig.title}</span>
              </Link>
              {brand?.description && (
                <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
                  {brand.description}
                </p>
              )}
              {enabledSocialLinks.length > 0 && (
                <div className="flex items-center space-x-4">
                  {enabledSocialLinks.map((item, index) => {
                    const Icon = iconMap[item.icon] || Globe;
                    
                    // 处理复制操作（微信公众号）
                    if (item.action === 'copy' && item.copyText) {
                      return (
                        <button
                          key={index}
                          onClick={() => handleCopyWechat(item.copyText!)}
                          className="text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors relative"
                          title={item.tooltip || `点击复制: ${item.copyText}`}
                        >
                          <Icon className="w-5 h-5" />
                          {copied && (
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-green-500 text-white text-xs rounded whitespace-nowrap">
                              已复制
                            </span>
                          )}
                        </button>
                      );
                    }
                    
                    return (
                      <a
                        key={index}
                        href={item.url}
                        target={item.url?.startsWith('http') ? '_blank' : undefined}
                        rel={item.url?.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        title={item.name}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              快速链接
            </h3>
            <ul className="space-y-3">
              {enabledQuickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          {contactInfo?.show !== false && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                {contactInfo?.title || '联系方式'}
              </h3>
              <ul className="space-y-3">
                <li className="text-gray-600 dark:text-gray-400">
                  作者：{siteConfig.author}
                </li>
                {siteConfig.email && (
                  <li>
                    <a 
                      href={`mailto:${siteConfig.email}`}
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {siteConfig.email}
                    </a>
                  </li>
                )}
                {siteConfig.github && (
                  <li>
                    <a 
                      href={siteConfig.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      GitHub 主页
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Bottom */}
        {copyright?.show !== false && (
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                © {copyright?.startYear || currentYear} {copyright?.text || `${siteConfig.title}. All rights reserved.`}
              </p>
              {madeWith?.show !== false && (
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  {madeWith?.text || 'Made with'} <Heart className="w-4 h-4 mx-1 text-red-500" /> using React & Tailwind CSS
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};
