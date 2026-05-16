import { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getConfig } from '../data';
import ThemeToggle from './ThemeToggle';
import { getIcon } from '../utils/icons';

export default function Header() {
  const config = getConfig();
  const nav = config.navigation;
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const visibleItems = nav.items.filter(item => item.show);

  return (
    <header className="sticky top-0 z-50 glass border-b border-gray-200/50 dark:border-gray-800/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2">
            {nav.brand.showLogo && nav.brand.logoImage ? (
              <img
                src={nav.brand.logoImage}
                alt={nav.brand.name}
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : (
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                {nav.brand.logo}
              </span>
            )}
            <span className="font-bold text-lg hidden sm:inline">{nav.brand.name}</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {visibleItems.map(item => {
              const IconComponent = getIcon(item.icon);
              const isActive = location.hash === `#${item.href}` || (item.href === '/' && (location.hash === '' || location.hash === '#/'));
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {nav.search?.enabled && (
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" title="搜索">
                <Search className="w-5 h-5" />
              </button>
            )}
            {nav.themeToggle?.enabled && <ThemeToggle />}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="菜单"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-gray-200/50 dark:border-gray-800/50"
          >
            <nav className="px-4 py-3 space-y-1">
              {visibleItems.map(item => {
                const IconComponent = getIcon(item.icon);
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <IconComponent className="w-5 h-5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
