import React, { useState } from "react";
import "./EditTask.css";

import { useDispatch, useSelector } from "react-redux";
import { deleteTask, updateTask } from "../../store/slices/tasksSlice";
import { formatDate, formatTime } from "../../utils/days";

import Button from "../Button/Button";
import TaskForm from "../TaskForm/TaskForm";
import LoadingButton from "../LoadingButton/LoadingButton";

const EditTask = ({
  taskId,
  setEditTask,
  taskName,
  taskDescription,
  dateToComplete,
  startTime,
  endTime,
  afterSubmit,
  taskCompleted,
}) => {
  const dispatch = useDispatch();

  const {
    loadings: { updateTask: editTaskLoading, deleteTask: deleteTaskLoading },
    errors: { updateTask: editTaskError, deleteTask: deleteTaskError },
  } = useSelector((state) => state.tasks);

  const [input, setInput] = useState({
    taskName: taskName,
    taskDescription: taskDescription,
    dateToComplete: dateToComplete ? formatDate(dateToComplete, true) : null,
    startTime: startTime ? formatTime(startTime) : null,
    endTime: endTime ? formatTime(endTime) : null,
  });

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(updateTask({ taskId, ...input, taskCompleted })).unwrap();
    setEditTask(false);
  };

  const handleCloseButton = () => setEditTask(false);

  const handleDeleteButton = async () => {
    await dispatch(deleteTask(taskId)).unwrap();
    setEditTask(false);
  };

  return (
    <div className="edit-task">
      <div className="edit-task__header">
        <h3 className="edit-task__header-text">Edit task</h3>
        {deleteTaskLoading ? (
          <LoadingButton
            color="secondary"
            className="edit-task__delete-button"
          />
        ) : (
          <Button
            color="secondary"
            onClick={handleDeleteButton}
            disabled={editTaskLoading}
            className="edit-task__delete-button"
          >
            delete
          </Button>
        )}
        <Button
          className="edit-task__cancel-button"
          onClick={handleCloseButton}
        >
          cancel
        </Button>
      </div>
      <TaskForm
        onSubmit={handleSubmit}
        input={input}
        handleChange={handleChange}
        loading={editTaskLoading}
        disabled={deleteTaskLoading}
        submitButtonText="update"
      />
    </div>
  );
};

export default EditTask;
