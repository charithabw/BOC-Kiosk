
import React from "react";
import '../style/videobackground.css'

function VideoBackground() {
  console.log("VideoBackground component rendered");
  return (
    <video autoPlay loop muted className="video">
      <source src="videos/GIRL.mp4" type="video/mp4" />
    </video>
  );
}

export default VideoBackground;
