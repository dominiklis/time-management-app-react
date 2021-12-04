import React from "react";
import "./Button.css";

const Button = ({ children, type, disabled, onClick }) => {
  return (
    <button
      className="button"
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
