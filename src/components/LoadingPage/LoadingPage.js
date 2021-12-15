import React from "react";
import "./LoadingPage.css";

import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

const LoadingPage = ({ darkBackground, fullScreen }) => {
  const getStyle = () => {
    let className = "loading-page";
    if (darkBackground) {
      className += " loading-page--dark-background";
    }

    if (fullScreen) {
      className += " loading-page--full-screen";
    }

    return className;
  };

  return (
    <div className={getStyle()}>
      <LoadingIndicator lightCircle={darkBackground} />
    </div>
  );
};

export default LoadingPage;
