import React from "react";
import "./LoadingPage.css";

import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

const LoadingPage = () => {
  return (
    <div className="loading-page">
      <LoadingIndicator />
    </div>
  );
};

export default LoadingPage;
