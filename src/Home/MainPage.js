import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
import CategoryCarousel from "./CategoryCarousel";
import ProductGrid from "./ProductGrid";
import VideoPlainBackground from "../components/VideoPlainBackground";
import { useLanguage } from "../language/LanguageContext";

const MainPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState(null);
  const params = useParams();
  const categoryParam = params.category;

  const isMobile = useMediaQuery("(max-width: 600px)");
  const language = useLanguage();

  useEffect(() => {
    if (categoryParam) {
      const decodedCategory = decodeURIComponent(categoryParam);
      setSelectedCategory(decodedCategory);
      setSelectedCategoryName(decodedCategory);
    }
  }, [categoryParam]);

  return (
    <Box
      display="flex"
      flexDirection={isMobile ? "column" : "row"}
      sx={{
        overflow: "hidden",
        padding: isMobile ? 5 : 10,
        height: isMobile ? "100vh" : "70vh",
      }}
    >
      <VideoPlainBackground />
      <CategoryCarousel
        sx={{ padding: isMobile ? 5 : 10 }}
        onSelectCategory={setSelectedCategory}
        onSelectCategoryName={setSelectedCategoryName}
        selectedCategory={selectedCategory}
      />
      <ProductGrid
        selectedCategory={selectedCategory}
        selectedCategoryName={selectedCategoryName}
      />
    </Box>
  );
};

export default MainPage;
