import React from "react";
import "./InputField.css";

const InputField = ({
  value,
  onChange,
  label,
  id,
  type,
  name,
  error,
  fullwidth,
  placeholder,
  lightBorder,
}) => {
  let errorsToShow = null;

  if (error) {
    if (Array.isArray(error)) {
      errorsToShow = error.map((err) => (
        <div ket={err} className="input-field__error">
          {err}
        </div>
      ));
    } else {
      errorsToShow = <div className="input-field__error">{error}</div>;
    }
  }

  const getInputStyle = () => {
    let className = "input-field__input";

    if (fullwidth) className += " input-field__input--fullwidth";
    if (lightBorder) className += " input-field__input--light-border";

    return className;
  };

  return (
    <div className="input-field">
      {error && errorsToShow}
      <label htmlFor={id} className="input-field__label">
        {label}
        <input
          className={getInputStyle()}
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </label>
    </div>
  );
};

export default InputField;
