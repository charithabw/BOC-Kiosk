import React from "react";
import { Box, styled, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "../theme/ThemeContext";
import ThemeToggle from "./ThemeToggle";
import { useLanguage } from "../language/LanguageContext";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useNavigate } from "react-router-dom";
import logo333 from "../assets/images/logo333.png"; // Import the logo file

// Styled components for header
const HeaderContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0.5, 0), // Less vertical padding
  zIndex: 10,
  width: "100%",
  height: "60px", // Thinner header
  minHeight: "60px",
  backdropFilter: "blur(5px)",
  background: "none",
  boxShadow: "none",
}));

// Flipped, left-side logo breakout shape
const LogoBreakout = styled(Box)(({ theme, customTheme }) => ({
  position: "absolute",
  top: "-8px",
  left: "0px",
  width: "260px", // Make the logo breakout bigger
  height: "90px",
  background: customTheme.backgroundLight,
  borderTopLeftRadius: "80px 80px 0 0/120px 120px 0 0", // Large curve top left
  borderTopRightRadius: "0 0 80px 80px/0 0 120px 120px", // Flat top right
  borderBottomLeftRadius: "60px 60px 0 0/80px 80px 0 0", // Curve bottom left
  //borderBottomRightRadius: "0 0 0 0/0 0 0 0", // Flat bottom right
  borderBottomRightRadius: "20px", // Flat bottom right
  border: `2px solid ${customTheme.accentTransparent}`,
  boxShadow: `0 5px 15px rgba(0,0,0,0.2), 0 0 10px ${customTheme.accentTransparent}`,
  zIndex: 20,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  overflow: "visible",
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: "38px",
  top: "6px",
  marginRight: 0,
  cursor: "pointer",
  zIndex: 30,
  borderBottomLeftRadius: "20px", // Curve bottom left
  borderBottomRightRadius: "8px", // Flat bottom right
}));

const DateTimeContainer = styled(Box)(({ theme, customTheme }) => ({
  display: "flex",
  flexDirection: "column",
  background: customTheme.backgroundLight,
  padding: "2px 4px",
  borderRadius: "10px",
  backdropFilter: "blur(5px)",
  border: `1.5px solid ${customTheme.accentTransparent}`,
  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.18), 0 0 6px ${customTheme.accentTransparent}`,
  fontSize: "0.85rem",
  minWidth: "140px",
  marginRight: "60px",
  alignItems: "flex-end",
}));

const GlowingText = styled(Typography)(({ theme, customTheme }) => ({
  color: customTheme.accentMain,
  textShadow: `0 0 6px ${customTheme.accentMain}99`,
  fontWeight: "bold",
  letterSpacing: "0.5px",
  fontSize: "1rem",
}));

const LanguageSelectorBox = styled(Box)(({ customTheme }) => ({
  display: "flex",
  background: customTheme.backgroundLight,
  borderRadius: "50px",
  padding: "3px 10px",
  backdropFilter: "blur(5px)",
  border: `1.5px solid ${customTheme.accentTransparent}`,
  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.13), 0 0 6px ${customTheme.accentTransparent}`,
  alignItems: "center",
  gap: "4px",
}));

const LanguageButton = styled(Box)(({ active, customTheme }) => ({
  margin: "0 2px",
  background: active
    ? customTheme.accentMediumTransparent
    : customTheme.backgroundLight,
  color: active ? customTheme.accentMain : customTheme.text,
  borderRadius: "18px",
  padding: "3px 12px",
  fontSize: "0.95rem",
  fontWeight: "bold",
  border: `1.5px solid ${
    active ? customTheme.accentMain : customTheme.accentTransparent
  }`,
  cursor: "pointer",
  boxShadow: active ? `0 1px 4px ${customTheme.accentTransparent}` : "none",
  transition: "all 0.3s ease",
  "&:hover": {
    background: customTheme.accentTransparent,
    borderColor: customTheme.accentMain,
  },
}));

const ThemeToggleBox = styled(Box)(({ theme }) => ({
  marginLeft: "10px",
  display: "flex",
  alignItems: "center",
}));

// Helper function to get theme colors
const getThemeColors = (mode) => {
  const YELLOW_COLOR = "#FFA500";
  const YELLOW_DARK = "#FBC02D";
  const YELLOW_LIGHT = "#FFF59D";
  const LIGHT_YELLOW = "#FF8C00";
  const LIGHT_YELLOW_DARK = "#F57C00";
  const LIGHT_YELLOW_LIGHT = "#FFD54F";

  if (mode === "light") {
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

const Header = () => {
  const { mode } = useTheme();
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const colors = getThemeColors(mode);

  // Current date and time
  const [currentDate, setCurrentDate] = React.useState(new Date());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
    };
    return date.toLocaleDateString(undefined, options);
  };

  // Logo component
  const GlowingLogo = () => (
    <LogoBreakout customTheme={colors}>
      <LogoContainer onClick={() => navigate("/")}>
        <Box
          component="img"
          src={logo333}
          alt="DigiAssist Logo"
          sx={{
            height: { xs: "70px", sm: "80px", md: "90px" }, // Larger logo
            position: "relative",
            zIndex: 2,
            filter: mode === "dark" ? "brightness(2)" : "none",
            transition: "filter 0.3s ease",
          }}
        />
      </LogoContainer>
    </LogoBreakout>
  );

  // Language selector
  const LanguageSelector = () => (
    <LanguageSelectorBox customTheme={colors}>
      {[
        { code: "en", label: "English" },
        { code: "si", label: "සිංහල" },
        { code: "ta", label: "தமிழ்" },
      ].map((lang) => (
        <LanguageButton
          key={lang.code}
          active={language === lang.code}
          onClick={() => setLanguage(lang.code)}
          customTheme={colors}
        >
          {lang.label}
        </LanguageButton>
      ))}
    </LanguageSelectorBox>
  );

  return (
    <Box sx={{ position: "relative", width: "100%", minHeight: "60px" }}>
      {/* Logo breakout on the far left, above header */}
      <GlowingLogo />
      <HeaderContainer
        sx={{
          backgroundColor: colors.background,
          paddingLeft: "200px",
          minHeight: "60px",
          height: "60px",
          position: "relative",
        }}
      >
        {/* Center: Language selector */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LanguageSelector />
        </Box>
        {/* Right: Date/time and theme toggle */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            minWidth: "220px",
            justifyContent: "flex-end",
          }}
        >
          <DateTimeContainer customTheme={colors}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 0.2 }}>
              <AccessTimeIcon
                sx={{ color: colors.accentMain, mr: 0.5, fontSize: "1.1rem" }}
              />
              <GlowingText
                variant="body2"
                customTheme={colors}
                sx={{
                  fontSize: "0.95rem",
                  fontFamily: "monospace",
                  letterSpacing: 1,
                }}
              >
                {formatTime(currentDate)}
              </GlowingText>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CalendarMonthIcon
                sx={{ color: colors.accentMain, mr: 0.5, fontSize: "1rem" }}
              />
              <Typography
                variant="caption"
                sx={{
                  color: colors.text,
                  fontWeight: 500,
                  fontSize: "0.85rem",
                }}
              >
                {formatDate(currentDate)}
              </Typography>
            </Box>
          </DateTimeContainer>
          <ThemeToggleBox>
            <ThemeToggle />
          </ThemeToggleBox>
        </Box>
      </HeaderContainer>
    </Box>
  );
};

export default Header;
