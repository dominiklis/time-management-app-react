import React from "react";
import "./Inputs.css";

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
  disabled,
  min,
}) => {
  let errorsToShow = null;

  if (error) {
    if (Array.isArray(error)) {
      errorsToShow = error.map((err) => (
        <div key={err} className="input-field__error">
          {err}
        </div>
      ));
    } else {
      errorsToShow = <div className="input-field__error">{error}</div>;
    }
  }

  const getLabelStyle = () => {
    let cln = "input-field__label";

    if (disabled) cln += " input-field__label--disabled";

    return cln;
  };

  const getInputStyle = () => {
    let cln = "input-field__input";

    if (fullwidth) cln += " input-field__input--fullwidth";
    if (lightBorder) cln += " input-field__input--light-border";
    if (disabled) cln += " input-field__input--disabled";

    return cln;
  };

  return (
    <div className="input-field">
      {error && errorsToShow}
      <label htmlFor={id} className={getLabelStyle()}>
        {label}
        <input
          className={getInputStyle()}
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          min={min}
        />
      </label>
    </div>
  );
};

export default InputField;
