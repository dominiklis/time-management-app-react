import React from "react";
import "./FloatingButton.css";

const FloatingButton = ({ onClick }) => {
  return (
    <button className="floating-button" onClick={onClick}>
      &#43;
    </button>
  );
};

export default FloatingButton;
