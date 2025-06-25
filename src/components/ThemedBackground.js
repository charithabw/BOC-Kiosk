import React, { useRef, useEffect } from "react";
import { Box, useTheme as useMuiTheme } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "../theme/ThemeContext";
import backgroundVideo from "../assets/videos/bg.mp4";
//import backgroundVideo from "../assets/videos/bg3_1.mp4";

const YELLOW_COLOR = "#FFA500";
const YELLOW_DARK = "#FBC02D";
const YELLOW_LIGHT = "#FFF59D";

const ThemedBackground = () => {
  const { mode } = useTheme();
  const muiTheme = useMuiTheme();
  const videoRef = useRef(null);

  // Adjust video brightness based on theme
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.style.filter =
        mode === "light" ? "brightness(0.7)" : "brightness(0.4)";
    }
  }, [mode]);

  return (
    <>
      {/* Video Background */}
      <Box
        component="video"
        ref={videoRef}
        autoPlay
        muted
        loop
        sx={{
          position: "fixed",
          right: 0,
          bottom: 0,
          minWidth: "100%",
          minHeight: "100%",
          width: "auto",
          height: "auto",
          zIndex: -2,
          objectFit: "cover",
          transition: "filter 0.5s ease",
        }}
      >
        <source src={backgroundVideo} type="video/mp4" />
      </Box>

      {/* Theme-based overlay */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            mode === "dark"
              ? "rgba(0, 0, 0, 0.7)"
              : "rgba(255, 255, 255, 0.15)",
          zIndex: -1,
          transition: "background 0.5s ease",
        }}
      />

      {/* Floating Elements */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`element-${i}`}
          style={{
            position: "fixed",
            width: i % 2 === 0 ? "50px" : "5px",
            height: i % 2 === 0 ? "50px" : "5px",
            background:
              i % 3 === 0
                ? YELLOW_COLOR
                : i % 3 === 1
                ? YELLOW_DARK
                : YELLOW_LIGHT,
            opacity: 0.1 + Math.random() * 0.2,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            zIndex: -1,
            borderRadius: i % 2 === 0 ? "50%" : "3px",
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
            position: "fixed",
            fontSize: "24px",
            color: YELLOW_COLOR,
            opacity: 0.5,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            zIndex: -1,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0.5, 0.8, 0.5],
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

export default ThemedBackground;
