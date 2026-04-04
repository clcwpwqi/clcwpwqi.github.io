/**
 * 页脚组件
 */
import { Link } from 'react-router-dom';
import { Github, Twitter, Mail, Rss, Heart } from 'lucide-react';
import { siteConfig, footerConfig, navLinks } from '@/data/config';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Github,
  Twitter,
  Mail,
  Rss,
};

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { brand, links, contact, social, copyright } = footerConfig;

  // 过滤显示的社交链接
  const enabledSocialLinks = social.items?.filter(item => item.show) || [];

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          {brand.showLogo && (
            <div className="col-span-1 md:col-span-2">
              <Link 
                to="/" 
                className="flex items-center space-x-2 text-xl font-bold text-gray-900 dark:text-white mb-4"
              >
                <span className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm">
                  {siteConfig.logo || siteConfig.title.charAt(0)}
                </span>
                <span>{siteConfig.title}</span>
              </Link>
              {brand.showDescription && (
                <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
                  {siteConfig.description}
                </p>
              )}
              {social.enabled && enabledSocialLinks.length > 0 && (
                <div className="flex items-center space-x-4">
                  {enabledSocialLinks.map(item => {
                    const Icon = iconMap[item.type === 'github' ? 'Github' : item.type === 'twitter' ? 'Twitter' : item.type === 'email' ? 'Mail' : 'Rss'];
                    const href = item.type === 'github' ? siteConfig.github : 
                                 item.type === 'twitter' ? siteConfig.twitter : 
                                 item.type === 'email' ? `mailto:${siteConfig.email}` : 
                                 '/rss.xml';
                    if (!href) return null;
                    return (
                      <a
                        key={item.type}
                        href={href}
                        target={item.type !== 'email' && item.type !== 'rss' ? '_blank' : undefined}
                        rel={item.type !== 'email' && item.type !== 'rss' ? 'noopener noreferrer' : undefined}
                        className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        aria-label={item.type}
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
          {links.enabled && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                {links.title}
              </h3>
              <ul className="space-y-3">
                {(links.items || navLinks).map((link) => (
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
          )}

          {/* Contact */}
          {contact.enabled && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                {contact.title}
              </h3>
              <ul className="space-y-3">
                <li className="text-gray-600 dark:text-gray-400">
                  作者：{siteConfig.author}
                </li>
                {contact.showEmail && siteConfig.email && (
                  <li>
                    <a 
                      href={`mailto:${siteConfig.email}`}
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {siteConfig.email}
                    </a>
                  </li>
                )}
                {contact.showGithub && siteConfig.github && (
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
        {copyright.enabled && (
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {copyright.customText || `© ${copyright.showYear ? currentYear : ''} ${siteConfig.title}. All rights reserved.`}
              </p>
              {copyright.showCredit && (
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> using React & Tailwind CSS
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};
