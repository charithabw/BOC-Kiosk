import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  useTheme as useMuiTheme,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";
import Carousel from "react-material-ui-carousel";
import productService from "../Products/services";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../language/LanguageContext";
import { useTheme } from "../theme/ThemeContext";
import productIcon from "../assets/images/product-icon.png";
//import productIcon from "../assets/images/bapp.png";
import TouchAppIcon from "@mui/icons-material/TouchApp";

// Styled components
const ProductContainer = styled(Box)(({ theme, isMobile }) => ({
  width: isMobile ? "100%" : "60%",
  display: "flex",
  flexDirection: "column",
  borderRadius: "20px",
  padding: theme.spacing(3, 4),
  background:
    theme.palette.mode === "dark"
      ? "rgba(0, 0, 0, 0.5)"
      : "rgba(255, 255, 255, 0.5)",
  backdropFilter: "blur(10px)",
  border: `1px solid ${theme.palette.primary.main}33`,
  boxShadow: `0 15px 30px rgba(0, 0, 0, 0.15), 0 0 15px ${theme.palette.primary.main}33`,
  transition: "all 0.3s ease",
  transformStyle: "preserve-3d",
}));

const CategoryHeader = styled(motion.div)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(3),
  padding: theme.spacing(1, 3),
  background:
    theme.palette.mode === "dark"
      ? `linear-gradient(135deg, ${theme.palette.primary.dark}66, ${theme.palette.primary.main}33)`
      : `linear-gradient(135deg, ${theme.palette.primary.light}99, ${theme.palette.primary.main}66)`,
  borderRadius: "15px",
  backdropFilter: "blur(5px)",
  boxShadow: `0 10px 20px rgba(0, 0, 0, 0.1), 0 0 15px ${theme.palette.primary.main}33`,
  color: theme.palette.mode === "dark" ? "white" : "rgba(0, 0, 0, 0.8)",
  transformStyle: "preserve-3d",
}));

const WelcomeContainer = styled(motion.div)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  textAlign: "center",
  padding: theme.spacing(4),
  color: theme.palette.mode === "dark" ? "white" : "rgba(0, 0, 0, 0.8)",
}));

// Use the old color array (6 colors)
const colorArray = [
  "#FF5733",
  "#F1C40F",
  "#2C3E50",
  "#3498DB",
  "#8E44AD",
  "#E67E22",
];

// Use the old layout configuration function
const getLayoutConfig = (count) => {
  switch (count) {
    case 2:
      return [{ colSpan: 1 }, { colSpan: 1 }];
    case 3:
      return [{ colSpan: 1 }, { colSpan: 1 }, { colSpan: 2 }];
    case 4:
      return [{ colSpan: 1 }, { colSpan: 1 }, { colSpan: 1 }, { colSpan: 1 }];
    case 5:
      return [
        { colSpan: 1 },
        { colSpan: 1 },
        { colSpan: 1 },
        { colSpan: 1 },
        { colSpan: 2 },
      ];
    default:
      return new Array(count).fill({ colSpan: 1 });
  }
};

// Product color gradient variations
const getColorGradient = (color, mode) => {
  const opacity = mode === "dark" ? "aa" : "cc";
  return `linear-gradient(135deg, ${color}${opacity} 0%, ${color} 50%, ${color}${opacity} 100%)`;
};

