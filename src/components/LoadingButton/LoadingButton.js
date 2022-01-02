import React from "react";
import "./LoadingButton.css";

const LoadingButton = ({ color, className }) => {
  const getStyle = () => {
    let cln = "loading-button";

    if (color === "primary") cln += " loading-button--primary";
    else if (color === "secondary") cln += " loading-button--secondary";
    else if (color === "error") cln += " loading-button--error";
    else if (color === "warning") cln += " loading-button--warning";
    else if (color === "success") cln += " loading-button--success";

    if (className) cln += ` ${className}`;

    return cln;
  };

  return (
    <div className={getStyle()}>
      <div className="loading-button__indicator"></div>
    </div>
  );
};

export default LoadingButton;
