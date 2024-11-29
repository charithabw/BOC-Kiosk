import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { LanguageProvider } from './language/LanguageContext';
import LanguageSelector from './language/LanguageSelector';
import CategoryPage from './categories/categoryPage';
import VideoBackground from './components/VideoBackground';
import Clock from './components/Clock';
import logo from './assets/images/logo333.png';
import "./style/App.css";
import "./style/categories.css";
import ProductsPage from './Products/ProductsPage';
import ProductDetailsPage from './ProductDetails/Product-Details';
import FAQPage from './faq/FAQPage';
import DemoVideoPage from './demoVideo/DemoVideoPage';
import FeedbackPage from './feedback/FeedbackPage';

function ConditionalComponents() {
  const location = useLocation(); 

  const isHome = location.pathname === '/';

  return (
    <>
      {isHome && <VideoBackground />}
      {isHome && <Clock />}
    </>
  );
}

function App() {
  return (
    <Router>
      <LanguageProvider> 
        <div className="body_class">
          <ConditionalComponents /> {/* Conditional rendering based on route */}
          <img src={logo} alt="Capp" className="home_img" />
          <Routes>
            <Route path="/" element={<LanguageSelector />} />
            <Route path="/categories" element={<CategoryPage />} />
            <Route path="/products/:categoryId" element={<ProductsPage />} />  
            <Route path="/product-details/:productId" element={<ProductDetailsPage />} />
            <Route path="/faq/:productId" element={<FAQPage />} />
            <Route path="/demo-video" element={<DemoVideoPage />} />
            <Route path="/feedback/:productName" element={<FeedbackPage />} />
            
          
          </Routes>
        </div>
      </LanguageProvider>
    </Router>
  );
}

export default App;
