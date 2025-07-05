import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

// Yellow theme color constants from Home1.js
const YELLOW_COLOR = "#FFA500";
const YELLOW_DARK = "#FBC02D";
const YELLOW_LIGHT = "#FFF59D";

// Create theme context
const ThemeContext = createContext({
  mode: 'dark',
  toggleTheme: () => {},
});

// Hook to use theme
export const useTheme = () => useContext(ThemeContext);

// Theme provider component
export const ThemeProvider = ({ children }) => {
  // Check for stored preference or default to dark
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode || 'dark';
  });

  // Toggle between light and dark
  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', newMode);
      return newMode;
    });
  };

  // Create MUI theme based on mode
  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: {
        main: YELLOW_COLOR,
        dark: YELLOW_DARK,
        light: YELLOW_LIGHT,
      },
      background: {
        default: mode === 'dark' ? '#000000' : '#f5f5f5',
        paper: mode === 'dark' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.8)',
      },
      text: {
        primary: mode === 'dark' ? '#ffffff' : '#333333',
        secondary: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backdropFilter: 'blur(10px)',
            backgroundColor: mode === 'dark' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.8)',
            borderRadius: '15px',
            border: `1px solid ${mode === 'dark' ? `${YELLOW_COLOR}33` : `${YELLOW_COLOR}66`}`,
            boxShadow: `0 10px 20px ${mode === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)'}, 0 0 15px ${YELLOW_COLOR}33`,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'dark' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(5px)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '15px',
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: YELLOW_COLOR,
            '&:hover': {
              backgroundColor: `${YELLOW_COLOR}33`,
            },
          },
        },
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 700,
      },
      h3: {
        fontWeight: 600,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 500,
      },
      h6: {
        fontWeight: 500,
      },
    },
  }), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MUIThemeProvider theme={theme}>
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider; 