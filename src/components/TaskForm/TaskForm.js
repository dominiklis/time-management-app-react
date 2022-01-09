import React, { useEffect, useState } from "react";
import "./TaskForm.css";

import constants from "../../utils/constants";
import useIsInitialRender from "../../hooks/useIsInitialRender";

import Button from "../Button/Button";
import InputField from "../Inputs/InputField";
import LoadingButton from "../LoadingButton/LoadingButton";
import TextArea from "../Inputs/TextArea";
import TimeInput from "../Inputs/TimeInput";
import Select from "../Inputs/Select";

const TaskForm = ({
  title,
  onSubmit,
  className,
  contentClassName,
  input,
  handleChange,
  loading,
  disabled,
  submitButtonText = "submit",
  onlyTaskName,
  centerButton,
  priority = 0,
}) => {
  const [errors, setErrors] = useState({
    taskName: "",
    startTime: "",
    endTime: "",
  });

  const setTimeError = (error, fieldName) => {
    setErrors((prev) => ({ ...prev, [fieldName]: error }));
  };

  const initialRender = useIsInitialRender();

  useEffect(() => {
    if (!initialRender) {
      if (!input.taskName || !input.taskName.trim()) {
        setErrors((prev) => ({ ...prev, taskName: constants.nameError }));
      } else {
        setErrors((prev) => ({ ...prev, taskName: "" }));
      }
    }
  }, [input.taskName]);

  const getButtonsStyle = () => {
    let cln = "task-form__button";

    if (centerButton) cln += " task-form__button--center";

    return cln;
  };

  return (
    <form onSubmit={onSubmit} className={className}>
      {title && <h4>{title}</h4>}
      <div className={contentClassName}>
        <InputField
          value={input.taskName}
          onChange={handleChange}
          label="name"
          id="taskName"
          type="text"
          name="taskName"
          error={errors.taskName}
          fullwidth
          lightBorder
        />

        {!onlyTaskName && (
          <>
            <TextArea
              value={input.taskDescription}
              onChange={handleChange}
              label="description"
              id="taskDescription"
              type="text"
              name="taskDescription"
              fullwidth
              lightBorder
            />

            <InputField
              value={input.dateToComplete}
              onChange={handleChange}
              label="day"
              id="dateToComplete"
              type="date"
              name="dateToComplete"
              fullwidth
              lightBorder
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
              lightBorder
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
              lightBorder
            />

            <Select
              value={input.priority}
              onChange={handleChange}
              name="priority"
              label="priority"
              values={[
                {
                  value: 0,
                  text: "normal",
                  selected: priority === 0,
                },
                {
                  value: 1,
                  text: "important",
                  selected: priority === 1,
                },
                {
                  value: 2,
                  text: "urgent",
                  selected: priority === 2,
                },
              ]}
            />
          </>
        )}

        <div className={getButtonsStyle()}>
          {loading ? (
            <LoadingButton color="primary" />
          ) : (
            <Button
              type="submit"
              disabled={
                !input.taskName ||
                errors.taskName ||
                errors.startTime ||
                errors.endTime ||
                disabled
              }
              color="primary"
            >
              {submitButtonText}
            </Button>
          )}
        </div>
      </div>
    </form>
  );
};

export default TaskForm;
