import React, { useEffect, useState, useRef } from "react";
import { useLanguage } from "../language/LanguageContext";
import { useTheme } from "../theme/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";
import categoryService from "../categories/Services";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  Typography,
  useMediaQuery,
  IconButton,
  Container,
  Grid,
  Paper,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Header from "../components/Header";

import backgroundVideo from "../assets/videos/bg.mp4";

// Yellow theme color - primary accent color
const YELLOW_COLOR = "#FFA500";
const YELLOW_DARK = "#FBC02D";
const YELLOW_LIGHT = "#FFF59D";

// Light theme colors
const LIGHT_YELLOW = "#FF8C00";
const LIGHT_YELLOW_DARK = "#F57C00";
const LIGHT_YELLOW_LIGHT = "#FFD54F";

// Helper function to get theme-aware colors
const getThemeColors = (mode) => {
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
      videoOverlay: "rgba(255, 255, 255, 0.2)",
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
    videoOverlay: "rgba(0, 0, 0, 0.8)",
  };
};

// Styled components
const MainContainer = styled(Container)(({ theme }) => ({
  minHeight: "100vh",
  padding: theme.spacing(2),
  position: "relative",
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
}));

const VideoBackground = styled("video")({
  position: "fixed",
  right: 0,
  bottom: 0,
  minWidth: "100%",
  minHeight: "100%",
  width: "auto",
  height: "auto",
  zIndex: -1,
  objectFit: "cover",
});

const VideoOverlay = styled(Box)(({ themeMode }) => {
  const colors = getThemeColors(themeMode);
  return {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: colors.videoOverlay,
    zIndex: -1,
  };
});

const GlowingText = styled(Typography)(({ theme, themeMode }) => {
  const colors = getThemeColors(themeMode);
  return {
    color: colors.accentMain,
    textShadow: `0 0 10px ${colors.accentMain}99`,
    fontWeight: "bold",
    letterSpacing: "1px",
  };
});

const CategoryCardStyled = styled(motion.div)(({ theme, themeMode }) => {
  const colors = getThemeColors(themeMode);
  return {
    background: colors.cardBackground,
    borderRadius: "15px",
    padding: theme.spacing(2),
    cursor: "pointer",
    height: "180px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    border: `1px solid ${colors.accentMain}33`,
    boxShadow: `0 10px 20px rgba(0, 0, 0, 0.3), 0 0 15px ${colors.accentMain}33`,
    backdropFilter: "blur(5px)",
    transition: "all 0.3s ease",
    "&:hover": {
      borderColor: colors.accentMain,
      boxShadow: `0 15px 30px rgba(0, 0, 0, 0.5), 0 0 20px ${colors.accentMain}66`,
      transform: "translateY(-5px)",
    },
  };
});

const NavButton = styled(IconButton)(({ theme }) => ({
  background: `${YELLOW_COLOR}33`,
  color: YELLOW_COLOR,
  "&:hover": {
    background: `${YELLOW_COLOR}66`,
  },
}));

const PageIndicator = styled(motion.div)(({ active }) => ({
  width: active ? "30px" : "10px",
  height: "10px",
  borderRadius: "5px",
  background: active ? YELLOW_COLOR : "rgba(255, 255, 255, 0.3)",
  margin: "0 5px",
  cursor: "pointer",
}));

const CurrencyCard = styled(Paper)(({ theme }) => ({
  background: "rgba(0, 0, 0, 0.7)",
  borderRadius: "15px",
  padding: theme.spacing(2),
  color: "#fff",
  border: `1px solid ${YELLOW_COLOR}66`,
  boxShadow: `0 5px 15px rgba(0, 0, 0, 0.3), 0 0 10px ${YELLOW_COLOR}33`,
  marginBottom: theme.spacing(2),
  backdropFilter: "blur(5px)",
  height: "100%",
}));

const LanguageButton = styled(Button)(({ theme, active }) => ({
  margin: "0 5px",
  background: active ? `${YELLOW_COLOR}66` : "rgba(0, 0, 0, 0.5)",
  color: active ? YELLOW_COLOR : "#fff",
  borderRadius: "30px",
  padding: "10px 20px",
  fontSize: "1rem",
  fontWeight: "bold",
  border: `2px solid ${active ? YELLOW_COLOR : "rgba(255, 255, 255, 0.2)"}`,
  "&:hover": {
    background: `${YELLOW_COLOR}44`,
    borderColor: YELLOW_COLOR,
  },
  transition: "all 0.3s ease",
}));

