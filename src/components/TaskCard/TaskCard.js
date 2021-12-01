import React, { useState } from "react";
import "./TaskCard.css";

import { updateTask } from "../../store/slices/tasksSlice";
import { useDispatch } from "react-redux";
import { FiSquare, FiCheckSquare, FiEdit2, FiCalendar } from "react-icons/fi";
import { IconContext } from "react-icons/lib";
import { formatDate, formatInterval, formatTime } from "../../utils/days";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

const TaskCard = ({
  taskId,
  authorId,
  authorName,
  authorEmail,
  name,
  description,
  completed,
  createdAt,
  completedAt,
  dateToComplete,
  startTime,
  endTime,
  accessedAt,
  accessLevel,
  overdue,
}) => {
  const dispatch = useDispatch();

  const [updating, setUpdating] = useState(false);

  const handleCompletedButton = async () => {
    setUpdating(true);
    await dispatch(updateTask({ taskId, completed: !completed })).unwrap();
    setUpdating(false);
  };

  return (
    <div className="task-card">
      <div className="task-card__header">
        <button
          className="task-card__button"
          onClick={handleCompletedButton}
          disabled={!accessLevel.split(", ").includes("edit")}
        >
          {updating ? (
            <LoadingIndicator size="small" />
          ) : completed ? (
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
      <div className="task-card__content">
        <div className="task-card__name">{name}</div>
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
          disabled={!accessLevel.split(", ").includes("edit")}
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
