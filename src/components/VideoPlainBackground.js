import React from "react";
import "../style/videobackground.css";

function VideoPlainBackground() {
  return (
    <div className="video-background-container">
      <video autoPlay loop muted className="background-video">
        <source src="/videos/Without Girl.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default VideoPlainBackground;
