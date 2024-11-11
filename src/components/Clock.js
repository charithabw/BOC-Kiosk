// Clock.js

import React, { useState, useEffect } from "react";

function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const timerId = setInterval(() => {
      const now = new Date();
      const currentTime = `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")} | ${now.getFullYear()}-${now.toLocaleString("default", { month: "long" })}-${now.getDate()}`;
      setTime(currentTime);
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return <div className="time">{time}</div>;
}

export default Clock;
