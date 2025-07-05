import React, { useState } from "react";
import productService from "./services";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  IconButton,
  Snackbar,
  Alert,
  useTheme,
} from "@mui/material";

const CustomerFeedback = ({ productId, productName }) => {
  const [formData, setFormData] = useState({
    feedback: "",
    name: "",
    phone: "",
    email: "",
  });
  const [selectedEmojiId, setSelectedEmojiId] = useState(null);
  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const emojis = [
    { id: 1, symbol: "😃", label: "Excellent", satisfaction: "Very Satisfied" },
    { id: 2, symbol: "🙂", label: "Very Good", satisfaction: "Satisfied" },
    { id: 3, symbol: "😐", label: "Good", satisfaction: "Neutral" },
    { id: 4, symbol: "🙁", label: "Poor", satisfaction: "Dissatisfied" },
    {
      id: 5,
      symbol: "😞",
      label: "Very Poor",
      satisfaction: "Very Dissatisfied",
    },
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.feedback.trim()) newErrors.feedback = "Feedback is required";
    if (!selectedEmojiId) newErrors.rating = "Please select a rating";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const feedbackData = {
      EmojiID: selectedEmojiId,
      Feedback: formData.feedback,
      CusName: formData.name,
      CusPhone: formData.phone,
      CusEmail: formData.email,
      //ScreenID: productId,
      ScreenID: productId,
      //ProductID: productId,
      CreatedDate: new Date().toISOString(),
    };
    console.log(productId);

    try {
      const response = await productService.postFeedback(feedbackData);
      if (response.statusCode === "SUCCESS") {
        setSubmitStatus("success");
        setFormData({ feedback: "", name: "", phone: "", email: "" });
        setSelectedEmojiId(null);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error("Submission error:", error);
    }
    setOpenSnackbar(true);
  };

  return (
    <Box
      sx={{
        p: 2,
        bgcolor: "background.paper",

        //bgcolor: "rgba(255, 255, 255, 0.5)",
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 1,
          color: "#FFA500",
          fontWeight: "bold",
          textAlign: "center",
          fontSize: "1.2rem",
        }}
      >
        Share Your Feedback
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ mb: 1, color: "#333" }}>
              How satisfied are you with {productName}?
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                {emojis.map((emoji) => (
                  <Box
                    key={emoji.id}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <IconButton
                      onClick={() => {
                        setSelectedEmojiId(emoji.id);
                        setErrors((prev) => ({ ...prev, rating: "" }));
                      }}
                      sx={{
                        fontSize: "1.8rem",
                        bgcolor:
                          selectedEmojiId === emoji.id
                            ? "rgba(255, 165, 0, 0.3)"
                            : "transparent",
                        "&:hover": { bgcolor: "rgba(255, 165, 0, 0.2)" },
                      }}
                    >
                      {emoji.symbol}
                    </IconButton>
                    <Typography variant="caption">{emoji.label}</Typography>
                  </Box>
                ))}
              </Box>
              {selectedEmojiId && (
                <Typography variant="body2" sx={{ mt: 1, fontWeight: "bold" }}>
                  {emojis.find((e) => e.id === selectedEmojiId)?.satisfaction}
                </Typography>
              )}
              {errors.rating && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                  {errors.rating}
                </Typography>
              )}
            </Box>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Your Feedback *"
              name="feedback"
              value={formData.feedback}
              onChange={handleInputChange}
              error={!!errors.feedback}
              helperText={errors.feedback}
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#FFA500" },
                  "&:hover fieldset": { borderColor: "#FFA500" },
                  "&.Mui-focused fieldset": { borderColor: "#FFA500" },
                },
                "& label.Mui-focused": { color: "#FFA500" },
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              size="small"
              sx={{ fieldset: { borderColor: "#FFA500" } }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              error={!!errors.phone}
              helperText={errors.phone}
              size="small"
              sx={{ fieldset: { borderColor: "#FFA500" } }}
              inputProps={{ pattern: "[0-9]{10}" }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
              size="small"
              sx={{ fieldset: { borderColor: "#FFA500" } }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              type="submit"
              size="small"
              sx={{
                py: 1,
                bgcolor: "#FFA500",
                "&:hover": { bgcolor: "#FF8C00" },
              }}
            >
              Submit Feedback
            </Button>
          </Grid>
        </Grid>
      </form>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={submitStatus}
          onClose={() => setOpenSnackbar(false)}
          sx={{ width: "100%" }}
        >
          {submitStatus === "success"
            ? "Thank you for your feedback!"
            : "Failed to submit feedback. Please try again."}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CustomerFeedback;
