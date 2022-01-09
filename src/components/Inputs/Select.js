import React from "react";
import "./Inputs.css";

const Select = ({ value, values, onChange, name, label, id }) => {
  return (
    <div className="select">
      <label htmlFor={id} className="input-field__label">
        {label}
        <select
          value={value}
          className="select__select"
          name={name}
          onChange={onChange}
        >
          {values.map((value) => (
            <option
              key={value.value}
              value={value.value}
              selected={value.selected}
            >
              {value.text}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default Select;
