import React from "react";
import "./Checkbox.css";

const Checkbox = ({ label, checked, onChange, name }) => {
  return (
    <div className="checkbox">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        name={name}
      />
      <label className="checkbox__label">{label}</label>
    </div>
  );
};

export default Checkbox;
