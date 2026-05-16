import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticlesByCategory, getCategoryBySlug, getArticles, getLabels } from '../data';
import ArticleCard from '../components/ArticleCard';
import PageTransition from '../components/PageTransition';

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allArticles = getArticles();
  const labels = getLabels();

  let articles: typeof allArticles;
  let title: string;

  if (slug) {
    const category = getCategoryBySlug(slug);
    title = category?.name || '分类';
    articles = getArticlesByCategory(slug);
  } else {
    title = '全部分类';
    articles = allArticles;
  }

  if (selectedTag) {
    articles = articles.filter(a => a.tags.includes(selectedTag));
    title += ` / #${selectedTag}`;
  }

  // Get tags for current articles
  const currentTags = new Set<string>();
  articles.forEach(a => a.tags.forEach(t => currentTags.add(t)));

  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
          共 {articles.length} 篇文章
        </p>

        {/* Tag filter */}
        {currentTags.size > 1 && (
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                !selectedTag
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              全部
            </button>
            {Array.from(currentTags).map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
                style={{
                  backgroundColor: selectedTag === tag ? labels[tag]?.color : `${labels[tag]?.color || '#3B82F6'}20`,
                  color: selectedTag === tag ? '#fff' : labels[tag]?.color || '#3B82F6',
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map(article => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
        {articles.length === 0 && (
          <p className="text-center text-gray-500 py-12">暂无文章</p>
        )}
      </div>
    </PageTransition>
  );
}
