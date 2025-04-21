import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, ArrowBack } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const NavigationContainer = styled("div")({
  position: "fixed",
  bottom: "80px",
  right: "20px",
  display: "flex",
  gap: "10px",
  zIndex: 1000,
});

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: "#ffd700",
  "&:hover": {
    backgroundColor: "#ffcc00",
  },
  borderRadius: "50%",
  padding: "12px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
}));

const NavigationButtons = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <NavigationContainer>
      {location.pathname !== "/" && (
        <Tooltip title="Go back" arrow>
          <StyledIconButton onClick={() => navigate(-1)}>
            <ArrowBack fontSize="medium" />
          </StyledIconButton>
        </Tooltip>
      )}

      <Tooltip title="Home" arrow>
        <StyledIconButton onClick={() => navigate("/")}>
          <Home fontSize="medium" />
        </StyledIconButton>
      </Tooltip>
    </NavigationContainer>
  );
};

export default NavigationButtons;
