import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { FiMenu } from "react-icons/fi";

const Navbar = ({ toggleMenu }) => {
  const handleMenuClick = () => {
    toggleMenu();
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
            <FiMenu />
          </button>
        </IconContext.Provider>
        <Link to="/" className="navbar-button">
          home
        </Link>
      </div>

      <div>
        <button className="navbar-button">add</button>
        <Link to="/" className="navbar-button">
          me
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
