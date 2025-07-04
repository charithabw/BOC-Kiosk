import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme as useMuiTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";
import CategoryCarousel from "./CategoryCarousel";
import ProductGrid from "./ProductGrid";
import ThemedBackground from "../components/ThemedBackground";
import { useLanguage } from "../language/LanguageContext";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import Footer from "../components/Footer";

// Styled components
const MainContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  position: "relative",
  padding: theme.spacing(3),
  transition: "all 0.5s ease-in-out",
  //paddingBottom: "100", // Space for footer
}));

const ContentContainer = styled(Box)(({ theme, isMobile }) => ({
  display: "flex",
  flexDirection: isMobile ? "column" : "row",
  flex: 1,
  gap: theme.spacing(3),
  marginTop: theme.spacing(1),
  width: "100%",
  height: "calc(100vh - 120px)",
  alignItems: isMobile ? "center" : "flex-start",
  justifyContent: "center",
  padding: theme.spacing(2),
  transition: "all 0.5s ease",
}));

// Page transitions
const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.9,
    y: 20,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 1.05,
    y: -20,
    transition: {
      duration: 0.3,
    },
  },
};

const MainPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState(null);
  const [showHint, setShowHint] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  const categoryParam = params.category;

  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery("(max-width: 1000px)");
  const { language } = useLanguage();

  // Hide hint after a delay
  useEffect(() => {
    if (showHint) {
      const timer = setTimeout(() => {
        setShowHint(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showHint]);

  useEffect(() => {
    if (categoryParam) {
      const decodedCategory = decodeURIComponent(categoryParam);
      setSelectedCategory(decodedCategory);
    } else {
      setSelectedCategory(null);
      setSelectedCategoryName(null);
    }
  }, [categoryParam]);

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <MainContainer>
      <ThemedBackground />

      <AnimatePresence mode="wait">
        <motion.div
          key={`main-content-${selectedCategory || "home"}`}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{ width: "100%", height: "100%" }}
        >
          <ContentContainer isMobile={isMobile}>
            <CategoryCarousel
              onSelectCategory={setSelectedCategory}
              onSelectCategoryName={setSelectedCategoryName}
              selectedCategory={selectedCategory}
            />
            <ProductGrid
              selectedCategory={selectedCategory}
              selectedCategoryName={selectedCategoryName}
            />
          </ContentContainer>
        </motion.div>
      </AnimatePresence>

      {/* Touch hint overlay */}
      {showHint && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            bottom: "70px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(5px)",
            padding: "10px 20px",
            borderRadius: "30px",
            border: `1px solid ${muiTheme.palette.primary.main}33`,
          }}
        >
          {/*
          <TouchAppIcon sx={{ color: muiTheme.palette.primary.main }} />
          <Typography color="white">
            {language === "si"
              ? "වර්ගයක් තෝරන්න"
              : language === "ta"
              ? "வகையைத் தேர்ந்தெடுக்கவும்"
              : "Select a category"}
          </Typography> */}
        </motion.div>
      )}

      <Footer />
    </MainContainer>
  );
};

export default MainPage;
