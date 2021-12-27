import React from "react";
import "./Button.css";

const Button = ({ children, type, disabled, onClick, color, className }) => {
  const getStyle = () => {
    let cln = "button";

    if (className) cln += ` ${className}`;

    if (color === "primary") cln += " button--primary";
    else if (color === "secondary") cln += " button--secondary";
    else if (color === "error") cln += " button--error";
    else if (color === "warning") cln += " button--warning";
    else if (color === "success") cln += " button--success";

    return cln;
  };

  return (
    <button
      className={getStyle()}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
