import React from "react";
import "./IconButton.css";

import { IconContext } from "react-icons/lib";

const IconButton = ({ className, children, color, size, ...props }) => {
  const getIconStyle = () => {
    let cln = "icon-button__icon";

    if (color) cln += ` icon-button__icon--${color}`;
    if (size === "large") cln += " icon-button__icon--large";

    return cln;
  };

  const getButtonStyle = () => {
    let cln = "icon-button";

    if (className) cln += ` ${className}`;

    return cln;
  };

  return (
    <button className={getButtonStyle()} {...props}>
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
