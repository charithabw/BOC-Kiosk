import React from 'react';
import { IconButton, Box, useTheme as useMuiTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useTheme } from '../theme/ThemeContext';

const ToggleButton = styled(IconButton)(({ theme }) => ({
  position: 'relative',
  width: '50px',
  height: '50px',
  borderRadius: '25px',
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  backdropFilter: 'blur(10px)',
  border: `2px solid ${theme.palette.primary.main}33`,
  color: theme.palette.primary.main,
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: `${theme.palette.primary.main}33`,
    transform: 'scale(1.05)',
    boxShadow: `0 0 15px ${theme.palette.primary.main}66`,
  },
}));

const ThemeToggle = () => {
  const { mode, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '0px',
        right: '0px',
        zIndex: 1000,
      }}
    >
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        <ToggleButton onClick={toggleTheme}>
          {mode === 'dark' ? (
            <LightModeIcon sx={{ fontSize: '1.5rem' }} />
          ) : (
            <DarkModeIcon sx={{ fontSize: '1.5rem' }} />
          )}

          {/* Animated glow effect */}
          <Box
            component={motion.div}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: '25px',
              zIndex: -1,
            }}
            animate={{
              boxShadow: [
                `0 0 5px ${muiTheme.palette.primary.main}33`,
                `0 0 15px ${muiTheme.palette.primary.main}66`,
                `0 0 5px ${muiTheme.palette.primary.main}33`,
              ],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </ToggleButton>
      </motion.div>
    </Box>
  );
};

export default ThemeToggle; 