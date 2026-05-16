import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Calendar, Clock, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { getArticleBySlug, getArticles, getConfig, getLabels } from '../data';
import PageTransition from '../components/PageTransition';
import CodeBlock from '../components/CodeBlock';
import TableOfContents from '../components/TableOfContents';
import Comment from '../components/Comment';

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = getArticleBySlug(slug || '');
  const articles = getArticles();
  const labels = getLabels();
  const config = getConfig();

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">文章未找到</h1>
        <Link to="/" className="text-blue-600 hover:underline">返回首页</Link>
      </div>
    );
  }

  // Previous and next articles
  const idx = articles.findIndex(a => a.slug === article.slug);
  const prev = idx < articles.length - 1 ? articles[idx + 1] : null;
  const next = idx > 0 ? articles[idx - 1] : null;

  return (
    <PageTransition>
      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Cover image */}
        {article.cover && (
          <div className="mb-8 rounded-xl overflow-hidden">
            <img src={article.cover} alt={article.title} className="w-full aspect-video object-cover" />
          </div>
        )}

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">{article.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {article.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {article.readingTime} 分钟阅读
            </span>
            <Link
              to={`/category/${article.categorySlug}`}
              className="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium"
            >
              {article.category}
            </Link>
          </div>
          {article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {article.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium"
                  style={{ backgroundColor: `${labels[tag]?.color || '#3B82F6'}20`, color: labels[tag]?.color || '#3B82F6' }}
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* TOC sidebar */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-24">
              <TableOfContents content={article.content} />
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <ReactMarkdown
                components={{
                  code({ className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    const language = match ? match[1] : undefined;
                    const content = String(children).replace(/\n$/, '');
                    if (className?.includes('inline')) {
                      return <code className={className} {...props}>{children}</code>;
                    }
                    return <CodeBlock language={language}>{content}</CodeBlock>;
                  },
                  img({ src, alt }) {
                    return <img src={src} alt={alt} className="rounded-lg mx-auto" />;
                  },
                }}
              >
                {article.content}
              </ReactMarkdown>
            </div>

            {/* Prev/Next */}
            <nav className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row gap-4">
              {prev ? (
                <Link to={`/article/${prev.slug}`} className="flex-1 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                    <ChevronLeft className="w-3 h-3" /> 上一篇
                  </div>
                  <p className="text-sm font-medium line-clamp-1">{prev.title}</p>
                </Link>
              ) : <div className="flex-1" />}
              {next ? (
                <Link to={`/article/${next.slug}`} className="flex-1 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-right">
                  <div className="flex items-center justify-end gap-1 text-xs text-gray-500 mb-1">
                    下一篇 <ChevronRight className="w-3 h-3" />
                  </div>
                  <p className="text-sm font-medium line-clamp-1">{next.title}</p>
                </Link>
              ) : <div className="flex-1" />}
            </nav>

            {/* Comments */}
            <Comment />
          </div>
        </div>
      </article>
    </PageTransition>
  );
}
