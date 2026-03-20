/**
 * 首页
 */
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Tag } from 'lucide-react';
import { PostCard } from '@/components/PostCard';
import { TagCloud } from '@/components/TagCloud';
import { SEO } from '@/components/SEO';
import { posts, getAllTags } from '@/data/posts';
import { categories } from '@/data/config';
import { cn } from '@/lib/utils';

export const HomePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTag = searchParams.get('tag');
  const activeCategory = searchParams.get('category');

  const allTags = getAllTags();

  // 筛选文章
  const filteredPosts = useMemo(() => {
    let result = [...posts];

    if (activeTag) {
      result = result.filter((post) =>
        post.tags.some((tag) => tag.toLowerCase() === activeTag.toLowerCase())
      );
    }

    if (activeCategory) {
      result = result.filter((post) => post.category === activeCategory);
    }

    return result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [activeTag, activeCategory]);

  // 精选文章（最新的3篇）
  const featuredPosts = useMemo(() => {
    return posts
      .slice()
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);
  }, []);

  const handleTagClick = (tag: string) => {
    if (activeTag?.toLowerCase() === tag.toLowerCase()) {
      searchParams.delete('tag');
    } else {
      searchParams.set('tag', tag);
    }
    setSearchParams(searchParams);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  return (
    <>
      <SEO 
        title="首页" 
        url="/"
        keywords={['博客', '技术', '前端', '后端', 'DevOps']}
      />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              探索技术的
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                无限可能
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
              分享前端、后端、DevOps 等技术文章，提供实用的开发工具，
              助力开发者提升效率。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#latest"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                浏览文章
              </a>
              <a
                href="/tools"
                className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full font-medium border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                开发工具
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      {!activeTag && !activeCategory && (
        <section className="py-12 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
              <Sparkles className="w-6 h-6 mr-2 text-yellow-500" />
              精选文章
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <PostCard post={post} variant="default" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section id="latest" className="py-12 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Posts Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {activeTag ? `标签: ${activeTag}` : activeCategory ? '分类文章' : '最新文章'}
                </h2>
                {(activeTag || activeCategory) && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    清除筛选
                  </button>
                )}
              </div>

              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <PostCard post={post} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-gray-500 dark:text-gray-400">
                    没有找到相关文章
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:w-80 space-y-8">
              {/* Categories */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  分类
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <a
                      key={category.slug}
                      href={`/categories?category=${category.slug}`}
                      className={cn(
                        'flex items-center justify-between p-3 rounded-lg transition-colors',
                        activeCategory === category.slug
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      )}
                    >
                      <span>{category.name}</span>
                      <span className="text-sm text-gray-400">
                        {posts.filter((p) => p.category === category.slug).length}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Tag className="w-5 h-5 mr-2" />
                  标签
                </h3>
                <TagCloud
                  tags={allTags}
                  activeTag={activeTag || undefined}
                  onTagClick={handleTagClick}
                />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};
