import React from "react";
import "./Checkbox.css";

const Checkbox = ({ label, checked, onChange, name, disabled }) => {
  return (
    <div className="checkbox">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        name={name}
        disabled={disabled}
      />
      <label
        className="checkbox__label"
        onClick={() => onChange({ target: { name } })}
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
