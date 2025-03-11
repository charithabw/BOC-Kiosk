import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

// Image link object containing promotional banner images
const bannerImages = [
  {
    id: 1,
    imageUrl:
      "https://s3.ap-southeast-1.amazonaws.com/static.boc.lk/7265/media-250205100117.jpg",
    title: "Promotional Banner 1",
    description: "This is the first promotional banner.",
  },
  {
    id: 2,
    imageUrl:
      "https://s3.ap-southeast-1.amazonaws.com/static.boc.lk/6301/media-240502101438.jpg",
    title: "Promotional Banner 2",
    description: "This is the second promotional banner.",
  },
  {
    id: 3,
    imageUrl:
      "https://s3.ap-southeast-1.amazonaws.com/static.boc.lk/7376/media-250307053009.jpeg",
    title: "Promotional Banner 3",
    description: "This is the third promotional banner.",
  },
];

// Animation variants for framer-motion
const bannerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const HomeBanner = () => {
  return (
    <Carousel
      animation="fade" // Slide animation
      duration={1000} // Animation duration
      navButtonsAlwaysVisible // Show navigation buttons always
      indicatorContainerProps={{
        style: {
          marginTop: "-30px", // Adjust indicator position
        },
      }}
    >
      {bannerImages.map((banner) => (
        <motion.div
          key={banner.id}
          variants={bannerVariants}
          initial="hidden"
          animate="visible"
        >
          <Paper
            elevation={3}
            sx={{
              position: "relative",
              height: "400px",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <Box
              component="img"
              src={banner.imageUrl}
              alt={banner.title}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "white",
                padding: "16px",
                textAlign: "center",
              }}
            >
              <Typography variant="h4">{banner.title}</Typography>
              <Typography variant="body1">{banner.description}</Typography>
            </Box>
          </Paper>
        </motion.div>
      ))}
    </Carousel>
  );
};

export default HomeBanner;
