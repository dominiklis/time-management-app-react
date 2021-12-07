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

  return (
    <div className="input-field">
      {error && errorsToShow}
      <label htmlFor={id} className="input-field__label">
        {label}
        <input
          className={`input-field__input${
            fullwidth ? " input-field__input--fullwidth" : ""
          }`}
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
