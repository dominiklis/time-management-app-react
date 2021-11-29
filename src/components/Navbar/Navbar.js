import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { IoMenu } from "react-icons/io5";

const Navbar = ({ toggleMenu, setShowModal }) => {
  const handleMenuClick = () => {
    toggleMenu();
  };

  const handleAddTaskButton = () => {
    setShowModal(true);
  };

  return (
    <nav className="navbar">
      <div className="navbar__home">
        <IconContext.Provider
          value={{
            className: "navbar__menu-icon",
          }}
        >
          <button className="navbar-button" onClick={handleMenuClick}>
            <IoMenu />
          </button>
        </IconContext.Provider>
        <Link to="/" className="navbar-button">
          home
        </Link>
      </div>

      <div>
        <button className="navbar-button" onClick={handleAddTaskButton}>
          add
        </button>
        <Link to="/" className="navbar-button">
          me
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
