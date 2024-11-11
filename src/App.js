// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import LanguageSelector from './language/LanguageSelector';
import CategoryPage from './categories/categoryPage';
import VideoBackground from './components/VideoBackground';
import Clock from './components/Clock';
import logo from './assets/images/logo333.png'; 
import "./style/App.css"
import "./style/categories.css";
import DigitalProductsPage from './digitalProducts/DigitalProductsPage';



// New Component for Conditional Rendering
function ConditionalComponents() {
  const location = useLocation(); // Access location here
  const showVideoAndClock = location.pathname === '/'; // Adjust condition as needed

  return (
      <>
          {showVideoAndClock && <VideoBackground />}
          {showVideoAndClock && <Clock />}
      </>
  );
}

function App() {
  const [language, setLanguage] = useState('en'); // Default language English

  const handleLanguageSelect = (lang) => {
      setLanguage(lang);
  };

  return (
      <Router>
          <div className="body_class">
              <ConditionalComponents />
              <img src={logo} alt="Capp" className="home_img" />
              <Routes>
                  <Route path="/" element={<LanguageSelector onLanguageSelect={handleLanguageSelect} />} />
                  <Route path="/categories" element={<CategoryPage language={language} />} />
                  <Route path="/digital-products" element={<DigitalProductsPage language={language} />} />
              </Routes>
          </div>
      </Router>
  );
}

export default App;