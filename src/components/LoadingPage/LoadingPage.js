import React from "react";
import "./LoadingPage.css";

import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

const LoadingPage = ({ fixed }) => {
  const getStyle = () => {
    let className = "loading-page";

    if (fixed) className += " loading-page--fixed";

    return className;
  };

  return (
    <div className={getStyle()}>
      <LoadingIndicator />
    </div>
  );
};

export default LoadingPage;
