import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

import { CgClose } from "react-icons/cg";

import IconButton from "../IconButton/IconButton";

const Modal = ({ children, modalOpen, handleClose, modalTitle }) => {
  if (modalOpen) {
    return ReactDOM.createPortal(
      <div className="modal">
        <div className="modal__background" onClick={handleClose}></div>
        <div className="modal__content">
          <IconButton
            onClick={handleClose}
            className="modal__close-button"
            size="large"
          >
            <CgClose />
          </IconButton>

          <h1 className="modal__header">{modalTitle}</h1>

          {children}
        </div>
      </div>,
      document.querySelector("#modal-root")
    );
  } else return null;
};

export default Modal;
