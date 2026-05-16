import { Link } from 'react-router-dom';
import { getConfig } from '../data';
import { getIcon } from '../utils/icons';

export default function Footer() {
  const config = getConfig();
  const footer = config.footer;

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              {footer.brand.logoImage ? (
                <img src={footer.brand.logoImage} alt={footer.brand.name} className="w-8 h-8 object-contain" />
              ) : (
                <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                  {footer.brand.logo}
                </span>
              )}
              <span className="font-bold text-lg">{footer.brand.name}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{footer.brand.description}</p>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold mb-3">关注我们</h3>
            <div className="flex gap-3">
              {footer.socialLinks.filter(l => l.show).map(link => {
                const IconComponent = getIcon(link.icon);
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    aria-label={link.name}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-3">快速链接</h3>
            <div className="space-y-2 text-sm">
              <Link to="/" className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">首页</Link>
              <Link to="/categories" className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">分类</Link>
              <Link to="/tools" className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">工具箱</Link>
              <Link to="/about" className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">关于</Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-500">
          {footer.copyright.text}
        </div>
      </div>
    </footer>
  );
}
