import React, { useState } from "react";
import "./CreateTaskForm.css";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../../store/slices/tasksSlice";
import TaskForm from "../TaskForm/TaskForm";

const CreateTaskForm = ({
  afterSubmit,
  border,
  onlyTaskName,
  title,
  projectId,
}) => {
  const dispatch = useDispatch();

  const {
    loadings: {
      tasks: { createTask: createTaskLoading },
    },
  } = useSelector((state) => state.tasks);

  const [input, setInput] = useState({
    taskName: "",
    taskDescription: "",
    dateToComplete: "",
    startTime: "",
    endTime: "",
  });

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(
      createTask({
        ...input,
        taskCompleted: false,
        projectId: projectId || null,
      })
    ).unwrap();
    afterSubmit?.();
    setInput({
      taskName: "",
      taskDescription: "",
      dateToComplete: "",
      startTime: "",
      endTime: "",
    });
  };

  const getStyle = () => {
    let cln = "create-task-form";

    if (border) cln += " create-task-form--bordered";
    if (onlyTaskName) cln += " create-task-form--single-field";

    return cln;
  };

  const getContentStyle = () => {
    let cln = "create-task-form__content";

    return cln;
  };

  return (
    <TaskForm
      title={title}
      onSubmit={handleSubmit}
      className={getStyle()}
      contentClassName={getContentStyle()}
      input={input}
      handleChange={handleChange}
      loading={createTaskLoading}
      submitButtonText="create"
      onlyTaskName={onlyTaskName}
    />
  );
};

export default CreateTaskForm;
