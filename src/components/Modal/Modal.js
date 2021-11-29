import React from "react";
import "./Modal.css";

import { IconContext } from "react-icons";
import { IoClose } from "react-icons/io5";
import CreateTaskForm from "../CreateTaskForm/CreateTaskForm";

const Modal = ({ setShowModal }) => {
  const handleClose = () => setShowModal(false);

  return (
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

        <h1 className="modal__header">Create Task</h1>
        <CreateTaskForm afterSubmit={handleClose} />
      </div>
    </div>
  );
};

export default Modal;
