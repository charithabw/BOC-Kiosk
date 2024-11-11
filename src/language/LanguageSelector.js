// LanguageSelector.js

import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function LanguageSelector({ onLanguageSelect }) {
  const [currentWord, setCurrentWord] = useState("Select The Language");
  const words = [
    "Select The Language",
    "භාෂාව තෝරන්න",
    "மொழியைத் தேர்ந்தெடுக்கவும்",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWord(prevWord => words[(words.indexOf(prevWord) + 1) % words.length]);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const navigate = useNavigate(); // Hook for navigation

  const handleLanguageSelection = (language) => {
    onLanguageSelect(language); // Set the language in state
    navigate('/categories', { state: { language } }); // Navigate to categories page
  };

  return (
    <div>
      <h3>{currentWord}</h3>
      <div className="btn-group">
        <a className="btn_sinhala" onClick={() => handleLanguageSelection('si')}>සිංහල</a>
        <a className="btn_english" onClick={() => handleLanguageSelection('en')}>English</a>
        <a className="btn_tamil" onClick={() => handleLanguageSelection('ta')}>தமிழ்</a>
      </div>
    </div>
  );
}

export default LanguageSelector;
