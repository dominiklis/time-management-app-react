import React from "react";
import "./NavigationButton.css";

const NavigationButton = ({ children, onClick }) => {
  return (
    <button className="navigation-button" onClick={onClick}>
      {children}
    </button>
  );
};

export default NavigationButton;
