import React from "react";
import "./LoadingIndicator.css";

const LoadingIndicator = ({ size, color }) => {
  let additionalStyles = "";
  if (size === "small") {
    additionalStyles += " loading-indicator--small";
  }

  return <div className={`loading-indicator${additionalStyles}`}></div>;
};

export default LoadingIndicator;
