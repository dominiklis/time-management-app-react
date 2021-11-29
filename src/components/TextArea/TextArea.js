import React from "react";
import "../InputField/InputField.css";

const TextArea = ({
  value,
  onChange,
  label,
  id,
  type,
  name,
  error,
  fullwidth,
  rows = 4,
}) => {
  return (
    <div className="input-field">
      {error && <div className="input-field__error">{error}</div>}
      <label htmlFor={id} className="input-field__label">
        {label}
        <textarea
          className={`input-field__textarea${
            fullwidth ? " input-field__textarea--fullwidth" : ""
          }`}
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
        />
      </label>
    </div>
  );
};

export default TextArea;
