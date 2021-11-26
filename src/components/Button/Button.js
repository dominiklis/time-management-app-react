import React from "react";
import "./Button.css";

const Button = ({ children, type, disabled }) => {
  return (
    <button className="button" type={type} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
