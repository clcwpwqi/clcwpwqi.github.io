/**
 * 主应用组件
 */
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
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
  
  useEffect(() => {
    const redirectPath = sessionStorage.getItem('redirectPath');
    if (redirectPath) {
      sessionStorage.removeItem('redirectPath');
      navigate(redirectPath, { replace: true });
    }
  }, [navigate]);
  
  return null;
}

function AppContent() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header onSearchClick={() => setSearchOpen(true)} />
      
      <main>
        <Routes>
          <Route path="/" element={<><RedirectHandler /><HomePage /></>} />
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
