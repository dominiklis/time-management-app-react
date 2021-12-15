import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ hideMenu }) => {
  return (
    <div className={`sidebar${hideMenu ? " hidden" : ""}`}>
      <div className="sidebar__content">
        <Link className="sidebar__link" to="/">
          today
        </Link>
        <Link className="sidebar__link" to="/all">
          all tasks
        </Link>
        <Link className="sidebar__link" to="/projects">
          projects
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
