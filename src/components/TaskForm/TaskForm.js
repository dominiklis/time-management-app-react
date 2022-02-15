import React, { useEffect, useState } from "react";
import "./TaskForm.css";

import constants from "../../utils/constants";
import useIsInitialRender from "../../hooks/useIsInitialRender";

import Button from "../Button/Button";
import InputField from "../Inputs/InputField";
import LoadingButton from "../LoadingButton/LoadingButton";
import TextArea from "../Inputs/TextArea";
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
    endTime: "",
  });

  const [disableSubmitButton, setDisableSubmitButton] = useState(true);

  useEffect(() => {
    if (
      !input.taskName ||
      errors.taskName ||
      errors.endDate ||
      errors.endTime ||
      disabled
    ) {
      return setDisableSubmitButton(true);
    }

    setDisableSubmitButton(false);
  }, [
    disableSubmitButton,
    disabled,
    errors.endDate,
    errors.endTime,
    errors.taskName,
    input.taskName,
  ]);

  const setTimeError = (error, fieldName) => {
    setErrors((prev) => ({ ...prev, [fieldName]: error }));
  };

  const initialRender = useIsInitialRender();

  useEffect(() => {
    if (!initialRender) {
      if (!input.taskName || !input.taskName.trim()) {
        return setErrors((prev) => ({
          ...prev,
          taskName: constants.errors.name,
        }));
      }

      setErrors((prev) => ({ ...prev, taskName: "" }));
    }
  }, [input.taskName]);

  useEffect(() => {
    if (input.startDate === input.endDate && input.startTime > input.endTime) {
      return setErrors((prev) => ({
        ...prev,
        endTime: constants.errors.endTime,
      }));
    }

    setErrors((prev) => ({ ...prev, endTime: "" }));
  }, [input.endTime, input.endDate, input.startDate, input.startTime]);

  useEffect(() => {
    if (input.endDate && input.startDate > input.endDate) {
      return setErrors((prev) => ({
        ...prev,
        endDate: constants.errors.endTime,
      }));
    }

    setErrors((prev) => ({ ...prev, endDate: "" }));
  }, [input.startDate, input.endDate]);

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

            <div className="task-form__date-time-container">
              <InputField
                value={input.startDate}
                onChange={handleChange}
                label="start"
                id="startDate"
                type="date"
                name="startDate"
                fullwidth
                lightBorder
              />

              <InputField
                onChange={handleChange}
                value={input.startTime}
                id="startTime"
                type="time"
                name="startTime"
                setError={setTimeError}
                lightBorder
                fullwidth
              />
            </div>

            <div className="task-form__date-time-container">
              <InputField
                value={input.endDate}
                onChange={handleChange}
                label="end"
                id="endDate"
                type="date"
                name="endDate"
                fullwidth
                lightBorder
                disabled={!input.startDate || !input.startTime}
                min={input.startDate}
                error={errors.endDate}
              />

              <InputField
                onChange={handleChange}
                value={input.endTime}
                id="endTime"
                type="time"
                name="endTime"
                setError={setTimeError}
                lightBorder
                fullwidth
                disabled={!input.endDate || !input.startTime}
                error={errors.endTime}
              />
            </div>

            <Select
              value={input.priority}
              onChange={handleChange}
              name="priority"
              label="priority"
              values={[
                {
                  value: 0,
                  text: "normal",
                },
                {
                  value: 1,
                  text: "important",
                },
                {
                  value: 2,
                  text: "urgent",
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
              disabled={disableSubmitButton}
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
