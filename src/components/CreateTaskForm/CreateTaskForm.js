import React, { useEffect, useState } from "react";
import "./CreateTaskForm.css";

import apiCalls from "../../utils/api";

import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import LoadingButton from "../LoadingButton/LoadingButton";
import TextArea from "../TextArea/TextArea";
import TimeInput from "../TimeInput/TimeInput";

const nameError = "name cannot be empty";

const CreateTaskForm = ({ afterSubmit }) => {
  const [initialRender, setInitialRender] = useState(true);

  const [waitingForResponse, setWaitingForResponse] = useState(false);

  const [input, setInput] = useState({
    name: "",
    description: "",
    dateToComplete: "",
    startTime: "",
    endTime: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    startTime: "",
    endTime: "",
  });

  const setTimeError = (error, fieldName) => {
    setErrors((prev) => ({ ...prev, [fieldName]: error }));
  };

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setWaitingForResponse(true);
    await apiCalls.tasks.create(
      input.name,
      input.description,
      input.dateToComplete,
      input.startTime,
      input.endTime
    );

    setWaitingForResponse(false);
    afterSubmit();
  };

  useEffect(() => {
    if (!initialRender) {
      if (!input.name || !input.name.trim()) {
        setErrors((prev) => ({ ...prev, name: nameError }));
      } else {
        setErrors((prev) => ({ ...prev, name: "" }));
      }
    }
  }, [input.name]);

  useEffect(() => setInitialRender(false), []);

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <InputField
        value={input.name}
        onChange={handleChange}
        label="name"
        id="name"
        type="text"
        name="name"
        error={errors.name}
        fullwidth
      />

      <TextArea
        value={input.description}
        onChange={handleChange}
        label="description"
        id="description"
        type="text"
        name="description"
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
        label="start"
        id="startTime"
        type="number"
        name="startTime"
        setError={setTimeError}
        error={errors.startTime}
      />

      <TimeInput
        onChange={handleChange}
        label="end"
        id="endTime"
        type="number"
        name="endTime"
        setError={setTimeError}
        error={errors.endTime}
      />

      {waitingForResponse ? (
        <LoadingButton />
      ) : (
        <Button
          type="submit"
          disabled={
            !input.name || errors.name || errors.startTime || errors.endTime
          }
        >
          create
        </Button>
      )}
    </form>
  );
};

export default CreateTaskForm;
