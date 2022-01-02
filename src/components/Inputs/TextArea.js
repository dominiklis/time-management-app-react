import React from "react";
import "./Inputs.css";

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
  lightBorder,
}) => {
  const getTextAreaStyle = () => {
    let className = "input-field__textarea";

    if (fullwidth) className += " input-field__textarea--fullwidth";
    if (lightBorder) className += " input-field__textarea--light-border";

    return className;
  };

  return (
    <div className="input-field">
      {error && <div className="input-field__error">{error}</div>}
      <label htmlFor={id} className="input-field__label">
        {label}
        <textarea
          className={getTextAreaStyle()}
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
