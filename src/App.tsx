import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RequestProvider } from './context/RequestContext';
import { ToastContainer } from './components/ui/Toast';
import Layout from './components/layout/Layout';
import ScrollToTop from './components/layout/ScrollToTop';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CategoryPage from './pages/CategoryPage';
import CategoriesPage from './pages/CategoriesPage';
import HowItWorksPage from './pages/HowItWorksPage';
import SourcingPage from './pages/SourcingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import RequestListPage from './pages/RequestListPage';
import AdminDemoPage from './pages/AdminDemoPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <RequestProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/produits" element={<ProductsPage />} />
            <Route path="/produits/:slug" element={<ProductDetailPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/categories/:slug" element={<CategoryPage />} />
            <Route path="/comment-ca-marche" element={<HowItWorksPage />} />
            <Route path="/sourcing" element={<SourcingPage />} />
            <Route path="/a-propos" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/mes-demandes" element={<RequestListPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="/admin-demo" element={<AdminDemoPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </RequestProvider>
  );
}
