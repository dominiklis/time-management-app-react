import React from "react";
import "./IconButton.css";

import { IconContext } from "react-icons/lib";

const IconButton = ({ children, onClick, disabled, iconAdditionaClass }) => {
  return (
    <button className="icon-button" onClick={onClick} disabled={disabled}>
      <IconContext.Provider
        value={{
          className: `icon-button__icon${
            iconAdditionaClass ? ` ${iconAdditionaClass}` : ""
          }`,
        }}
      >
        {children}
      </IconContext.Provider>
    </button>
  );
};

export default IconButton;
