import ReactMarkdown from 'react-markdown';
import { getConfig } from '../data';
import PageTransition from '../components/PageTransition';
import SupportSection from '../components/SupportSection';
import ContactSection from '../components/ContactSection';
import { getArticles, getCategories } from '../data';

export default function AboutPage() {
  const config = getConfig();
  const { about, aboutContent } = config;
  const articles = getArticles();
  const categories = getCategories();

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Hero */}
        <section className="text-center mb-12">
          <img
            src={about.profile.avatar}
            alt={about.profile.name}
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            onError={(e) => {
              const el = e.target as HTMLImageElement;
              el.style.display = 'none';
              el.nextElementSibling?.classList.remove('hidden');
            }}
          />
          <div className="hidden w-24 h-24 rounded-full mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
            {about.profile.name[0]?.toUpperCase()}
          </div>
          <h1 className="text-2xl font-bold mb-2">{about.hero.title}</h1>
          <p className="text-gray-600 dark:text-gray-400">{about.hero.subtitle}</p>
        </section>

        {/* Profile card */}
        <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 mb-8">
          <h2 className="text-lg font-bold mb-3">{about.profile.name}</h2>
          <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">{about.profile.role}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{about.profile.bio}</p>
          {about.profile.skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {about.profile.skills.map(skill => (
                <span key={skill} className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium">
                  {skill}
                </span>
              ))}
            </div>
          )}
        </section>

        {/* Stats */}
        {about.stats.enabled && (
          <section className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 text-center">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{articles.length}</p>
              <p className="text-xs text-gray-500 mt-1">文章</p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 text-center">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{categories.length}</p>
              <p className="text-xs text-gray-500 mt-1">分类</p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 text-center col-span-2 sm:col-span-1">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {articles.reduce((sum, a) => sum + (a.readingTime || 0), 0)}
              </p>
              <p className="text-xs text-gray-500 mt-1">总阅读时长(分钟)</p>
            </div>
          </section>
        )}

        {/* About Me */}
        {aboutContent?.['about-me'] && (
          <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 mb-8">
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <ReactMarkdown>{aboutContent['about-me']}</ReactMarkdown>
            </div>
          </section>
        )}

        {/* About Blog */}
        {about.blog.enabled && (
          <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 mb-8">
            <h2 className="text-lg font-bold mb-3">{about.blog.title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">{about.blog.content}</p>
          </section>
        )}

        {/* Skills */}
        {aboutContent?.['skills'] && (
          <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 mb-8">
            <h2 className="text-lg font-bold mb-3">技术栈</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <ReactMarkdown>{aboutContent['skills']}</ReactMarkdown>
            </div>
          </section>
        )}

        {/* Author Tags */}
        {aboutContent?.['author-tags'] && (
          <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 mb-8">
            <h2 className="text-lg font-bold mb-3">标签</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <ReactMarkdown>{aboutContent['author-tags']}</ReactMarkdown>
            </div>
          </section>
        )}

        {/* Contacts */}
        {about.contacts.enabled && (
          <div className="mb-8">
            <ContactSection items={about.contacts.items} />
          </div>
        )}

        {/* Support */}
        {about.support.enabled && (
          <SupportSection
            title={about.support.title}
            description={about.support.description}
            methods={about.support.methods}
          />
        )}
      </div>
    </PageTransition>
  );
}
