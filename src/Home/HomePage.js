import React, { useEffect, useState, useRef } from "react";
import { useLanguage } from "../language/LanguageContext";
import categoryService from "../categories/Services";
import VideoPlainBackground from "../components/VideoPlainBackground";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  Typography,
  useMediaQuery,
  Card,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";

// Digital Banking Background Animation Component
const DigitalBankingBackground = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        zIndex: 0,
        opacity: 0.15,
        pointerEvents: "none",
      }}
    >
      {/* Floating digital elements */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: 40 + Math.random() * 60,
            height: 40 + Math.random() * 60,
            borderRadius: Math.random() > 0.5 ? "50%" : "5px",
            background:
              i % 3 === 0 ? "#ff9800" : i % 3 === 1 ? "#54004E" : "#2196F3",
            opacity: 0.2 + Math.random() * 0.3,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
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

      {/* Digital lines connecting elements */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`line-${i}`}
          style={{
            position: "absolute",
            height: 2,
            background:
              "linear-gradient(90deg, transparent, #ff9800, transparent)",
            top: `${Math.random() * 100}%`,
            left: 0,
            right: 0,
          }}
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 7,
            repeat: Infinity,
            delay: i * 2,
          }}
        />
      ))}

      {/* Digital currency symbols */}
      {["$", "€", "¥", "£", "₹"].map((symbol, i) => (
        <motion.div
          key={`symbol-${i}`}
          style={{
            position: "absolute",
            fontSize: 30 + Math.random() * 20,
            color: "#ff9800",
            opacity: 0.3,
            fontWeight: "bold",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100],
            opacity: [0.3, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: i * 5,
          }}
        >
          {symbol}
        </motion.div>
      ))}

      {/* Data visualization elements */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`chart-${i}`}
          style={{
            position: "absolute",
            width: 100,
            height: 60,
            bottom: `${20 + Math.random() * 30}%`,
            left: `${i * 20}%`,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          {[...Array(5)].map((_, j) => (
            <motion.div
              key={`bar-${i}-${j}`}
              style={{
                width: 10,
                background: "#ff9800",
                borderRadius: 5,
              }}
              animate={{
                height: [10, 10 + Math.random() * 50, 10],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: j * 0.5,
              }}
            />
          ))}
        </motion.div>
      ))}

      {/* Binary code effect */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`binary-${i}`}
          style={{
            position: "absolute",
            fontSize: 14,
            color: "#54004E",
            opacity: 0.2,
            fontFamily: "monospace",
            top: `${i * 12}%`,
            left: `${Math.random() * 80}%`,
            whiteSpace: "nowrap",
          }}
          animate={{
            x: [-100, window.innerWidth],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {Array(20)
            .fill()
            .map(() => Math.round(Math.random()))
            .join("")}
        </motion.div>
      ))}
    </Box>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [categories, setCategories] = useState([]);
  const isMobile = useMediaQuery("(max-width:600px)");
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
      setCurrentCategoryPage(
        (prev) => (prev + 1) % Math.ceil(categories.length / 6)
      );
    }, 8000);

    return () => {
      clearInterval(adInterval);
      clearInterval(categoryInterval);
    };
  }, [categories.length]);

  // Sample ads - replace with your actual ads
  const ads = [
    "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500&h=500&fit=crop",
  ];

  const itemsPerPage = isMobile ? 4 : 6;
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  const nextPage = () => {
    setCurrentCategoryPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentCategoryPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{
        height: "100vh",
        overflow: "hidden",
        background: "linear-gradient(135deg, #1a1a2e, #16213e)",
        position: "relative",
      }}
    >
      {/* Add the digital banking background */}
      <DigitalBankingBackground />

      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          height: "100vh",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Left Side - Ad Display with 3D effect */}
        <Box
          component={motion.div}
          layout
          sx={{
            width: isMobile ? "100%" : "40%",
            height: isMobile ? "40vh" : "100vh",
            position: "relative",
            perspective: "1000px",
            overflow: "hidden",
          }}
        >
          <VideoPlainBackground />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentAdIndex}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                duration: 0.8,
              }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: isMobile ? 0 : "0 100px 100px 0",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              }}
            >
              <motion.img
                src={ads[currentAdIndex]}
                alt={`ad-${currentAdIndex}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              />

              {/* Ad indicator dots */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 20,
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  gap: 1,
                }}
              >
                {ads.map((_, index) => (
                  <motion.div
                    key={index}
                    animate={{
                      scale: currentAdIndex === index ? 1.5 : 1,
                      backgroundColor:
                        currentAdIndex === index ? "#ff9800" : "#ffffff",
                    }}
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                    onClick={() => setCurrentAdIndex(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </Box>
            </motion.div>
          </AnimatePresence>
        </Box>

        {/* Right Side - Category Display */}
        <Box
          component={motion.div}
          layout
          sx={{
            width: isMobile ? "100%" : "60%",
            padding: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 15,
              delay: 0.2,
            }}
          >
            {/*<Typography
              variant="h3"
              sx={{
                color: "#ff9800",
                fontWeight: "bold",
                textAlign: "center",
                mb: 5,
                textShadow: "0 0 10px rgba(255, 152, 0, 0.5)",
                letterSpacing: "1px",
              }}
            >
              {language === "si" ? "ප්රධාන ප්රවර්ග" : "Main Categories"}
            </Typography> */}
          </motion.div>

          {/* Category Navigation Controls */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              mb: 2,
            }}
          >
            <IconButton
              component={motion.button}
              whileHover={{
                scale: 1.2,
                backgroundColor: "rgba(255, 152, 0, 0.2)",
              }}
              whileTap={{ scale: 0.9 }}
              onClick={prevPage}
              sx={{ color: "#ff9800" }}
            >
              <ArrowBackIcon fontSize="large" />
            </IconButton>

            <Box sx={{ display: "flex", gap: 1 }}>
              {Array(totalPages)
                .fill()
                .map((_, index) => (
                  <motion.div
                    key={index}
                    animate={{
                      scale: currentCategoryPage === index ? 1.5 : 1,
                      backgroundColor:
                        currentCategoryPage === index ? "#ff9800" : "#555",
                    }}
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                    onClick={() => setCurrentCategoryPage(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
            </Box>

            <IconButton
              component={motion.button}
              whileHover={{
                scale: 1.2,
                backgroundColor: "rgba(255, 152, 0, 0.2)",
              }}
              whileTap={{ scale: 0.9 }}
              onClick={nextPage}
              sx={{ color: "#ff9800" }}
            >
              <ArrowForwardIcon fontSize="large" />
            </IconButton>
          </Box>

          {/* Categories Grid with Animation */}
          <Box
            sx={{
              width: "100%",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCategoryPage}
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${isMobile ? 2 : 3}, 1fr)`,
                  gap: 20,
                  padding: 10,
                }}
              >
                {categories
                  .slice(
                    currentCategoryPage * itemsPerPage,
                    (currentCategoryPage + 1) * itemsPerPage
                  )
                  .map((category, index) => (
                    <CategoryCard
                      key={category.categoryID}
                      category={category}
                      language={language}
                      onCategoryClick={handleCategoryClick}
                      index={index}
                      ref={touchRippleRefs.current[index]}
                    />
                  ))}
              </motion.div>
            </AnimatePresence>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};

