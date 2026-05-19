/**
 * 底部导航组件
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, Mail, Send, MessageCircle, Heart } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { footerConfig, siteConfig } from '@/data/config';
import { cn } from '@/lib/utils';
import browser from '@/lib/browser';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Github,
  Mail,
  Send,
  MessageCircle,
  Heart,
};

export const Footer = () => {
  const { isDark } = useTheme();
  const [copied, setCopied] = useState(false);
  const { brand, socialLinks, quickLinks, contactInfo, copyright, madeWith } = footerConfig;

  const handleCopyWechat = async (text: string) => {
    const success = await browser.copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLinkClick = (url: string, action?: string, copyText?: string) => {
    if (action === 'copy' && copyText) {
      handleCopyWechat(copyText);
    } else if (url.startsWith('#')) {
      if (url === '#wechat') {
        handleCopyWechat(siteConfig.wechat || 'clcwpwqi');
      }
    }
  };

  const currentYear = new Date().getFullYear();
  const startYear = copyright.startYear || currentYear;

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          {brand.showLogo && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                  {brand.logo || 'C'}
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  {brand.name}
                </span>
              </div>
              {brand.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {brand.description}
                </p>
              )}
            </div>
          )}

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              快速链接
            </h3>
            <ul className="space-y-2">
              {quickLinks
                .filter((link) => link.show !== false)
                .map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              联系方式
            </h3>
            <ul className="space-y-2">
              {contactInfo.show &&
                contactInfo.items
                  .filter((item) => item.show !== false)
                  .map((item, index) => (
                    <li key={index}>
                      {item.url ? (
                        <a
                          href={item.url}
                          className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {item.label}
                        </span>
                      )}
                    </li>
                  ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              关注我
            </h3>
            <div className="flex space-x-4">
              {socialLinks
                .filter((link) => link.show !== false)
                .map((link) => {
                  const IconComponent = iconMap[link.icon];
                  return (
                    <button
                      key={link.name}
                      onClick={() => handleLinkClick(link.url, link.action, link.copyText)}
                      className={cn(
                        'p-2 rounded-lg transition-colors relative group',
                        isDark
                          ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      )}
                      aria-label={link.name}
                      title={link.tooltip || link.name}
                    >
                      {IconComponent && <IconComponent className="w-5 h-5" />}
                      {link.action === 'copy' && copied && (
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-green-500 text-white rounded whitespace-nowrap">
                          已复制!
                        </span>
                      )}
                    </button>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {copyright.show && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                © {startYear === currentYear ? currentYear : `${startYear}-${currentYear}`} {copyright.text}
              </p>
            )}
            {madeWith.show && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {madeWith.text}
              </p>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
