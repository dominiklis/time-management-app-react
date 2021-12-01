import React from "react";
import "./Sidebar.css";

const Sidebar = ({ hideMenu }) => {
  return (
    <div className={`sidebar${hideMenu ? " hidden" : ""}`}>
      <div className="sidebar__content">
        <div>today</div>
        <div>all tasks</div>
        <div>projects</div>
      </div>
    </div>
  );
};

export default Sidebar;
