import React, { useState } from "react";
import "../Inputs/Inputs.css";

const timeError = "allowed format is HH:MM";

const TimeInput = ({
  value: valueToEdit,
  onChange,
  label,
  id,
  name,
  fullwidth,
  setError,
  error,
  lightBorder,
}) => {
  const [value, setValue] = useState(valueToEdit ? valueToEdit : "");

  const handleChange = (e) => {
    setValue(e.target.value);
    onChange(e);

    if (!e.target.value) return setError("", name);

    let [hours, minutes] = e.target.value.split(":");
    if (!hours || !minutes || hours.length !== 2 || minutes.length !== 2) {
      return setError(timeError, name);
    } else if (isNaN(parseInt(hours[1])) || isNaN(parseInt(minutes[1]))) {
      return setError(timeError, name);
    } else {
      const hoursParsed = parseInt(hours);
      const minutesParsed = parseInt(minutes);

      if (
        isNaN(hoursParsed) ||
        hoursParsed < 0 ||
        hoursParsed > 24 ||
        isNaN(minutesParsed) ||
        minutesParsed < 0 ||
        minutesParsed >= 60
      )
        setError(timeError, name);
      else {
        setError("", name);
      }
    }
  };

  const getInputStyle = () => {
    let className = "input-field__input";

    if (fullwidth) className += " input-field__input--fullwidth";
    if (lightBorder) className += " input-field__input--light-border";

    return className;
  };

  return (
    <div className="input-field">
      {value.length > 0 && error && (
        <div className="input-field__error">{error}</div>
      )}
      <label htmlFor={id} className="input-field__label">
        {label}
        <input
          className={getInputStyle()}
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
