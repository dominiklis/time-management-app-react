import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

import { IconContext } from "react-icons";
import { IoClose } from "react-icons/io5";

const Modal = ({ children, modalOpen, handleClose, modalTitle }) => {
  if (modalOpen) {
    return ReactDOM.createPortal(
      <div className="modal">
        <div className="modal__background" onClick={handleClose}></div>
        <div className="modal__content">
          <IconContext.Provider
            value={{
              className: "modal__close-icon",
            }}
          >
            <button onClick={handleClose} className="modal__close-button">
              <IoClose />
            </button>
          </IconContext.Provider>

          <h1 className="modal__header">{modalTitle}</h1>

          {children}
        </div>
      </div>,
      document.querySelector("#modal-root")
    );
  } else return null;
};

export default Modal;
