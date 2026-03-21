/**
 * 主应用组件
 */
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SearchModal } from '@/components/SearchModal';
import { ScrollToTop } from '@/components/ScrollToTop';
import { HomePage } from '@/pages/HomePage';
import { PostPage } from '@/pages/PostPage';
import { CategoriesPage } from '@/pages/CategoriesPage';
import { ToolsPage } from '@/pages/ToolsPage';
import { AboutPage } from '@/pages/AboutPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import './App.css';

// 路由恢复组件（用于处理 GitHub Pages 的 404 重定向）
function RouteRestorer() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 检查 URL 中是否有 redirect 参数
    const params = new URLSearchParams(location.search);
    const redirectPath = params.get('redirect');

    if (redirectPath) {
      // 清除 URL 中的 redirect 参数，并跳转到原始路径
      const cleanUrl = window.location.origin + redirectPath + location.hash;
      window.history.replaceState(null, '', cleanUrl);
      // 使用 React Router 进行跳转
      navigate(redirectPath, { replace: true });
    }
  }, [location, navigate]);

  return null;
}

function App() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          {/* 路由恢复组件必须放在 Router 内部、Routes 之前 */}
          <RouteRestorer />
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
            <Header onSearchClick={() => setSearchOpen(true)} />
            
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/post/:slug" element={<PostPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/tools" element={<ToolsPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/404" element={<NotFoundPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>

            <Footer />
            <ScrollToTop />
            <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
          </div>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;