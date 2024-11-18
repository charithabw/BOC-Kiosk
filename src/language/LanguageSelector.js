// LanguageSelector.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext';

function LanguageSelector() {
  const navigate = useNavigate();
  const { setLanguage } = useLanguage(); // Get setLanguage from context

  const handleLanguageSelection = (lang) => {
    setLanguage(lang);  // Set language in context
    navigate('/categories');  // Navigate to categories page
  };

  return (
    <div>
      <h3>Select Your Language</h3>
      <div className="btn-group">
        <a className="btn_sinhala" onClick={() => handleLanguageSelection('si')}>සිංහල</a>
        <a className="btn_english" onClick={() => handleLanguageSelection('en')}>English</a>
        <a className="btn_tamil" onClick={() => handleLanguageSelection('ta')}>தமிழ்</a>
      </div>
    </div>
  );
}

export default LanguageSelector;
