import React from "react";
import "./IconButton.css";

import { IconContext } from "react-icons/lib";

const IconButton = ({ children, onClick, disabled, className, color }) => {
  const getIconStyle = () => {
    let className = "icon-button__icon";

    if (color) className += ` icon-button__icon--${color}`;

    return className;
  };

  return (
    <button
      className={`icon-button ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <IconContext.Provider
        value={{
          className: getIconStyle(),
        }}
      >
        {children}
      </IconContext.Provider>
    </button>
  );
};

export default IconButton;
