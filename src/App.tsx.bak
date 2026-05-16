/**
 * 主应用组件
 */
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
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
