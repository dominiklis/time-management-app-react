import React from "react";
import "./TaskCard.css";

import { FiSquare, FiCheckSquare, FiEdit2, FiCalendar } from "react-icons/fi";
import { IconContext } from "react-icons/lib";
import { formatDate, formatInterval, formatTime } from "../../utils/days";

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
  return (
    <div className="task-card">
      <IconContext.Provider value={{ className: "task-card__icons" }}>
        <div className="task-card__header">
          <button className="task-card__button">
            {completed ? <FiCheckSquare /> : <FiSquare />}
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
              <div className="task-card__date">
                {formatDate(dateToComplete)}
              </div>
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
          <button className="task-card__button">
            <FiEdit2 />
          </button>
        </div>
      </IconContext.Provider>
    </div>
  );
};

export default TaskCard;
