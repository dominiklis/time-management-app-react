import React from "react";
import "./LoadingIndicator.css";

const LoadingIndicator = ({ size, lightCircle }) => {
  const getStyle = () => {
    let className = "loading-indicator";
    if (size === "small") className += " loading-indicator--small";
    if (lightCircle) className += " loading-indicator--light-circle";

    return className;
  };

  return <div className={getStyle()}></div>;
};

export default LoadingIndicator;
