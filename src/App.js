import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { LanguageProvider } from "./language/LanguageContext";
import CategoryPage from "./categories/categoryPage";
import Clock from "./components/Clock";
import logo from "./assets/images/logo333.png";
import "./style/App.css";
import "./style/categories.css";
import ProductsPage from "./Products/ProductsPage";
import ProductDetailsPage from "./ProductDetails/ProductDetailsPage";

import FAQPage from "./faq/FAQPage";
import DemoVideoPage from "./demoVideo/DemoVideoPage";
import FeedbackPage from "./feedback/FeedbackPage";
import LanguageSelectorComponent from "./components/LanguageSelectorComponent";

import MainPage from "./Home/MainPage";
import HomePage from "./Home/HomePage";
import ExchangeRates from "./components/ExchangeRates";
import NavigationButtons from "./components/NavigationButtons";

function App() {
  return (
    <Router>
      <LanguageProvider>
        <div className="body_class">
          <header className="header">
            <img src={logo} alt="Capp" className="home_img" />
            <LanguageSelectorComponent />
            <Clock className="clock" />
          </header>

          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/main/:category?" element={<MainPage />} />
              <Route path="/products/:categoryId" element={<ProductsPage />} />

              <Route
                path="/product-details/:productId"
                element={<ProductDetailsPage />}
              />
              <Route path="/faq/:productId" element={<FAQPage />} />
              <Route path="/demo-video" element={<DemoVideoPage />} />
              <Route path="/feedback/:productName" element={<FeedbackPage />} />
            </Routes>
          </main>
          <NavigationButtons />

          <footer className="footer">
            <ExchangeRates />
          </footer>
        </div>
      </LanguageProvider>
    </Router>
  );
}

export default App;
