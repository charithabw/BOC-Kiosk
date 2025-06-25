import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, styled } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../theme/ThemeContext";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

// Helper function to get theme colors
const getThemeColors = (mode) => {
  const YELLOW_COLOR = "#FFA500";
  const YELLOW_DARK = "#FBC02D";
  const YELLOW_LIGHT = "#FFF59D";
  const LIGHT_YELLOW = "#FF8C00";
  const LIGHT_YELLOW_DARK = "#F57C00";
  const LIGHT_YELLOW_LIGHT = "#FFD54F";

  if (mode === 'light') {
    return {
      accentMain: LIGHT_YELLOW,
      accentDark: LIGHT_YELLOW_DARK,
      accentLight: LIGHT_YELLOW_LIGHT,
      background: "rgba(255, 255, 255, 0.9)",
      backgroundMedium: "rgba(248, 248, 248, 0.9)",
      backgroundLight: "rgba(255, 255, 255, 0.7)",
      cardBackground: "rgba(255, 255, 255, 0.8)",
      text: "#333333",
      textSecondary: "rgba(0, 0, 0, 0.7)",
      positive: "#4CAF50",
      negative: "#F44336",
      accentTransparent: `${LIGHT_YELLOW}33`,
      accentMediumTransparent: `${LIGHT_YELLOW}66`,
    };
  }
  // Dark theme (default)
  return {
    accentMain: YELLOW_COLOR,
    accentDark: YELLOW_DARK,
    accentLight: YELLOW_LIGHT, 
    background: "rgba(0, 0, 0, 0.7)",
    backgroundMedium: "rgba(0, 0, 0, 0.7)",
    backgroundLight: "rgba(0, 0, 0, 0.6)",
    cardBackground: "rgba(0, 0, 0, 0.7)",
    text: "#ffffff",
    textSecondary: "rgba(255, 255, 255, 0.8)",
    positive: "#81C784",
    negative: "#F06292",
    accentTransparent: `${YELLOW_COLOR}33`,
    accentMediumTransparent: `${YELLOW_COLOR}66`,
  };
};

const FooterContainer = styled(Box)(({ customTheme }) => ({
  width: "100%",
  padding: "10px 20px",
  background: customTheme.background,
  backdropFilter: "blur(5px)",
  borderTop: `1px solid ${customTheme.accentTransparent}`,
  zIndex: 10,
}));

const GlowingText = styled(Typography)(({ customTheme }) => ({
  color: customTheme.accentMain,
  textShadow: `0 0 10px ${customTheme.accentMain}99`,
  fontWeight: "bold",
  letterSpacing: "1px",
}));

const CurrencyCard = styled(Paper)(({ customTheme }) => ({
  background: customTheme.cardBackground,
  borderRadius: "15px",
  padding: "15px",
  color: customTheme.text,
  border: `1px solid ${customTheme.accentMediumTransparent}`,
  boxShadow: `0 5px 15px rgba(0, 0, 0, 0.1), 0 0 10px ${customTheme.accentTransparent}`,
  backdropFilter: "blur(5px)",
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

const PageIndicator = styled(motion.div)(({ active, customTheme }) => ({
  width: active ? "20px" : "8px",
  height: "8px",
  borderRadius: "4px",
  background: active ? customTheme.accentMain : "rgba(255, 255, 255, 0.3)",
  margin: "0 4px",
  cursor: "pointer",
}));

const Footer = () => {
  const { mode } = useTheme();
  const colors = getThemeColors(mode);
  const [currentCurrency, setCurrentCurrency] = useState(0);

  // Sample currency data
  const currencyData = [
    {
      name: "USD/LKR",
      rate: "320.75",
      trend: "up",
      change: "+0.45%",
    },
    {
      name: "EUR/LKR",
      rate: "350.30",
      trend: "down",
      change: "-0.22%",
    },
    {
      name: "GBP/LKR",
      rate: "410.15",
      trend: "up",
      change: "+0.33%",
    },
    {
      name: "AUD/LKR",
      rate: "225.80",
      trend: "up",
      change: "+0.25%",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCurrency((prev) => (prev + 1) % currencyData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [currencyData.length]);

  return (
    <FooterContainer customTheme={colors}>
      <Box sx={{ 
        display: "flex", 
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap", 
        height: "70px" 
      }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CurrencyExchangeIcon
            sx={{ color: colors.accentMain, mr: 1, fontSize: "1.2rem" }}
          />
          <GlowingText 
            variant="body2" 
            customTheme={colors}
            sx={{ mr: 2 }}
          >
            Currency Exchange Rates
          </GlowingText>
        </Box>

        <Box sx={{ flex: 1, maxWidth: "600px", position: "relative" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`currency-${currentCurrency}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              style={{ height: "40px" }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body1" sx={{ 
                  mr: 1, 
                  fontWeight: "bold", 
                  color: colors.accentMain 
                }}>
                  {currencyData[currentCurrency].name}
                </Typography>
                <Typography variant="body1" sx={{ 
                  mr: 1, 
                  color: colors.accentMain 
                }}>
                  {currencyData[currentCurrency].rate}
                </Typography>
                <Box sx={{
                  display: "flex",
                  alignItems: "center",
                  color: currencyData[currentCurrency].trend === "up" 
                    ? colors.positive 
                    : colors.negative,
                }}>
                  {currencyData[currentCurrency].trend === "up" ? (
                    <TrendingUpIcon fontSize="small" />
                  ) : (
                    <TrendingDownIcon fontSize="small" />
                  )}
                  <Typography variant="caption" sx={{ ml: 0.5 }}>
                    {currencyData[currentCurrency].change}
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </AnimatePresence>
        </Box>

        <Box sx={{ display: "flex" }}>
          {currencyData.map((_, index) => (
            <PageIndicator
              key={`currency-indicator-${index}`}
              active={currentCurrency === index}
              onClick={() => setCurrentCurrency(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              customTheme={colors}
            />
          ))}
        </Box>
      </Box>
    </FooterContainer>
  );
};

export default Footer; 