// Container item variants for staggered animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Individual product item variants
const itemVariants = {
  hidden: { opacity: 0, y: 20, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
  hover: {
    scale: 1.05,
    boxShadow: "0 30px 40px rgba(0,0,0,0.4)",
    rotateX: 15,
    rotateY: 5,
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
  tap: {
    scale: 0.95,
    boxShadow: "0 15px 20px rgba(0,0,0,0.3)",
    rotateX: 0,
    rotateY: 0,
  },
};

const ProductGrid = ({
  selectedCategory,
  selectedCategoryName,
  selectedCategoryName1,
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTip, setShowTip] = useState(false);
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { mode } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  // Show tip when products are loaded
  useEffect(() => {
    if (products.length > 0) {
      setShowTip(true);
      const timer = setTimeout(() => {
        setShowTip(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [products]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!selectedCategory) {
        setProducts([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await productService.GetProductNamebyCategoryID(
          selectedCategory
        );
        if (response.statusCode === "SUCCESS") {
          // Use old logic for processing products
          setProducts(
            response.data.map((item, index) => ({
              id: item.productNameID,
              name: { en: item.prodEng, si: item.prodSin, ta: item.prodTam },
              color: colorArray[index % colorArray.length],
              ...getLayoutConfig(response.data.length)[index],
            }))
          );
        } else {
          console.error("Failed to fetch products:", response.message);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const handleProductClick = (productId) => {
    navigate(`/product-details/${productId}`);
  };

  // Welcome screen when no category is selected
  const renderWelcome = () => (
    <WelcomeContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          rotateY: [0, 5, 0],
          rotateX: [0, 2, 0],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Typography
          variant="h3"
          sx={{
            mb: 3,
            fontWeight: "bold",
            color: muiTheme.palette.primary.main,
            textShadow: `0 0 10px ${muiTheme.palette.primary.main}66`,
          }}
        >
          {language === "si"
            ? "බැංකු ස්වයං සේවාව"
            : language === "ta"
            ? "வங்கி சுய சேவை"
            : "Bank Self-Service"}
        </Typography>
      </motion.div>

      <Typography variant="h5" sx={{ mb: 4, opacity: 0.8 }}>
        {language === "si"
          ? "කරුණාකර ප්‍රවර්ගයක් තෝරන්න"
          : language === "ta"
          ? "ஒரு வகையைத் தேர்ந்தெடுக்கவும்"
          : "Please select a category"}
      </Typography>

      <motion.div
        animate={{
          y: [0, -15, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <TouchAppIcon
            sx={{ color: muiTheme.palette.primary.main, fontSize: "2rem" }}
          />
          <Typography variant="body1">
            {language === "si"
              ? "වමේ ඇති ප්‍රවර්ග"
              : language === "ta"
              ? "இடது பக்கத்தில் உள்ள வகைகள்"
              : "Categories on the left"}
          </Typography>
        </Box>
      </motion.div>
    </WelcomeContainer>
  );

  // Products grid with animations
  const renderGrid = () => {
    // Create chunks of 6 products for carousel (same as old logic)
    const chunkedProducts = [];
    for (let i = 0; i < products.length; i += 6) {
      chunkedProducts.push(products.slice(i, i + 6));
    }

    return (
      <>
        <CategoryHeader
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          whileHover={{
            scale: 1.03,
            boxShadow: `0 15px 30px rgba(0, 0, 0, 0.2), 0 0 20px ${muiTheme.palette.primary.main}66`,
          }}
        >
          <Typography variant="h5" fontWeight="bold" textAlign="center">
            {selectedCategoryName || `Products`}
          </Typography>
        </CategoryHeader>

        <Carousel
          indicators={products.length > 6}
          navButtonsAlwaysVisible={products.length > 6}
          animation="slide"
          duration={800}
          navButtonsProps={{
            style: {
              backgroundColor: muiTheme.palette.primary.main,
              borderRadius: "15px",
              padding: "8px",
              margin: "0 10px",
            },
          }}
          indicatorContainerProps={{
            style: {
              marginTop: "15px",
            },
          }}
          indicatorIconButtonProps={{
            style: {
              color: `${muiTheme.palette.primary.main}33`,
              padding: "5px",
            },
          }}
          activeIndicatorIconButtonProps={{
            style: {
              color: muiTheme.palette.primary.main,
            },
          }}
        >
          {chunkedProducts.map((chunk, slideIndex) => (
            <motion.div
              key={`slide-${slideIndex}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)", // Use old grid template
                gap: "15px",
                width: "100%",
                height: "400px", // Use old fixed height
                perspective: "1000px",
                transformStyle: "preserve-3d",
              }}
            >
              {chunk.map((product) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => handleProductClick(product.id)}
                  style={{
                    background: getColorGradient(product.color, mode),
                    backgroundSize: "200% 200%",
                    color: "#fff",
                    gridColumn: `span ${product.colSpan}`, // Use old colSpan logic
                    borderRadius: "15px",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
                    border: `1px solid ${product.color}33`,
                    overflow: "hidden",
                    position: "relative",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Background animation */}
                  <Box
                    component={motion.div}
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: getColorGradient(product.color, mode),
                      backgroundSize: "200% 200%",
                      zIndex: 1,
                    }}
                  />

                  {/* Content */}
                  <Box
                    sx={{
                      position: "relative",
                      zIndex: 2,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "100%",
                      height: "100%",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      component={motion.div}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 1 }}
                      sx={{
                        width: "50px",
                        height: "50px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 2,
                      }}
                    >
                      <img
                        src={productIcon}
                        alt="product"
                        style={{
                          width: "100%",
                          height: "auto",
                          filter: "brightness(0) invert(1)",
                          objectFit: "contain",
                        }}
                      />
                    </Box>

                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      textAlign="center"
                      sx={{
                        textShadow: "0 2px 5px rgba(0,0,0,0.5)",
                      }}
                    >
                      {product.name[language] || product.name.en}
                    </Typography>
                  </Box>

                  {/* 3D hover effect - floating particles */}
                  {[...Array(5)].map((_, i) => (
                    <Box
                      component={motion.div}
                      key={`particle-${product.id}-${i}`}
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
                        opacity: [0.3, 0.7, 0.3],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      sx={{
                        position: "absolute",
                        width: "8px",
                        height: "8px",
                        background: "#fff",
                        borderRadius: "50%",
                        zIndex: 3,
                      }}
                    />
                  ))}
                </motion.div>
              ))}
            </motion.div>
          ))}
        </Carousel>

        {/* Touch hint overlay */}
        <AnimatePresence>
          {showTip && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                position: "absolute",
                bottom: "20px",
                left: "50%",
                transform: "translateX(-50%)",
                padding: "10px 20px",
                background: "rgba(0,0,0,0.7)",
                color: "#fff",
                borderRadius: "30px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                boxShadow: `0 5px 15px rgba(0,0,0,0.3), 0 0 10px ${muiTheme.palette.primary.main}33`,
                border: `1px solid ${muiTheme.palette.primary.main}33`,
                backdropFilter: "blur(5px)",
                zIndex: 10,
              }}
            >
              <TouchAppIcon sx={{ color: muiTheme.palette.primary.main }} />
              <Typography>
                {language === "si"
                  ? "සේවාවක් තෝරන්න"
                  : language === "ta"
                  ? "சேவையைத் தேர்ந்தெடுக்கவும்"
                  : "Select a service"}
              </Typography>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  };

  return (
    <ProductContainer
      isMobile={isMobile}
      component={motion.div}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {!selectedCategory ? (
        renderWelcome()
      ) : loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Typography variant="h6" color="text.secondary">
            {language === "si"
              ? "පූරණය වෙමින්..."
              : language === "ta"
              ? "ஏற்றுகிறது..."
              : "Loading..."}
          </Typography>
        </Box>
      ) : (
        renderGrid()
      )}
    </ProductContainer>
  );
};

export default ProductGrid;
