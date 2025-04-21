import React, { useEffect, useState } from "react";
import { useLanguage } from "../language/LanguageContext";
import categoryService from "../categories/Services";
import Carousel from "react-material-ui-carousel";
import VideoPlainBackground from "../components/VideoPlainBackground";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const HomePage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [categories, setCategories] = useState([]);
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleCategoryClick = (categoryId) => {
    navigate(`/main/${categoryId}`);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryService.getAllCategories();
        if (response.statusCode === "SUCCESS") {
          setCategories(response.data || []);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const chunkArray = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Left Side - Ad Carousel */}
      <Box
        sx={{
          width: isMobile ? "100%" : "40%",
          height: isMobile ? "40vh" : "100vh",
          position: "relative",
        }}
      >
        <VideoPlainBackground />
        <AdCarousel isMobile={isMobile} />
      </Box>

      {/* Right Side - Category Carousel */}
      <Box
        sx={{
          width: isMobile ? "100%" : "50%",
          padding: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: "#54004E",
            fontWeight: "bold",
            textAlign: "center",
            mb: 4,
          }}
        >
          {language === "si" ? "ප්රධාන ප්රවර්ග" : "Main Categories"}
        </Typography>

        <CategoryCarousel
          categories={chunkArray(categories, 4)}
          language={language}
          isMobile={isMobile}
          onCategoryClick={handleCategoryClick}
        />
      </Box>
    </Box>
  );
};

const AdCarousel = ({ isMobile }) => {
  const ads = [
    "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500&h=500&fit=crop",
  ];

  return (
    <Carousel
      animation="fade"
      autoPlay={true}
      interval={3000}
      indicators={false}
      navButtonsAlwaysVisible={!isMobile}
      sx={{
        //border: "5px solid #ff9800",
        height: "100%",
        borderRadius: isMobile ? 0 : "0 100px 100px 0",
        overflow: "hidden",
        "& .MuiButtonBase-root": {
          color: "#fff !important",
        },
      }}
    >
      {ads.map((url, index) => (
        <Box
          key={index}
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <img
            src={url}
            alt={`ad-${index}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: isMobile ? 0 : "0 100px 100px 0",
            }}
          />
        </Box>
      ))}
    </Carousel>
  );
};

// Updated CategoryCarousel with auto-slide
const CategoryCarousel = ({
  categories,
  language,
  isMobile,
  onCategoryClick,
}) => (
  <Carousel
    autoPlay={true}
    interval={6000}
    animation="slide"
    indicators={true}
    navButtonsAlwaysVisible={!isMobile}
    sx={{ width: "100%" }}
  >
    {categories.map((chunk, index) => (
      <Box
        key={index}
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 3,
          padding: 2,
        }}
      >
        {chunk.map((category) => (
          <CategoryCard
            key={category.categoryID}
            category={category}
            language={language}
            isMobile={isMobile}
            onCategoryClick={onCategoryClick}
          />
        ))}
      </Box>
    ))}
  </Carousel>
);

const CategoryCard = ({ category, language, isMobile, onCategoryClick }) => {
  const StyledCard = styled(Card)({
    transition: "transform 0.3s, box-shadow 0.3s",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
      cursor: "pointer",
    },
  });

  return (
    <StyledCard
      onClick={() => onCategoryClick(category.categoryID)}
      sx={{
        height: isMobile ? 120 : 180,
        borderRadius: 4,
        backgroundImage: `url(https://images.unsplash.com/photo-1601597111158-2fceff292cdc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
        //background: "linear-gradient(135deg, #F0B310, #C8940E)",
        border: "5px solid #ff9800",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
    </StyledCard>
  );
};

export default HomePage;
