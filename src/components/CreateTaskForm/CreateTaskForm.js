import React, { useEffect, useState } from "react";
import "./CreateTaskForm.css";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../../store/slices/tasksSlice";
import TaskForm from "../TaskForm/TaskForm";

const CreateTaskForm = ({ afterSubmit }) => {
  const dispatch = useDispatch();

  const {
    loadings: { createTask: createTaskLoading },
    errors: { createTask: createTaskError },
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

    await dispatch(createTask(input)).unwrap();
    afterSubmit();
  };

  return (
    <TaskForm
      onSubmit={handleSubmit}
      className="create-task-form"
      input={input}
      handleChange={handleChange}
      loading={createTaskLoading}
    />
  );
};

export default CreateTaskForm;
