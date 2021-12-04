import React from "react";
import "./Button.css";

const Button = ({ children, type, disabled, onClick, color, className }) => {
  let colorStyle = "";

  if (color === "primary") colorStyle = " button--primary";
  if (color === "secondary") colorStyle = " button--secondary";
  if (color === "error") colorStyle = " button--error";
  if (color === "warning") colorStyle = " button--warning";
  if (color === "success") colorStyle = " button--success";

  let additionalClass = "";
  if (className) additionalClass = " " + className;

  return (
    <button
      className={`button${colorStyle}${additionalClass}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
