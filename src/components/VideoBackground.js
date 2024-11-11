// VideoBackground.js

import React from "react";

function VideoBackground() {
  return (
    <video autoPlay loop muted className="video">
      <source src="videos/GIRL.mp4" type="video/mp4" />
    </video>
  );
}

export default VideoBackground;
