import React from "react";
import "./TabLabel.css";

const TabLabel = ({ label, onClick, active, singleTab }) => {
  const getStyle = () => {
    let cln = "tab-label";

    if (active) {
      cln += " tab-label--active";
    }

    if (singleTab) {
      cln += " tab-label--single";
    }

    return cln;
  };

  return (
    <div className={getStyle()} onClick={onClick}>
      <h4>{label}</h4>
    </div>
  );
};

export default TabLabel;
