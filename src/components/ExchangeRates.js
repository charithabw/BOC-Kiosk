import React from "react";
import Carousel from "react-material-ui-carousel";
import { Box, Typography, Paper, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

const exchangeRates = [
  { code: "AED", buy: "73.1924", sell: "63.6094", flag: "ae" },
  { code: "AUD", buy: "70.5091", sell: "190.9771", flag: "au" },
  { code: "BHD", buy: "675.1269", sell: "784.3905", flag: "bh" },
  { code: "CNY", buy: "36.6925", sell: "40.6446", flag: "cn" },
  { code: "JPY", buy: "1.8396", sell: "1.6366", flag: "jp" },
  { code: "EUR", buy: "295.6115", sell: "310.0231", flag: "eu" },
  { code: "GBP", buy: "358.0765", sell: "373.2928", flag: "gb" },
  { code: "CAD", buy: "186.8596", sell: "210.1069", flag: "ca" },
];

const RateCard = styled(Paper)({
  padding: "8px 16px", // Reduced padding
  margin: "4px",
  backgroundColor: "#fff",
  display: "flex",
  alignItems: "center",
  gap: "10px", // Reduced gap
  borderRadius: "6px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  minWidth: "250px", // Narrower cards
  height: "60px", // Fixed height
});

const FlagImage = styled("img")({
  width: "30px", // Smaller flag
  height: "20px",
  objectFit: "cover",
  borderRadius: "3px",
});

const ExchangeRates = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#FFD700",
        padding: "10px 0", // Reduced container padding
        boxShadow: "0 -2px 10px rgba(0,0,0,0.05)",
      }}
    >
      <Carousel
        animation="slide"
        interval={2500}
        navButtonsAlwaysVisible
        indicators={false}
        sx={{
          maxWidth: "95%",
          margin: "0 auto",
          height: "70px", // Fixed carousel height
        }}
      >
        {exchangeRates.map((rate, index) => (
          <RateCard key={index} elevation={0}>
            <FlagImage
              src={`https://countryflagsapi.com/svg/${rate.flag}`}
              alt={`${rate.code} flag`}
            />

            <Stack spacing={0.3}>
              <Typography variant="subtitle2" fontWeight="600">
                {rate.code}
              </Typography>

              <Stack direction="row" spacing={2}>
                <div>
                  <Typography variant="caption" color="textSecondary">
                    Buy
                  </Typography>
                  <Typography variant="body2" fontWeight="500">
                    {rate.buy}
                  </Typography>
                </div>

                <div>
                  <Typography variant="caption" color="textSecondary">
                    Sell
                  </Typography>
                  <Typography variant="body2" fontWeight="500">
                    {rate.sell}
                  </Typography>
                </div>
              </Stack>
            </Stack>
          </RateCard>
        ))}
      </Carousel>
    </Box>
  );
};

export default ExchangeRates;