// Enhanced Category Card with 3D effects, animations, and background image
const CategoryCard = React.forwardRef(
  ({ category, language, onCategoryClick, index }, ref) => {
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

    return (
      <motion.div
        whileHover={{
          scale: 1.1,
          boxShadow: "0 20px 30px rgba(0,0,0,0.4)",
          rotateY: 5,
          rotateX: 5,
          z: 50,
        }}
        whileTap={{ scale: 0.95 }}
        animate={(randomAnimation, { opacity: 1, y: 0 })}
        initial={{ opacity: 0, y: 50 }}
        //animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          delay: index * 0.1,
        }}
        onClick={() => onCategoryClick(category.categoryID)}
        style={{
          position: "relative",
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
      >
        <Card
          sx={{
            height: 180,
            borderRadius: 4,
            backgroundImage: `url(https://images.unsplash.com/photo-1601597111158-2fceff292cdc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            border: "5px solid #ff9800",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(135deg, rgba(255,152,0,0.7), rgba(84,0,78,0.8))",
            },
          }}
        >
          {/* Floating particles effect */}
          {[...Array(5)].map((_, i) => (
            <Box
              key={i}
              component={motion.div}
              sx={{
                position: "absolute",
                width: i % 2 ? 15 : 10,
                height: i % 2 ? 15 : 10,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.3)",
                pointerEvents: "none",
                zIndex: 1,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                opacity: [0.7, 0],
                scale: [1, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                delay: i * 0.5,
              }}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}

          {/* 3D hover effect overlay */}
          <Box
            component={motion.div}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1), transparent)",
              zIndex: 1,
            }}
            whileHover={{
              background:
                "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2), transparent)",
            }}
          />

          {/* Glowing text */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            style={{ zIndex: 2, padding: 16, textAlign: "center" }}
          >
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
          </motion.div>

          {/* Touch ripple effect for feedback */}
          <TouchRipple ref={ref} />
        </Card>
      </motion.div>
    );
  }
);

export default HomePage;
