import React from "react";
import "./IconButton.css";

import { IconContext } from "react-icons/lib";

const IconButton = ({
  children,
  onClick,
  disabled,
  className,
  color,
  size,
}) => {
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
    <button className={getButtonStyle()} onClick={onClick} disabled={disabled}>
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
