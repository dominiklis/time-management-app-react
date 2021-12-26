import React from "react";
import "./LoadingIndicator.css";

const LoadingIndicator = ({ size }) => {
  const getStyle = () => {
    let className = "loading-indicator";
    if (size === "small") className += " loading-indicator--small";

    return className;
  };

  return <div className={getStyle()}></div>;
};

export default LoadingIndicator;
