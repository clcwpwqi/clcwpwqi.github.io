/**
 * 分类页面
 */
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Folder, Tag, FileText } from 'lucide-react';
import { PostCard } from '@/components/PostCard';
import { TagCloud } from '@/components/TagCloud';
import { SEO } from '@/components/SEO';
import { posts, categories, tags, getPostsByCategory, getPostsByTag, getCategoryBySlug } from '@/data/posts';

export const CategoriesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category');
  const activeTag = searchParams.get('tag');

  // 计算每个标签的文章数
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    tags.forEach((tag) => {
      counts[tag.name] = posts.filter((p) =>
        p.tags.some((t) => t.toLowerCase() === tag.name.toLowerCase())
      ).length;
    });
    return counts;
  }, []);

  // 筛选文章
  const filteredPosts = useMemo(() => {
    if (activeCategory) {
      return getPostsByCategory(activeCategory);
    }
    if (activeTag) {
      return getPostsByTag(activeTag);
    }
    return posts;
  }, [activeCategory, activeTag]);

  const handleCategoryClick = (slug: string) => {
    searchParams.delete('tag');
    if (activeCategory === slug) {
      searchParams.delete('category');
    } else {
      searchParams.set('category', slug);
    }
    setSearchParams(searchParams);
  };

  const handleTagClick = (tag: string) => {
    searchParams.delete('category');
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

  // 获取当前分类名称
  const activeCategoryName = activeCategory 
    ? getCategoryBySlug(activeCategory)?.name || activeCategory
    : null;

  return (
    <>
      <SEO
        title="分类"
        description="按分类和标签浏览文章"
        url="/categories"
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
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              文章分类
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              按分类和标签浏览所有文章，快速找到你感兴趣的内容
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Folder className="w-5 h-5 mr-2 text-blue-500" />
            所有分类
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => handleCategoryClick(category.slug)}
                className={`p-6 rounded-xl text-left transition-all duration-200 ${
                  activeCategory === category.slug
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-blue-50 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                    <p className={`text-sm ${
                      activeCategory === category.slug
                        ? 'text-blue-100'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {category.description}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    activeCategory === category.slug
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}>
                    {posts.filter((p) => p.category === category.slug).length}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Tags */}
      <section className="py-12 bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Tag className="w-5 h-5 mr-2 text-purple-500" />
            热门标签
          </h2>
          <TagCloud
            tags={tags.map(t => t.name)}
            activeTag={activeTag || undefined}
            onTagClick={handleTagClick}
            showCount
            tagCounts={tagCounts}
          />
        </div>
      </section>

      {/* Filtered Posts */}
      {(activeCategory || activeTag) && (
        <section className="py-12 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                {activeCategory
                  ? `分类: ${activeCategoryName}`
                  : `标签: ${activeTag}`}
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({filteredPosts.length} 篇)
                </span>
              </h2>
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                清除筛选
              </button>
            </div>

            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  该分类下暂无文章
                </p>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};
