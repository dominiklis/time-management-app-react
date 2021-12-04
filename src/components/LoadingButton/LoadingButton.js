import React from "react";
import "./LoadingButton.css";

const LoadingButton = ({ color, className }) => {
  let colorStyle = "";

  if (color === "primary") colorStyle = " loading-button--primary";
  if (color === "secondary") colorStyle = " loading-button--secondary";
  if (color === "error") colorStyle = " loading-button--error";
  if (color === "warning") colorStyle = " loading-button--warning";
  if (color === "success") colorStyle = " loading-button--success";

  let additionalClass = "";
  if (className) additionalClass = " " + className;

  return (
    <div className={`loading-button${colorStyle}${additionalClass}`}>
      <div className="loading-button__indicator"></div>
    </div>
  );
};

export default LoadingButton;
