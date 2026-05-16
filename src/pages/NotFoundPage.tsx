import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import PageTransition from '../components/PageTransition';

export default function NotFoundPage() {
  return (
    <PageTransition>
      <div className="max-w-md mx-auto px-4 py-24 text-center">
        <h1 className="text-6xl font-bold text-gray-200 dark:text-gray-800 mb-4">404</h1>
        <p className="text-xl font-medium mb-2">页面未找到</p>
        <p className="text-gray-500 dark:text-gray-400 mb-8">你访问的页面不存在或已被移除</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          <Home className="w-4 h-4" />
          返回首页
        </Link>
      </div>
    </PageTransition>
  );
}
