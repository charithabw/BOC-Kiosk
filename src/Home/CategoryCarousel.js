import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import {
  ArrowUpward,
  ArrowDownward,
  ArrowBack,
  ArrowForward,
} from "@mui/icons-material";
import categoryServices from "../categories/Services";
import { useLanguage } from "../language/LanguageContext";

const CategoryCarousel = ({
  onSelectCategory,
  onSelectCategoryName,
  selectedCategory,
}) => {
  const [categories, setCategories] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(true);
  const [timeoutId, setTimeoutId] = useState(null);

  const isMobile = useMediaQuery("(max-width: 600px)");
  const isTablet = useMediaQuery("(max-width: 900px)");
  const { language } = useLanguage();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryServices.getAllCategories();
        if (response.statusCode === "SUCCESS") {
          const categoryData = response.data || [];
          setCategories(categoryData);

          // After setting categories, find and set the active index
          if (selectedCategory && categoryData.length > 0) {
            const foundIndex = categoryData.findIndex(
              (cat) => cat.categoryID === selectedCategory
            );
            if (foundIndex !== -1) {
              setActiveIndex(foundIndex);
              console.log("Found category index:", foundIndex);
              // Also trigger the selection callbacks
              const foundCategory = categoryData[foundIndex];
              onSelectCategory(foundCategory.categoryID);
              onSelectCategoryName(
                language === "si"
                  ? foundCategory.catSin
                  : language === "ta"
                  ? foundCategory.catTam
                  : foundCategory.catEng
              );
            }
          }
        } else {
          console.error("Failed to fetch categories:", response.message);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, [selectedCategory, language]); //

  useEffect(() => {
    if (!isScrolling || categories.length === 0) return;

    const interval = setInterval(() => {
      handleScroll(isMobile ? "right" : "down");
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex, categories.length, isScrolling, isMobile]);

  const handleScroll = (direction) => {
    setActiveIndex((prevIndex) => {
      const totalItems = categories.length;
      if (direction === "up" || direction === "left") {
        return prevIndex === 0 ? totalItems - 1 : prevIndex - 1;
      } else {
        return (prevIndex + 1) % totalItems;
      }
    });
  };

  const handleItemClick = (index) => {
    setActiveIndex(index);
    setIsScrolling(false);

    if (timeoutId) clearTimeout(timeoutId);
    const newTimeoutId = setTimeout(() => {
      setIsScrolling(true);
    }, 10000);
    setTimeoutId(newTimeoutId);
  };

  const getPosition = (index) => {
    if (categories.length < 3) return "hidden";

    const totalItems = categories.length;
    const prevIndex = (activeIndex - 1 + totalItems) % totalItems;
    const nextIndex = (activeIndex + 1) % totalItems;

    if (index === activeIndex) return "center";
    if (index === prevIndex) return "before";
    if (index === nextIndex) return "after";
    return "hidden"; // Hide other elements
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: isMobile ? "row" : "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        height: isMobile ? "50vh" : "80vh",
        width: isMobile ? "60vh" : "60vh",
        //overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "row" : "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        {categories.map((category, index) => {
          const position = getPosition(index);
          const isActive = position === "center";
          const isSecondary = position === "before" || position === "after";

          console.log(category.imagePath);
          return (
            <motion.div
              key={category.categoryID}
              style={{
                position: "absolute",
                top: !isMobile
                  ? position === "before"
                    ? "10%"
                    : position === "after"
                    ? "80%"
                    : "45%"
                  : "50%",
                left: isMobile
                  ? position === "before"
                    ? "10%"
                    : position === "after"
                    ? "80%"
                    : "45%"
                  : "50%",
                transform: `translate(-50%, -50%) scale(${
                  isActive ? 1.3 : isSecondary ? 1 : 0.8
                })`,
                opacity: isActive ? 1 : 0.6,
                zIndex: isActive ? 5 : isSecondary ? 4 : 2,
                transition: "all 0.5s ease",
              }}
              onClick={() => {
                handleItemClick(index);
                onSelectCategory(category.categoryID);
                onSelectCategoryName(
                  language === "si"
                    ? category.catSin
                    : language === "ta"
                    ? category.catTam
                    : language === "en"
                    ? category.catEng
                    : category.catEng
                );
              }}
            >
              <Card
                sx={{
                  width: isActive ? "19vw" : "15vw",
                  height: isActive ? "20vh" : "15vh",

                  borderRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "transform 0.3s ease",
                  border: isActive ? "5px solid #ff9800" : "none",
                  boxShadow: isActive ? "0px 4px 10px rgba(0,0,0,0.2)" : "none",
                  padding: "10px",
                  backgroundSize: "cover",
                  backgroundColor: "black",
                  backgroundPosition: "center",
                  //backgroundImage: `url(https://images.unsplash.com/photo-1601597111158-2fceff292cdc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
                  backgroundImage: `url(${category.imagePath})`,

                  // opacity: 0.3,
                  //zIndex: 2,

                  //filter: "blur(1px)",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    color="white"
                    fontWeight="bold"
                    textTransform="uppercase"
                    sx={{
                      textShadow: `
      0 0 5px #ff9800,
      0 0 10px #ff9800,
      0 0 15px #ff9800
    `,
                      animation: "glow 1.5s infinite alternate",
                      "@keyframes glow": {
                        "0%": {
                          textShadow:
                            "0 0 5px #ff9800, 0 0 10px #ff9800, 0 0 15px #ff9800",
                        },
                        "100%": {
                          textShadow:
                            "0 0 10px #ff5722, 0 0 15px #ff9800, 0 0 20px #ffeb3b",
                        },
                      },
                    }}
                  >
                    {language === "si"
                      ? category.catSin
                      : language === "ta"
                      ? category.catTam
                      : category.catEng}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </Box>

      <IconButton
        onClick={() => handleScroll(isMobile ? "left" : "up")}
        sx={{
          position: "absolute",
          top: "10%",
          left: isMobile ? "10px" : "auto",
          right: isMobile ? "auto" : "80%",
          transform: "translateY(-50%) translateX(-50%)",
          zIndex: 10,
          backgroundColor: "white",
          boxShadow: 2,
          "&:hover": { backgroundColor: "#ff9800" },
        }}
      >
        {isMobile ? <ArrowBack /> : <ArrowUpward />}
      </IconButton>

      <IconButton
        onClick={() => handleScroll(isMobile ? "right" : "down")}
        sx={{
          position: "absolute",
          bottom: "19%",
          right: isMobile ? "10px" : "auto",
          left: isMobile ? "auto" : "10%",
          transform: "translateY(50%) translateX(-50%)",
          zIndex: 10,
          backgroundColor: "white",
          boxShadow: 2,
          "&:hover": { backgroundColor: "#ff9800" },
        }}
      >
        {isMobile ? <ArrowForward /> : <ArrowDownward />}
      </IconButton>
    </Box>
  );
};

export default CategoryCarousel;
