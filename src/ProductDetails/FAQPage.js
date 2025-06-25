import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import { useLanguage } from "../language/LanguageContext";
import faqData from "./faqData";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const FAQPage = ({ productId }) => {
  const { language } = useLanguage();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const getQuestion = (faq) => faq.question[language] || faq.question.en;
  const getAnswer = (faq) => faq.answer[language] || faq.answer.en;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ padding: isMobile ? "0.5rem" : "2rem" }}
    >
      <Typography
        variant="h4"
        sx={{
          color: "white",
          backgroundColor: "rgba(255, 165, 0, 0.5)",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          fontWeight: "bold",
          fontSize: "2rem",
          padding: "0 10px",
          borderBottom: "solid 2px rgba(255, 165, 0, 1)",
          mb: 4,
          textShadow: "2px 2px 4px rgba(255, 165, 0, 0.3)",
          textAlign: "center",
        }}
      >
        {language === "en" && "Frequently Asked Questions"}
        {language === "si" && "නිතර අසන ප්රශ්න"}
        {language === "ta" && "அடிக்கடி கேட்கப்படும் கேள்விகள்"}
      </Typography>

      <List sx={{ width: "100%", maxWidth: 800, margin: "0 auto" }}>
        {faqData.map((faq) => (
          <motion.div
            key={faq.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Accordion
              expanded={expanded === faq.id}
              onChange={handleChange(faq.id)}
              sx={{
                marginBottom: 2,
                borderRadius: "10px",
                backgroundColor: "background.primary",
                //  rgba(255, 255, 255, 0.9)
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                "&:hover": {
                  boxShadow: "0 6px 12px rgba(255, 165, 0, 0.3)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      color: expanded === faq.id ? "#FFA500" : "inherit",
                      transform:
                        expanded === faq.id ? "rotate(180deg)" : "none",
                      transition: "transform 0.3s ease",
                    }}
                  />
                }
                sx={{
                  minHeight: 72,
                  "& .MuiAccordionSummary-content": {
                    alignItems: "center",
                  },
                  backgroundColor:
                    expanded === faq.id
                      ? "rgba(255, 165, 0, 0.1)"
                      : "transparent",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: expanded === faq.id ? "#FFA500" : "text.primary",
                    fontSize: isMobile ? "1rem" : "1.1rem",
                  }}
                >
                  {getQuestion(faq)}
                </Typography>
              </AccordionSummary>

              <AccordionDetails
                sx={{
                  backgroundColor: "rgba(255, 165, 0, 0.05)",
                  borderTop: "1px solid rgba(255, 165, 0, 0.1)",
                }}
              >
                <List>
                  {getAnswer(faq).map((point, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <ListItem sx={{ alignItems: "flex-start", py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32, mt: "4px" }}>
                          <FiberManualRecordIcon
                            sx={{
                              fontSize: "0.8rem",
                              color: "#FFA500",
                            }}
                          />
                        </ListItemIcon>
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 500,
                            fontSize: isMobile ? "0.9rem" : "1rem",
                            lineHeight: 1.5,
                          }}
                        >
                          {point}
                        </Typography>
                      </ListItem>
                    </motion.div>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          </motion.div>
        ))}
      </List>
    </motion.div>
  );
};

export default FAQPage;
