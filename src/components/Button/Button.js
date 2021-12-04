import React from "react";
import "./Button.css";

const Button = ({ children, type, disabled, onClick, color }) => {
  let colorStyle = "";

  if (color === "primary") colorStyle = " button--primary";
  if (color === "secondary") colorStyle = " button--secondary";
  if (color === "error") colorStyle = " button--error";
  if (color === "warning") colorStyle = " button--warning";
  if (color === "success") colorStyle = " button--success";

  return (
    <button
      className={`button${colorStyle}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
