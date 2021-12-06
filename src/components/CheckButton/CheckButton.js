import React from "react";
import "./CheckButton.css";

import { FiSquare, FiCheckSquare } from "react-icons/fi";

import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import IconButton from "../IconButton/IconButton";

const CheckButton = ({ loading, onClick, disabled, size, check }) => {
  return (
    <>
      {loading ? (
        <IconButton disabled={true}>
          <LoadingIndicator size={size} />
        </IconButton>
      ) : check ? (
        <IconButton
          disabled={disabled}
          onClick={onClick}
          iconAdditionaClass="check-button__checked-icon"
        >
          <FiCheckSquare />
        </IconButton>
      ) : (
        <IconButton disabled={disabled} onClick={onClick}>
          <FiSquare />
        </IconButton>
      )}
    </>
  );
};

export default CheckButton;
