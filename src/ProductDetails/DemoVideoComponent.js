import React from "react";
import { Box, Typography } from "@mui/material";
import demoVideo from "../assets/videos/English B App.mp4"; // Adjust the path as necessary

function DemoVideoComponent({ videos }) {
  return (
    <Box
      sx={{
        height: "calc(100vh - 300px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
      }}
    >
      {videos.map((video, index) => (
        <Box
          key={index}
          sx={{
            width: "100%",
            maxWidth: "auto",
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: 3,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "white",
              height: "10px",
              backgroundColor: "rgba(255, 165, 0, 0.5)",
              padding: "8px 16px",
              borderRadius: "8px 8px 0 0",
              textAlign: "center",
            }}
          ></Typography>
          <video
            controls
            //src={video.src}
            src={demoVideo}
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "60vh",
              backgroundColor: "black",
            }}
          >
            Your browser does not support the video tag.
          </video>
        </Box>
      ))}
    </Box>
  );
}

export default DemoVideoComponent;
