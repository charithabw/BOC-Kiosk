import React from "react";
import { Box, styled } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "../theme/ThemeContext";
import backgroundVideo from "../assets/videos/bg.mp4";

// Helper function to get theme colors
const getThemeColors = (mode) => {
  const YELLOW_COLOR = "#FFA500";
  const YELLOW_DARK = "#FBC02D";
  const YELLOW_LIGHT = "#FFF59D";
  const LIGHT_YELLOW = "#FF8C00";
  const LIGHT_YELLOW_DARK = "#F57C00";
  const LIGHT_YELLOW_LIGHT = "#FFD54F";

  if (mode === "light") {
    return {
      accentMain: LIGHT_YELLOW,
      accentDark: LIGHT_YELLOW_DARK,
      accentLight: LIGHT_YELLOW_LIGHT,
      background: "rgba(255, 255, 255, 0.9)",
      backgroundMedium: "rgba(248, 248, 248, 0.9)",
      backgroundLight: "rgba(255, 255, 255, 0.7)",
      cardBackground: "rgba(255, 255, 255, 0.8)",
      text: "#333333",
      textSecondary: "rgba(0, 0, 0, 0.7)",
      positive: "#4CAF50",
      negative: "#F44336",
      accentTransparent: `${LIGHT_YELLOW}33`,
      accentMediumTransparent: `${LIGHT_YELLOW}66`,
      videoOverlay: "rgba(255, 255, 255, 0.7)",
    };
  }
  // Dark theme (default)
  return {
    accentMain: YELLOW_COLOR,
    accentDark: YELLOW_DARK,
    accentLight: YELLOW_LIGHT,
    background: "rgba(0, 0, 0, 0.7)",
    backgroundMedium: "rgba(0, 0, 0, 0.7)",
    backgroundLight: "rgba(0, 0, 0, 0.6)",
    cardBackground: "rgba(0, 0, 0, 0.7)",
    text: "#ffffff",
    textSecondary: "rgba(255, 255, 255, 0.8)",
    positive: "#81C784",
    negative: "#F06292",
    accentTransparent: `${YELLOW_COLOR}33`,
    accentMediumTransparent: `${YELLOW_COLOR}66`,
    videoOverlay: "rgba(0, 0, 0, 0.7)",
  };
};

const VideoBackgroundElement = styled("video")({
  position: "fixed",
  right: 0,
  bottom: 0,
  minWidth: "100%",
  minHeight: "100%",
  width: "auto",
  height: "auto",
  zIndex: -1,
  objectFit: "cover",
});

const VideoOverlay = styled(Box)(({ customTheme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: customTheme.videoOverlay,
  zIndex: -1,
}));

const VideoBackground = () => {
  const { mode } = useTheme();
  const colors = getThemeColors(mode);

  return (
    <>
      <VideoBackgroundElement autoPlay muted loop>
        <source src={backgroundVideo} type="video/mp4" />
      </VideoBackgroundElement>
      <VideoOverlay customTheme={colors} />

      {/* Additional floating elements */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`element-${i}`}
          style={{
            position: "absolute",
            width: i % 2 === 0 ? "50px" : "5px",
            height: i % 2 === 0.5 ? "50px" : "5px",
            background:
              i % 3 === 0
                ? colors.accentMain
                : i % 3 === 1
                ? colors.accentDark
                : colors.accentLight,
            opacity: 0.2 + Math.random() * 0.3,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            zIndex: 0,
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
            position: "absolute",
            fontSize: "24px",
            color: colors.accentMain,
            opacity: 0.7,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            zIndex: 0,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0.7, 1, 0.7],
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

export default VideoBackground;
