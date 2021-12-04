import React, { useEffect, useState } from "react";

import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import LoadingButton from "../LoadingButton/LoadingButton";
import TextArea from "../TextArea/TextArea";
import TimeInput from "../TimeInput/TimeInput";

const nameError = "name cannot be empty";

const TaskForm = ({ onSubmit, className, input, handleChange, loading }) => {
  const [errors, setErrors] = useState({
    taskName: "",
    startTime: "",
    endTime: "",
  });

  const setTimeError = (error, fieldName) => {
    setErrors((prev) => ({ ...prev, [fieldName]: error }));
  };

  useEffect(() => {
    if (!initialRender) {
      if (!input.taskName || !input.taskName.trim()) {
        setErrors((prev) => ({ ...prev, taskName: nameError }));
      } else {
        setErrors((prev) => ({ ...prev, taskName: "" }));
      }
    }
  }, [input.taskName]);

  const [initialRender, setInitialRender] = useState(true);
  useEffect(() => setInitialRender(false), []);

  return (
    <form onSubmit={onSubmit} className={className}>
      <InputField
        value={input.taskName}
        onChange={handleChange}
        label="name"
        id="taskName"
        type="text"
        name="taskName"
        error={errors.taskName}
        fullwidth
      />

      <TextArea
        value={input.taskDescription}
        onChange={handleChange}
        label="description"
        id="taskDescription"
        type="text"
        name="taskDescription"
        fullwidth
      />

      <InputField
        value={input.dateToComplete}
        onChange={handleChange}
        label="day"
        id="dateToComplete"
        type="date"
        name="dateToComplete"
        fullwidth
      />

      <TimeInput
        onChange={handleChange}
        value={input.startTime}
        label="start"
        id="startTime"
        type="number"
        name="startTime"
        setError={setTimeError}
        error={errors.startTime}
      />

      <TimeInput
        onChange={handleChange}
        value={input.endTime}
        label="end"
        id="endTime"
        type="number"
        name="endTime"
        setError={setTimeError}
        error={errors.endTime}
      />

      {loading ? (
        <LoadingButton />
      ) : (
        <Button
          type="submit"
          disabled={
            !input.taskName ||
            errors.taskName ||
            errors.startTime ||
            errors.endTime
          }
        >
          create
        </Button>
      )}
    </form>
  );
};

export default TaskForm;
