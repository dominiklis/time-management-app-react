import React, { useState } from "react";
import "./TaskCard.css";

import { updateTask } from "../../store/slices/tasksSlice";
import { useDispatch } from "react-redux";
import { FiSquare, FiCheckSquare, FiEdit2, FiCalendar } from "react-icons/fi";
import { IconContext } from "react-icons/lib";
import { formatDate, formatInterval, formatTime } from "../../utils/days";

import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

const TaskCard = ({
  onClick,
  setEditTask,
  taskId,
  authorId,
  authorName,
  authorEmail,
  taskName,
  taskDescription,
  taskCompleted,
  createdAt,
  completedAt,
  dateToComplete,
  startTime,
  endTime,
  accessedAt,
  canShare,
  canChangePermissions,
  canEdit,
  canDelete,
  overdue,
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
      })
    ).unwrap();
    setUpdating(false);
  };

  const handleEditButton = () => setEditTask(true);

  return (
    <div className="task-card">
      <div className="task-card__header">
        <button
          className="task-card__button"
          onClick={handleCompletedButton}
          disabled={!canEdit}
        >
          {updating ? (
            <LoadingIndicator size="small" />
          ) : taskCompleted ? (
            <IconContext.Provider
              value={{ className: "task-card__icon task-card__checked-icon" }}
            >
              <FiCheckSquare />
            </IconContext.Provider>
          ) : (
            <IconContext.Provider value={{ className: "task-card__icon" }}>
              <FiSquare />
            </IconContext.Provider>
          )}
        </button>
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
        <button
          className="task-card__button"
          disabled={!canEdit}
          onClick={handleEditButton}
        >
          <IconContext.Provider value={{ className: "task-card__icon" }}>
            <FiEdit2 />
          </IconContext.Provider>
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
