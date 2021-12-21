import React, { useState } from "react";
import "./TaskCard.css";

import { updateTask } from "../../store/slices/tasksSlice";
import { useDispatch } from "react-redux";
import { FiEdit2, FiCalendar } from "react-icons/fi";
import { formatDate, formatInterval, formatTime } from "../../utils/days";

import CheckButton from "../CheckButton/CheckButton";
import IconButton from "../IconButton/IconButton";

const TaskCard = ({
  onClick,
  setEditTask,
  taskId,
  taskName,
  taskDescription,
  taskCompleted,
  completedAt,
  dateToComplete,
  startTime,
  endTime,
  accessedAt,
  steps,
  canShare,
  canChangePermissions,
  canEdit,
  canDelete,
  taskActive,
  overdue,
  projectId,
  projectName,
}) => {
  const dispatch = useDispatch();

  const [updating, setUpdating] = useState(false);

  const handleCompletedButton = async () => {
    setUpdating(true);

    await dispatch(
      updateTask({
        taskId,
        taskName,
        taskDescription,
        taskCompleted: !taskCompleted,
        dateToComplete,
        startTime,
        endTime,
        projectId,
      })
    ).unwrap();

    setUpdating(false);
  };

  const handleEditButton = () => setEditTask(true);

  return (
    <div className={`task-card${taskActive ? " task-card--active" : ""}`}>
      <div className="task-card__header">
        <CheckButton
          loading={updating}
          onClick={handleCompletedButton}
          disabled={!canEdit}
          size="small"
          check={taskCompleted}
        />
      </div>
      <div
        className={`task-card__content${onClick ? " task-card--pointer" : ""}`}
        onClick={onClick}
      >
        <div className="task-card__name">{taskName}</div>

        {dateToComplete && (
          <div
            className={`task-card__date-section${
              overdue ? " task-card__date-section--overdue" : ""
            }`}
          >
            <FiCalendar />
            <div className="task-card__date">{formatDate(dateToComplete)}</div>
            {startTime &&
              (endTime ? (
                <div className="task-card__time">
                  {formatInterval(startTime, endTime)}
                </div>
              ) : (
                <div className="task-card__time">{formatTime(startTime)}</div>
              ))}
          </div>
        )}
      </div>
      <div className="task-card__actions">
        <IconButton disabled={!canEdit} onClick={handleEditButton}>
          <FiEdit2 />
        </IconButton>
      </div>
    </div>
  );
};

export default TaskCard;