// Digital Banking Background Animation Component
const DigitalBankingBackground = ({ themeMode }) => {
  const colors = getThemeColors(themeMode);
  return (
    <>
      <VideoBackground autoPlay muted loop>
        <source src={backgroundVideo} type="video/mp4" />
      </VideoBackground>
      <VideoOverlay themeMode={themeMode} />

      {/* Additional floating elements */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`element-${i}`}
          style={{
            position: "absolute",
            width: i % 2 === 0 ? "50px" : "5px",
            height: i % 2 === 0.5 ? "50px" : "5px",
            background:
              i % 3 === 0
                ? colors.accentMain
                : i % 3 === 1
                ? colors.accentDark
                : colors.accentLight,
            opacity: 0.2 + Math.random() * 0.3,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            zIndex: 0,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            rotate: [0, Math.random() * 360],
            scale: [1, 1 + Math.random() * 0.5],
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        />
      ))}

      {/* Digital currency symbols */}
      {["$", "€", "¥", "£", "₹"].map((symbol, i) => (
        <motion.div
          key={`symbol-${i}`}
          style={{
            position: "absolute",
            fontSize: "24px",
            color: colors.accentMain,
            opacity: 0.7,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            zIndex: 0,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {symbol}
        </motion.div>
      ))}
    </>
  );
};

// Currency Exchange Visual Component
const CurrencyExchangeVisual = ({ themeMode }) => {
  const colors = getThemeColors(themeMode);
  const [currentCurrency, setCurrentCurrency] = useState(0);

  // Sample currency data
  const currencyData = [
    {
      name: "USD/LKR",
      rate: "320.75",
      trend: "up",
      change: "+0.45%",
      values: [320, 318, 319, 320.5, 320.75],
    },
    {
      name: "EUR/LKR",
      rate: "350.30",
      trend: "down",
      change: "-0.22%",
      values: [352, 351, 350.5, 350.3, 350.3],
    },
    {
      name: "GBP/LKR",
      rate: "410.15",
      trend: "up",
      change: "+0.33%",
      values: [408, 409, 409.5, 410, 410.15],
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCurrency((prev) => (prev + 1) % currencyData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ height: "200px" }}>
      <GlowingText variant="body1" sx={{ mb: 1, textAlign: "center" }}>
        <CurrencyExchangeIcon
          sx={{ mr: 1, verticalAlign: "middle", fontSize: "1rem" }}
        />
        Currency Exchange Rates
      </GlowingText>

      <Box sx={{ height: "calc(100% - 30px)" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`currency-${currentCurrency}`}
            initial={{ opacity: 0, x: 100, rotateY: 90 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            exit={{ opacity: 0, x: -100, rotateY: -90 }}
            transition={{ duration: 0.5 }}
            style={{
              transformStyle: "preserve-3d",
              perspective: "1000px",
              height: "100%",
            }}
          >
            <CurrencyCard>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Typography variant="body1" sx={{ color: YELLOW_COLOR }}>
                  {currencyData[currentCurrency].name}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    variant="body1"
                    sx={{ mr: 1, color: YELLOW_COLOR }}
                  >
                    {currencyData[currentCurrency].rate}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color:
                        currencyData[currentCurrency].trend === "up"
                          ? "#81C784"
                          : "#F06292",
                    }}
                  >
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
              </Box>

              {/* Chart visualization */}
              <Box
                sx={{
                  height: "calc(100% - 30px)",
                  minHeight: "120px",
                  position: "relative",
                  mt: 1,
                  perspective: "1000px",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Chart line */}
                <Box
                  sx={{
                    position: "relative",
                    height: "100%",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    padding: "0 10px",
                  }}
                >
                  {currencyData[currentCurrency].values.map(
                    (value, index, array) => {
                      // Calculate relative height
                      const min = Math.min(...array);
                      const max = Math.max(...array);
                      const range = max - min;
                      const relativeHeight =
                        range === 0 ? 50 : ((value - min) / range) * 80 + 20;

                      return (
                        <motion.div
                          key={`bar-${index}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{
                            height: `${relativeHeight}%`,
                            opacity: 1,
                            rotateX: [0, 10, 0],
                            z: [0, 20, 0],
                          }}
                          transition={{
                            duration: 1,
                            delay: index * 0.1,
                            repeat: Infinity,
                            repeatDelay: 10,
                          }}
                          whileHover={{
                            scale: 1.1,
                            z: 30,
                            boxShadow: `0 0 20px ${YELLOW_COLOR}`,
                          }}
                          style={{
                            width: "15%",
                            background: `linear-gradient(to top, ${YELLOW_COLOR}99, ${YELLOW_COLOR})`,
                            borderTopLeftRadius: 4,
                            borderTopRightRadius: 4,
                            position: "relative",
                            transformStyle: "preserve-3d",
                          }}
                        >
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            style={{
                              position: "absolute",
                              top: "-20px",
                              left: "50%",
                              transform: "translateX(-50%)",
                              color: YELLOW_COLOR,
                              fontSize: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            {value}
                          </motion.div>
                        </motion.div>
                      );
                    }
                  )}
                </Box>
              </Box>
            </CurrencyCard>
          </motion.div>
        </AnimatePresence>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
        {currencyData.map((_, index) => (
          <PageIndicator
            key={`currency-indicator-${index}`}
            active={currentCurrency === index}
            onClick={() => setCurrentCurrency(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </Box>
    </Box>
  );
};

// Enhanced Special Promotions Component - Now larger without Learn More button
const SpecialPromotions = ({
  ads,
  currentAdIndex,
  setCurrentAdIndex,
  language,
  themeMode,
}) => {
  const colors = getThemeColors(themeMode);
  return (
    <Box sx={{ height: "500px", mb: 3 }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={`ad-${currentAdIndex}`}
          initial={{ opacity: 0, rotateY: -90 }}
          animate={{ opacity: 1, rotateY: 0 }}
          exit={{ opacity: 0, rotateY: 90 }}
          transition={{ duration: 0.7 }}
          style={{
            height: "100%",
            width: "100%",
            position: "relative",
            transformStyle: "preserve-3d",
            perspective: "1000px",
          }}
        >
          <Box
            component="img"
            src={ads[currentAdIndex]}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "20px",
              boxShadow: `0 20px 40px rgba(0,0,0,0.4), 0 0 20px ${YELLOW_COLOR}33`,
              filter: "brightness(0.8)",
            }}
          />

          {/* Animated overlay */}
          <motion.div
            animate={{
              background: [
                `linear-gradient(135deg, rgba(0,0,0,0.7) 0%, transparent 100%)`,
                `linear-gradient(135deg, rgba(0,0,0,0.5) 0%, transparent 100%)`,
                `linear-gradient(135deg, rgba(0,0,0,0.7) 0%, transparent 100%)`,
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "20px",
            }}
          />

          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              p: 3,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
              borderBottomLeftRadius: "20px",
              borderBottomRightRadius: "20px",
            }}
          >
            <GlowingText variant="h4" sx={{ mb: 1 }} themeMode={themeMode}>
              {language === "si"
                ? "විශේෂ ප්‍රවර්ධන"
                : language === "ta"
                ? "சிறப்பு விளம்பரங்கள்"
                : "Special Promotions"}
            </GlowingText>

            <Typography variant="body1" sx={{ color: "#fff", maxWidth: "80%" }}>
              {language === "si"
                ? "අපගේ නවතම බැංකු සේවාවන් සහ විශේෂ ප්‍රවර්ධන ගැන දැනගන්න"
                : language === "ta"
                ? "எங்கள் சமீபத்திய வங்கி சேவைகள் மற்றும் சிறப்பு விளம்பரங்களைப் பற்றி அறிக"
                : "Discover our latest banking services and special promotions"}
            </Typography>
          </Box>

          {/* Animated highlight effect */}
          <motion.div
            animate={{
              opacity: [0, 0.3, 0],
              x: ["0%", "100%"],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              top: 0,
              left: "-20%",
              width: "40%",
              height: "100%",
              background: `linear-gradient(90deg, transparent, ${YELLOW_COLOR}33, transparent)`,
              borderRadius: "20px",
              transform: "skewX(-15deg)",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Ad indicator dots */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 2,
        }}
      >
        {ads.map((_, index) => (
          <PageIndicator
            key={`ad-indicator-${index}`}
            active={currentAdIndex === index}
            onClick={() => setCurrentAdIndex(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </Box>
    </Box>
  );
};

const Home1 = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { mode } = useTheme();
  const [categories, setCategories] = useState([]);
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:960px)");
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [currentCategoryPage, setCurrentCategoryPage] = useState(0);
  const touchRippleRefs = useRef([]);

  const handleCategoryClick = (categoryId) => {
    navigate(`/main/${categoryId}`);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryService.getAllCategories();
        if (response.statusCode === "SUCCESS") {
          setCategories(response.data || []);
          // Initialize refs for each category
          touchRippleRefs.current = Array(response.data.length)
            .fill()
            .map(() => React.createRef());
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();

    // Auto-rotate ads
    const adInterval = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % ads.length);
    }, 5000);

    // Auto-rotate category pages
    const categoryInterval = setInterval(() => {
      if (categories.length > itemsPerPage) {
        setCurrentCategoryPage(
          (prev) => (prev + 1) % Math.ceil(categories.length / itemsPerPage)
        );
      }
    }, 8000);

    return () => {
      clearInterval(adInterval);
      clearInterval(categoryInterval);
    };
  }, [categories.length]);

  // Sample ads - replace with  actual ads
  const ads = [
    "/images/promo/adz (2).png",
    "/images/promo/adz (3).png",
    "/images/promo/adz (1).png",

    //"https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop",
  ];

  // Fixed 6 items per page
  const itemsPerPage = 6;
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  const nextPage = () => {
    setCurrentCategoryPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentCategoryPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const getWelcomeText = () => {
    switch (language) {
      case "si":
        return "ඩිජිටල් බැංකුකරණයට සාදරයෙන් පිළිගනිමු";
      case "ta":
        return "டிஜிட்டல் வங்கிக்கு வரவேற்கிறோம்";
      default:
        return "Welcome to Digital Banking";
    }
  };

  const getCategoriesText = () => {
    switch (language) {
      case "si":
        return "Main Categories";
      case "ta":
        return "முக்கிய வகைகள்";
      default:
        return "Main Categories";
    }
  };

  useEffect(() => {
    document.body.classList.add("hide-scrollbar");
    return () => {
      document.body.classList.remove("hide-scrollbar");
    };
  }, []);

  return (
    <MainContainer maxWidth={false} disableGutters>
      {/* Add the digital banking background with video */}
      <DigitalBankingBackground themeMode={mode} />

      {/* Replace custom header with common Header component 
      <Header /> */}

      {/* Main Content Area */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          zIndex: 1,
          px: 3,
          mt: 9,
        }}
      >
        <Grid container spacing={3}>
          {/* Left Side - Larger Special Promotions and Currency Exchange */}
          <Grid item xs={12} md={5} lg={4}>
            {/* Enhanced Special Promotions - Now larger */}
            <SpecialPromotions
              ads={ads}
              currentAdIndex={currentAdIndex}
              setCurrentAdIndex={setCurrentAdIndex}
              language={language}
              themeMode={mode}
            />

            {/* Smaller Currency Exchange 
            <CurrencyExchangeVisual themeMode={mode} />*/}
          </Grid>

          {/* Right Side - Category Display */}
          <Grid item xs={12} md={7} lg={8}>
            <Box
              sx={{
                mb: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <GlowingText
                variant="h4"
                sx={{ display: "flex", alignItems: "center" }}
                themeMode={mode}
              >
                <AccountBalanceIcon sx={{ mr: 1, fontSize: "1.8rem" }} />
                {getCategoriesText()}
              </GlowingText>

              <Box>
                <NavButton onClick={prevPage} sx={{ mr: 1 }}>
                  <ArrowBackIcon />
                </NavButton>
                <NavButton onClick={nextPage}>
                  <ArrowForwardIcon />
                </NavButton>
              </Box>
            </Box>

            {/* Category Navigation Controls */}
            {totalPages > 1 && (
              <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                {Array(totalPages)
                  .fill()
                  .map((_, index) => (
                    <PageIndicator
                      key={`page-indicator-${index}`}
                      active={currentCategoryPage === index}
                      onClick={() => setCurrentCategoryPage(index)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  ))}
              </Box>
            )}

            {/* Categories Grid with Animation - Fixed 6 items per page */}
            <Grid container spacing={3}>
              <AnimatePresence mode="wait">
                {categories
                  .slice(
                    currentCategoryPage * itemsPerPage,
                    (currentCategoryPage + 1) * itemsPerPage
                  )
                  .map((category, index) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={isMobile ? 6 : isTablet ? 4 : 4}
                      key={category.categoryID}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <CategoryCard
                          category={category}
                          language={language}
                          onCategoryClick={handleCategoryClick}
                          index={index}
                          ref={
                            touchRippleRefs.current &&
                            touchRippleRefs.current[index]
                          }
                        />
                      </motion.div>
                    </Grid>
                  ))}
              </AnimatePresence>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </MainContainer>
  );
};

// Enhanced Category Card with 3D effects, animations, and background image
const CategoryCard = React.forwardRef(
  ({ category, language, onCategoryClick, index }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isTouched, setIsTouched] = useState(false);

    // Random animation variants for each card
    const animations = [
      { y: [0, -10, 0], transition: { repeat: Infinity, duration: 3 } },
      {
        rotate: [0, 2, 0, -2, 0],
        transition: { repeat: Infinity, duration: 5 },
      },
      { scale: [1, 1.05, 1], transition: { repeat: Infinity, duration: 4 } },
    ];
    const randomAnimation = animations[index % animations.length];

    // Handle touch interaction
    const handleTouchStart = () => {
      setIsTouched(true);
      setTimeout(() => setIsTouched(false), 1000);
    };

    // Background image for category (transparent overlay)
    const getCategoryImage = () => {
      // You can map category IDs to specific images if needed
      const defaultImages = [
        "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      ];
      return defaultImages[index % defaultImages.length];
    };

    return (
      <CategoryCardStyled
        onClick={() => onCategoryClick(category.categoryID)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        style={{
          position: "relative",
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
        whileHover={{
          scale: 1.05,
          boxShadow: `0 20px 30px rgba(0, 0, 0, 0.7), 0 0 30px ${YELLOW_COLOR}66`,
          z: 30,
        }}
        animate={randomAnimation}
      >
        {/* Background image with overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,

            backgroundImage: `url(${category.imagePath})`,
            //backgroundImage: `url(${getCategoryImage()})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.3,
            zIndex: 0,
            borderRadius: "15px",
            filter: "blur(1px)",
          }}
        />

        {/* Floating particles effect */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`particle-${index}-${i}`}
            style={{
              position: "absolute",
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: YELLOW_COLOR,
              opacity: 0.6,
              zIndex: 1,
            }}
            animate={{
              x: [
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
              ],
              y: [
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
              ],
              opacity: [0.6, 0.9, 0.6],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {/* 3D hover effect overlay */}
        <Box sx={{ position: "relative", zIndex: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Icon based on category */}
            <motion.div
              whileHover={{ rotate: 360 }}
              animate={
                isTouched
                  ? {
                      scale: [1, 1.5, 1],
                      rotate: [0, 360, 0],
                    }
                  : {}
              }
              transition={{ duration: 0.5 }}
              style={{
                background: `${YELLOW_COLOR}33`,
                borderRadius: "50%",
                width: "60px",
                height: "60px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "15px",
                boxShadow:
                  isHovered || isTouched ? `0 0 20px ${YELLOW_COLOR}` : "none",
                transition: "box-shadow 0.3s ease",
              }}
            >
              {category.icon || (
                <AccountBalanceIcon
                  sx={{ fontSize: 28, color: YELLOW_COLOR }}
                />
              )}
            </motion.div>

            {/* Glowing text */}
            <GlowingText variant="h6" align="center">
              {language === "si"
                ? category.catSin
                : language === "ta"
                ? category.catTam
                : category.catEng}
            </GlowingText>

            {/* Touch indicator */}
            {!isHovered && (
              <motion.div
                style={{
                  marginTop: "10px",
                  fontSize: "12px",
                  color: "rgba(255, 255, 255, 0.7)",
                  display: "flex",
                  alignItems: "center",
                }}
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <TouchAppIcon fontSize="small" sx={{ mr: 0.5 }} />
                Touch to select
              </motion.div>
            )}
          </Box>
        </Box>

        {/* 3D touch effect */}
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: "15px",
            background: `radial-gradient(circle at center, ${YELLOW_COLOR}33 0%, transparent 70%)`,
            opacity: 0,
            zIndex: 1,
          }}
          animate={{ opacity: isTouched ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />

        {/* Touch ripple effect for feedback */}
        <TouchRipple ref={ref} />
      </CategoryCardStyled>
    );
  }
);

export default Home1;
