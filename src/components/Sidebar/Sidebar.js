import React, { useState } from "react";
import "./Sidebar.css";

const Sidebar = ({ hideMenu }) => {
  return (
    <div className={`sidebar${hideMenu ? " hidden" : ""}`}>
      <div>today</div>
      <div>all tasks</div>
      <div>projects</div>
    </div>
  );
};

export default Sidebar;
