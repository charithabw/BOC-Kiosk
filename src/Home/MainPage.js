import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import CategoryCarousel from "./CategoryCarousel";
import ProductGrid from "./ProductGrid";
import VideoPlainBackground from "../components/VideoPlainBackground";
import { useLanguage } from "../language/LanguageContext";

const MainPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState(null);

  const isMobile = useMediaQuery("(max-width: 600px)");
  const language = useLanguage();

  return (
    <Box
      display="flex"
      flexDirection={isMobile ? "column" : "row"}
      //height="70vh"
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
      />
      <ProductGrid
        selectedCategory={selectedCategory}
        selectedCategoryName={selectedCategoryName}
      />
    </Box>
  );
};

export default MainPage;
