import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useLanguage } from "../language/LanguageContext";
import productService from "./services";
import { motion } from "framer-motion";
import {
  Box,
  Typography,
  CircularProgress,
  Container,
  Tabs,
  Tab,
  Fade,
  Slide,
  Grow,
  List,
  ListItem,
  IconButton,
} from "@mui/material";
import VideoPlainBackground from "../components/VideoPlainBackground";
import DownloadApp from "../components/DownloadApp";
import FAQButton from "../components/FAQButton";
import DemoVideoButton from "../components/DemoVideoButton";
import FeedbackButton from "../components/FeedbackButton";
import { borderColor, borderRightColor, fontSize } from "@mui/system";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"; // Scroll up icon
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"; // Scroll down icon
import { BorderRightOutlined } from "@mui/icons-material";

function ProductDetailsPage() {
  const { productId } = useParams();
  const { language } = useLanguage();
  const [productDetails, setProductDetails] = useState(null);
  const [productImages, setProductImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tabIndex, setTabIndex] = useState(0);
  const [isScrollable, setIsScrollable] = useState(false);
  const scrollContainerRef = useRef(null); // Ref for the scrollable container

  // Scroll up functionality
  const handleScrollUp = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ top: -100, behavior: "smooth" });
    }
  };

  // Scroll down functionality
  const handleScrollDown = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ top: 100, behavior: "smooth" });
    }
  };

  // Check if the content is scrollable
  useEffect(() => {
    const checkScrollable = () => {
      if (scrollContainerRef.current) {
        const { scrollHeight, clientHeight } = scrollContainerRef.current;
        setIsScrollable(scrollHeight > clientHeight);
      }
    };

    checkScrollable();
    window.addEventListener("resize", checkScrollable);
    return () => window.removeEventListener("resize", checkScrollable);
  }, [tabIndex, productDetails]);

  // Custom styles for tab section
  const tabStyles = {
    color: "#000000",
    "& .MuiTabs-indicator": {
      backgroundColor: "#FFA500",
    },
    "& .MuiTab-root": {
      color: "rgba(255, 165, 0, 1)",
      fontSize: "1.1rem",
      fontWeight: "bold",
      borderTopStyle: "solid",
      borderTopColor: "rgba(255, 165, 0, 1)",
      borderRightColor: "rgba(255, 165, 0, 1)",
      "&.Mui-selected": {
        color: "white",
        backgroundColor: "rgba(255, 165, 0, 0.5)",
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
        fontWeight: "bold",
        fontSize: "1.2rem",
      },
    },
  };

  // Custom styles for scroll bar
  const scrollBarStyle = {
    height: "calc(100vh - 260px)",
    overflow: "auto",
    position: "relative",
    "&::-webkit-scrollbar": {
      width: "6px",
      borderColor: "white",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "rgba(255, 165, 0, 0.2)",
      width: "20px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(255, 165, 0, 1)",
      borderRadius: "10px",
      height: "100px",
      "&:hover": {
        backgroundColor: "rgba(255, 165, 0, 1)",
      },
    },
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const detailResponse =
          await productService.GetProductDetailByProductNameID(productId);
        const imagesResponse =
          await productService.GetProductImagesByProductNameID(productId);
        if (
          detailResponse.statusCode === "SUCCESS" &&
          detailResponse.data.length > 0
        ) {
          setProductDetails(detailResponse.data[0]);
        } else {
          console.error("Failed to fetch product details");
          setError("Failed to fetch product details");
        }

        if (
          imagesResponse.statusCode === "SUCCESS" &&
          imagesResponse.data.length > 0
        ) {
          setProductImages(imagesResponse.data[0]);
        } else {
          console.error("Failed to fetch product images");
          setError("Failed to fetch product images");
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError("Error fetching product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="body1" color="error">
        {error}
      </Typography>
    );
  }

  if (!productDetails) {
    return <Typography variant="body1">Product not found</Typography>;
  }

  const {
    titleEng,
    titleSin,
    titleTam,
    desEng,
    desSin,
    desTam,
    subTitleEng,
    subTitleSin,
    subTitleTam,
    pointListEng,
    pointListSin,
    pointListTam,
  } = productDetails;

  const getTitle = () =>
    ({ en: titleEng, si: titleSin, ta: titleTam }[language]);
  const getDescription = () =>
    ({ en: desEng, si: desSin, ta: desTam }[language]);
  const getSubtitle = () =>
    ({ en: subTitleEng, si: subTitleSin, ta: subTitleTam }[language]);
  const getPointList = () =>
    ({ en: pointListEng, si: pointListSin, ta: pointListTam }[language].split(
      "\r\n"
    ));

  const toImageUrl = (base64Url) => `data:image/jpeg;base64,${base64Url}`;

  const { logo, qrAndroid, qrApple, qrHuawei } = productImages;
  const qrCodes = {
    appStore: toImageUrl(qrApple),
    playStore: toImageUrl(qrAndroid),
    huaweiStore: toImageUrl(qrHuawei),
  };

  const tabs = [
    {
      label: "☴ Main",
      component: (
        <Fade in={tabIndex === 0} timeout={500}>
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 2,
              }}
            >
              {logo ? (
                <motion.img
                  src={toImageUrl(logo)}
                  alt="Product logo"
                  style={{ width: 150, height: "auto", marginBottom: "0px" }}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                />
              ) : (
                <Typography>No logo data or rendering issue</Typography>
              )}
              <DownloadApp qrCodes={qrCodes} />
            </Box>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: "white",
                  marginTop: 0,
                  backgroundColor: "rgba(255, 165, 0, 0.5)",
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                  fontWeight: "bold",
                  width: "auto",
                  fontSize: "2.5rem",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  width: "auto",
                  borderBottomStyle: "solid",
                  borderBottomColor: "rgba(255, 165, 0, 1)",
                  display: "inline-block",
                  whiteSpace: "nowrap",
                }}
              >
                {getTitle()}
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Typography
                variant="body1"
                sx={{
                  marginTop: 2,
                  color: "text.secondary",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              >
                {getDescription()}
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Typography
                variant="h6"
                sx={{ marginTop: 2, fontWeight: "bold" }}
              >
                {getSubtitle()}
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <List sx={{ marginTop: 2 }}>
                {getPointList().map((point, index) => (
                  <ListItem key={index} sx={{ paddingLeft: 0 }}>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      ✧{point}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </motion.div>
          </Box>
        </Fade>
      ),
    },
    {
      label: "� FAQ",
      component: (
        <Slide direction="left" in={tabIndex === 1} mountOnEnter unmountOnExit>
          <Box>
            <FAQButton productId={productId} />
          </Box>
        </Slide>
      ),
    },
    {
      label: "▶ Demo Video",
      component: (
        <Grow in={tabIndex === 2} timeout={500}>
          <Box>
            <DemoVideoButton />
          </Box>
        </Grow>
      ),
    },
    {
      label: "🗨 Feedback",
      component: (
        <Slide direction="right" in={tabIndex === 3} mountOnEnter unmountOnExit>
          <Box>
            <FeedbackButton productName={getTitle()} />
          </Box>
        </Slide>
      ),
    },
  ];

  return (
    <Container sx={{ padding: 3, height: "100vh", overflow: "hidden" }}>
      <VideoPlainBackground />
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={tabStyles}
      >
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab.label} />
        ))}
      </Tabs>

      {/* Scrollable Container */}
      <Box sx={scrollBarStyle} ref={scrollContainerRef}>
        {/* Scroll Up Button */}
        {isScrollable && (
          <IconButton
            onClick={handleScrollUp}
            sx={{
              position: "fixed",
              right: 140,
              bottom: 150,
              backgroundColor: "rgba(255, 165, 0, 0.8)",
              animation: "pulse 3s infinite",
              "&:hover": {
                backgroundColor: "rgba(255, 165, 0, 1)",
                animation: "none",
              },
              "@keyframes pulse": {
                "0%": {
                  backgroundColor: "rgba(255, 165, 0, 0.5)",
                },
                "50%": {
                  backgroundColor: "rgba(255, 165, 0, 2)",
                },
                "100%": {
                  backgroundColor: "rgba(255, 165, 0, 0.5)",
                },
              },
            }}
          >
            <ArrowUpwardIcon />
          </IconButton>
        )}

        {/* Scroll Down Button */}
        {isScrollable && (
          <IconButton
            onClick={handleScrollDown}
            sx={{
              position: "fixed",
              right: 140,
              bottom: 105,
              backgroundColor: "rgba(255, 165, 0, 0.8)",
              animation: "pulse 3s infinite",
              "&:hover": {
                backgroundColor: "rgba(255, 165, 0, 1)",
                animation: "none", // Stop animation on hover
              },
              "@keyframes pulse": {
                "0%": {
                  backgroundColor: "rgba(255, 165, 0, 0.5)",
                },
                "50%": {
                  backgroundColor: "rgba(255, 165, 0, 2)",
                },
                "100%": {
                  backgroundColor: "rgba(255, 165, 0, 0.5)",
                },
              },
            }}
          >
            <ArrowDownwardIcon />
          </IconButton>
        )}
        {tabs.map((tab, index) => (
          <Box
            key={index}
            sx={{
              display: tabIndex === index ? "block" : "none",
            }}
          >
            {tab.component}
          </Box>
        ))}
      </Box>
    </Container>
  );
}

export default ProductDetailsPage;
