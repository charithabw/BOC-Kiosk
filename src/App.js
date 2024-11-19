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
// import ProductDetail from './Products/ProductDetail';

function ConditionalComponents() {
  const location = useLocation(); // Get the current location path
  // Check if the current path is the home ('/') path
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
      <LanguageProvider> {/* Ensure that LanguageProvider wraps Routes */}
        <div className="body_class">
          <ConditionalComponents /> {/* Conditional rendering based on route */}
          <img src={logo} alt="Capp" className="home_img" />
          <Routes>
            <Route path="/" element={<LanguageSelector />} />
            <Route path="/categories" element={<CategoryPage />} />
            {/* <Route path="/product-details/:productId" element={<ProductDetail />} />  */}
          </Routes>
        </div>
      </LanguageProvider>
    </Router>
  );
}

export default App;
