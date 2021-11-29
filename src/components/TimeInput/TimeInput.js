import React, { useState } from "react";
import "./TimeInput.css";
import "../InputField/InputField.css";

const timeError = "allowed format is HH:MM";

const TimeInput = ({
  onChange,
  label,
  id,
  name,
  fullwidth,
  setError,
  error,
}) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
    onChange(e);

    if (!e.target.value) return setError("", name);

    let [hours, minutes] = e.target.value.split(":");
    if (!hours || !minutes || hours.length !== 2 || minutes.length !== 2) {
      return setError(timeError, name);
    } else {
      hours = parseInt(hours);
      minutes = parseInt(minutes);

      if (
        isNaN(hours) ||
        hours < 0 ||
        hours > 24 ||
        isNaN(minutes) ||
        minutes < 0 ||
        minutes > 60
      )
        setError(timeError, name);
      else {
        setError("", name);
      }
    }
  };

  return (
    <div className="input-field">
      {value.length > 0 && error && (
        <div className="input-field__error">{error}</div>
      )}
      <label htmlFor={id} className="input-field__label">
        {label}
        <input
          className={`input-field__input${
            fullwidth ? " input-field__input--fullwidth" : ""
          }`}
          id={id}
          type="text"
          name={name}
          value={value}
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

export default TimeInput;
