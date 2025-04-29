import React from 'react';
import { useLanguage } from '../language/LanguageContext'; 
import { Button, Box } from '@mui/material';  // Import MUI components

function LanguageSelectorComponent() {
  const { language, setLanguage } = useLanguage(); 

  const handleLanguageSelection = (lang) => {
    setLanguage(lang); 
  };

  return (
    <Box className="language-selector" sx={{
      backgroundColor: '#F7F7F7',  // Light Gray background for the entire box
      padding: '10px',             // Padding to provide space inside the box
      borderRadius: '20px',        // Rounded corners for the box
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',  // Subtle shadow for depth
      display: 'flex',             // Ensures buttons are aligned inline
      justifyContent: 'center'     // Center aligns the buttons horizontally
    }}>
      <Button
        variant={language === 'en' ? 'contained' : 'outlined'}
        className="language-btn"
        onClick={() => handleLanguageSelection('en')}
        sx={{
          width: '100px',
          height: '40px',
          margin: '0 10px',
          borderRadius: '20px',
          backgroundColor: language === 'en' ? '#F0B310' : 'transparent',
          color: language === 'en' ? '#54004E' : '#F0B310',
          borderColor: '#F0B310',
          '&:hover': {
            backgroundColor: language === 'en' ? '#C8940E' : '#FFD87A',
            borderColor: '#C8940E'
          },
        }}
      >
        English
      </Button>

      <Button
        variant={language === 'si' ? 'contained' : 'outlined'}
        className="language-btn"
        onClick={() => handleLanguageSelection('si')}
        sx={{
          width: '100px',
          height: '40px',
          margin: '0 10px',
          borderRadius: '20px',
          backgroundColor: language === 'si' ? '#F0B310' : 'transparent',
          color: language === 'si' ? '#54004E' : '#F0B310',
          borderColor: '#F0B310',
          '&:hover': {
            backgroundColor: language === 'si' ? '#C8940E' : '#FFD87A',
            borderColor: '#C8940E'
          },
        }}
      >
        සිංහල
      </Button>

      <Button
        variant={language === 'ta' ? 'contained' : 'outlined'}
        className="language-btn"
        onClick={() => handleLanguageSelection('ta')}
        sx={{
          width: '100px',
          height: '40px',
          margin: '0 10px',
          borderRadius: '20px',
          backgroundColor: language === 'ta' ? '#F0B310' : 'transparent',
          color: language === 'ta' ? '#54004E' : '#F0B310',
          borderColor: '#F0B310',
          '&:hover': {
            backgroundColor: language === 'ta' ? '#C8940E' : '#FFD87A',
            borderColor: '#C8940E'
          },
        }}
      >
        தமிழ்
      </Button>
    </Box>
  );
}

export default LanguageSelectorComponent;
