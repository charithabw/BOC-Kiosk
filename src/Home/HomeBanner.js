import React from 'react';
import { Box, Typography, useTheme as useMuiTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { useTheme } from '../theme/ThemeContext';
import { useLanguage } from '../language/LanguageContext';
import TouchAppIcon from '@mui/icons-material/TouchApp';

const BannerContainer = styled(motion.div)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4),
  color: theme.palette.mode === 'dark' ? 'white' : '#333',
  textAlign: 'center',
  transformStyle: 'preserve-3d',
  perspective: '1000px',
}));

const HomeBanner = () => {
  const { mode } = useTheme();
  const muiTheme = useMuiTheme();
  const { language } = useLanguage();
  
  // 3D floating elements animation
  const floatingElements = [...Array(20)].map((_, i) => {
    const size = Math.random() * 50 + 10;
    const depth = Math.random() * 100 - 50;
    const opacity = Math.random() * 0.3 + 0.1;
    
    return (
      <motion.div
        key={`float-${i}`}
        style={{
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: Math.random() > 0.5 ? '50%' : '5px',
          background: muiTheme.palette.primary.main,
          opacity,
          zIndex: depth < 0 ? -1 : 1,
          transform: `translateZ(${depth}px)`,
        }}
        animate={{
          x: [
            Math.random() * window.innerWidth,
            Math.random() * window.innerWidth,
            Math.random() * window.innerWidth,
          ],
          y: [
            Math.random() * window.innerHeight,
            Math.random() * window.innerHeight,
            Math.random() * window.innerHeight,
          ],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20 + Math.random() * 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    );
  });

  return (
    <BannerContainer
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      {floatingElements}

      <motion.div
        animate={{ 
          y: [0, -15, 0],
          rotateX: [0, 10, 0],
          rotateY: [0, 5, 0],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d', marginBottom: '30px' }}
      >
        <Typography 
          variant="h2" 
          sx={{ 
            fontWeight: 'bold',
            color: muiTheme.palette.primary.main,
            textShadow: `0 0 15px ${muiTheme.palette.primary.main}66`,
            mb: 2,
          }}
        >
          {language === 'si' 
            ? 'බැංකු ස්වයං සේවා යන්ත්‍රය' 
            : language === 'ta' 
              ? 'வங்கி தானியங்கி' 
              : 'Bank Self-Service Kiosk'}
        </Typography>
      </motion.div>

      <Typography 
        variant="h5" 
        sx={{ 
          mb: 5,
          maxWidth: '600px',
          color: mode === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)',
        }}
      >
        {language === 'si' 
          ? 'ඔබගේ මූල්‍ය අවශ්‍යතා සඳහා සරල, ආරක්ෂිත සහ ඉක්මන් විසඳුම්' 
          : language === 'ta' 
            ? 'உங்கள் நிதித் தேவைகளுக்கான எளிய, பாதுகாப்பான மற்றும் வேகமான தீர்வுகள்' 
            : 'Simple, secure, and fast solutions for all your financial needs'}
      </Typography>

      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.7, 1, 0.7],
          y: [0, -5, 0] 
        }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1.5,
            p: 2,
            borderRadius: '15px',
            background: `${muiTheme.palette.primary.main}22`,
            border: `1px solid ${muiTheme.palette.primary.main}44`,
          }}
        >
          <TouchAppIcon 
            sx={{ 
              color: muiTheme.palette.primary.main, 
              fontSize: '2rem' 
            }} 
          />
          <Typography 
            variant="h6"
            sx={{ fontWeight: 'medium' }}
          >
            {language === 'si' 
              ? 'පහත ප්‍රවර්ගයක් තෝරන්න' 
              : language === 'ta' 
                ? 'கீழே ஒரு வகையைத் தேர்ந்தெடுக்கவும்' 
                : 'Select a category below'}
          </Typography>
        </Box>
      </motion.div>
    </BannerContainer>
  );
};

export default HomeBanner;
