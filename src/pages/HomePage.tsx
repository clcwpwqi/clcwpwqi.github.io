import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getConfig, getArticles, getCategories } from '../data';
import ArticleCard from '../components/ArticleCard';
import PageTransition from '../components/PageTransition';
import SearchModal from '../components/SearchModal';
import { getConfig as getConfigData } from '../data';

export default function HomePage() {
  const config = getConfigData();
  const { homepage } = config;
  const articles = getArticles();
  const categories = getCategories();
  const [searchOpen, setSearchOpen] = useState(false);

  const featuredSlugs = homepage.featured.posts;
  const featuredArticles = featuredSlugs.length
    ? articles.filter(a => featuredSlugs.includes(a.slug))
    : articles.slice(0, 6);

  const latestArticles = articles.slice(0, 10);

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative py-16 sm:py-24 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/20 dark:to-transparent" />
        <div className="relative max-w-3xl mx-auto px-4">
          <h1 className="text-3xl sm:text-5xl font-bold mb-4">
            {homepage.hero.title}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {homepage.hero.highlight}
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">{homepage.hero.subtitle}</p>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-12">
        <div className="flex flex-wrap justify-center gap-2">
          <Link
            to="/categories"
            className="px-4 py-2 rounded-full text-sm font-medium bg-blue-600 text-white"
          >
            全部
          </Link>
          {categories.map(cat => (
            <Link
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      {homepage.featured.enabled && featuredArticles.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-12">
          <h2 className="text-xl font-bold mb-6">{homepage.featured.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArticles.map(article => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* Latest */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">{homepage.latest.title}</h2>
          <button
            onClick={() => setSearchOpen(true)}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            搜索文章 →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestArticles.map(article => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
        {latestArticles.length === 0 && (
          <p className="text-center text-gray-500 py-12">还没有文章，快去添加第一篇吧！</p>
        )}
      </section>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </PageTransition>
  );
}
