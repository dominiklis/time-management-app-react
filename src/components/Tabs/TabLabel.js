import React from "react";
import "./TabLabel.css";

const TabLabel = ({ label, onClick, active }) => {
  return (
    <div
      className={`tab-label${active ? " tab-label--active" : ""}`}
      onClick={onClick}
    >
      <h4>{label}</h4>
    </div>
  );
};

export default TabLabel;
