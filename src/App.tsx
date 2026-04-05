/**
 * 主应用组件
 */
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
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

// 处理 404 重定向的路由组件
function RedirectHandler() {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // 检查是否是首页，且是否有重定向路径
    if (location.pathname === '/') {
      const redirectPath = sessionStorage.getItem('spa_redirect_path');
      if (redirectPath) {
        sessionStorage.removeItem('spa_redirect_path');
        // 使用 setTimeout 确保导航在组件挂载后执行
        setTimeout(() => {
          navigate(redirectPath, { replace: true });
        }, 0);
      }
    }
  }, [navigate, location]);
  
  return null;
}

function AppContent() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header onSearchClick={() => setSearchOpen(true)} />
      
      {/* 全局重定向处理器 */}
      <RedirectHandler />
      
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
  );
}

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
