import React, { useState } from "react";
import { Box, Modal, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";

const DownloadApp = ({ qrCodes }) => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ textAlign: "center", padding: 4 }}>
      <h2>Download the App</h2>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 4 }}>
        {Object.entries(qrCodes).map(([store, src]) => (
          <motion.img
            key={store}
            src={src}
            alt={`${store} QR`}
            style={{ cursor: "pointer", width: "120px", height: "auto" }}
            whileHover={{ scale: 1.1 }}
            onClick={() => handleOpen(src)}
          />
        ))}
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            position: "relative",
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <img
            src={selectedImage}
            alt="Selected QR"
            style={{ width: "300px", height: "auto" }}
          />
        </motion.div>
      </Modal>
    </Box>
  );
};

export default DownloadApp;
