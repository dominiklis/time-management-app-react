import React, { useState } from "react";
import "./EditTask.css";

import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../../store/slices/tasksSlice";
import { CgClose } from "react-icons/cg";

import IconButton from "../IconButton/IconButton";
import TaskForm from "../TaskForm/TaskForm";

const EditTask = ({
  taskId,
  taskName,
  taskDescription,
  startDate,
  endDate,
  startTime,
  endTime,
  taskCompleted,
  projectId,
  atTheEndOfEdition,
  priority,
}) => {
  const dispatch = useDispatch();

  const {
    loadings: {
      tasks: { updateTask: editTaskLoading },
    },
  } = useSelector((state) => state.tasks);

  const [input, setInput] = useState({
    taskName: taskName,
    taskDescription: taskDescription,
    startDate: startDate ?? "",
    endDate: endDate ?? "",
    startTime: startTime ?? "",
    endTime: endTime ?? "",
    priority: priority ?? 0,
  });

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(
      updateTask({ taskId, ...input, taskCompleted, projectId })
    ).unwrap();

    atTheEndOfEdition();
  };

  const handleCloseButton = () => atTheEndOfEdition();

  return (
    <div className="edit-task">
      <div className="edit-task__header">
        <h3 className="edit-task__header-text">Edit task</h3>
        <IconButton
          className="edit-task__cancel-button"
          onClick={handleCloseButton}
        >
          <CgClose />
        </IconButton>
      </div>
      <TaskForm
        onSubmit={handleSubmit}
        input={input}
        handleChange={handleChange}
        loading={editTaskLoading}
        submitButtonText="update"
        centerButton
      />
    </div>
  );
};

export default EditTask;
