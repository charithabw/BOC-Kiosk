import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { LanguageProvider } from "./language/LanguageContext";
import { ThemeProvider } from "./theme/ThemeContext";
import CategoryPage from "./categories/categoryPage";
import ProductsPage from "./Products/ProductsPage";
import ProductDetailsPage from "./ProductDetails/ProductDetailsPage";
import FAQPage from "./faq/FAQPage";
import DemoVideoPage from "./demoVideo/DemoVideoPage";
import FeedbackPage from "./feedback/FeedbackPage";
import MainPage from "./Home/MainPage";
import HomePage from "./Home/HomePage";
import Home1 from "./Home/Home1";
import NavigationButtons from "./components/NavigationButtons";
import MainPage1 from "./Home/MainPage1";
import Home2 from "./Home/Home2";
import Main5 from "./Home/Main5";

// Import our new components
import Header from "./components/Header";
import Footer from "./components/Footer";
import VideoBackground from "./components/VideoBackground";
import FooterMarquee from "./components/FooterMarquee";

// Create a separate component for the main layout
function MainLayout() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <VideoBackground />

      <main
        style={{
          flex: 1,
          padding: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Routes>
          <Route path="/" element={<Home1 />} />
          <Route path="/main/:category?" element={<MainPage />} />
          <Route path="/main1/:category?" element={<MainPage1 />} />
          <Route path="/main5/:category?" element={<Main5 />} />
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
      <FooterMarquee />
    </div>
  );
}

function App() {
  return (
    <Router>
      <LanguageProvider>
        <ThemeProvider>
          <Routes>
            <Route path="/home1" element={<Home1 />} />
            <Route path="/home2" element={<Home2 />} />
            <Route path="/*" element={<MainLayout />} />
          </Routes>
          <FooterMarquee />
        </ThemeProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;
