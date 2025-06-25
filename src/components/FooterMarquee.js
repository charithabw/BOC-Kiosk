import React from "react";
import { Box, Typography, Stack, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTheme } from "../theme/ThemeContext";

const exchangeRates = [
  { code: "USD", buy: "286.2500", sell: "294.2500", flag: "us" },
  { code: "AED", buy: "73.1924", sell: "83.6004", flag: "ae" },
  { code: "AUD", buy: "179.5991", sell: "190.6771", flag: "au" },
  { code: "BHD", buy: "675.1258", sell: "784.3905", flag: "bh" },
  { code: "CNY", buy: "36.9925", sell: "40.8416", flag: "cn" },
  { code: "JPY", buy: "1.8366", sell: "1.8366", flag: "jp" },
  { code: "EUR", buy: "295.6115", sell: "310.0231", flag: "eu" },
  { code: "GBP", buy: "358.0765", sell: "373.2929", flag: "gb" },
  { code: "CAD", buy: "198.9506", sell: "210.1080", flag: "ca" },
];

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
      text: YELLOW_COLOR,
      textSecondary: "rgba(0, 0, 0, 0.7)",
      positive: "#4CAF50",
      negative: "#F44336",
      accentTransparent: `${LIGHT_YELLOW}33`,
      accentMediumTransparent: `${LIGHT_YELLOW}66`,
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
    text: YELLOW_COLOR,
    //textSecondary: "rgba(255, 255, 255, 0.8)",
    textSecondary: "rgba(255, 255, 255, 0.8)",
    positive: "#81C784",
    negative: "#F06292",
    accentTransparent: `${YELLOW_COLOR}33`,
    accentMediumTransparent: `${YELLOW_COLOR}66`,
  };
};

const MarqueeContainer = styled(Box)(({ customTheme }) => ({
  position: "fixed",
  left: 0,
  bottom: 0,
  width: "100%",
  background: customTheme.background,
  color: customTheme.text,
  zIndex: 9999,
  overflow: "hidden",
  borderTop: `1px solid ${customTheme.accentTransparent}`,
  height: "70px",
  display: "flex",
  alignItems: "center",
  padding: "0 0 2px 0",
}));

const MarqueeTrack = styled(Box)({
  display: "flex",
  alignItems: "center",
  whiteSpace: "nowrap",
  animation: "marquee 30s linear infinite",
  "@keyframes marquee": {
    "0%": { transform: "translateX(0)" },
    "100%": { transform: "translateX(-50%)" },
  },
});

const RateCard = styled(Paper)({
  display: "flex",
  alignItems: "center",
  background: "transparent",
  boxShadow: "none",
  margin: "0 12px 0 0",
  padding: "0 4px",
  minWidth: "80px",
  height: "28px",
});

const FlagImage = styled("img")({
  width: "18px",
  height: "12px",
  objectFit: "cover",
  borderRadius: "2px",
  marginRight: "4px",
});

const FooterMarquee = () => {
  const { mode } = useTheme();
  const colors = getThemeColors(mode);
  // Duplicate the rates for seamless looping
  const marqueeRates = [...exchangeRates, ...exchangeRates];
  return (
    <MarqueeContainer customTheme={colors}>
      <MarqueeTrack>
        {marqueeRates.map((rate, idx) => (
          <RateCard key={idx} elevation={0}>
            <FlagImage
              src={`https://countryflagsapi.com/svg/${rate.flag}`}
              alt={`${rate.code} flag`}
            />
            <Stack spacing={0.1}>
              <Typography
                variant="caption"
                fontWeight="bold"
                sx={{ lineHeight: 1, fontSize: "0.75rem", color: colors.text }}
              >
                {rate.code}
              </Typography>
              <Stack direction="row" spacing={0.5}>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 500,
                    fontSize: "0.75rem",
                    color: colors.textSecondary,
                  }}
                >
                  {rate.buy}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 500,
                    fontSize: "0.75rem",
                    color: colors.textSecondary,
                  }}
                >
                  {rate.sell}
                </Typography>
              </Stack>
            </Stack>
          </RateCard>
        ))}
      </MarqueeTrack>
    </MarqueeContainer>
  );
};

export default FooterMarquee;
