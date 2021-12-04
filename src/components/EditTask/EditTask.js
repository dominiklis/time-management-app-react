import React, { useState } from "react";
import "./EditTask.css";
import Button from "../Button/Button";
import TaskForm from "../TaskForm/TaskForm";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../../store/slices/tasksSlice";
import { formatDate, formatTime } from "../../utils/days";

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
    loadings: { updateTask: editTaskLoading },
    errors: { updateTask: editTaskError },
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
    afterSubmit?.();
  };

  const handleCloseButton = () => setEditTask(false);

  return (
    <div>
      <div className="edit-task__header">
        <h3 className="edit-task__header-text">Edit task</h3>
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
      />
    </div>
  );
};

export default EditTask;
