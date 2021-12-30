import React, { useState } from "react";
import "./TaskCard.css";

import { updateTask } from "../../store/slices/tasksSlice";
import { useDispatch } from "react-redux";
import { FiEdit2, FiCalendar } from "react-icons/fi";
import { formatDate, formatInterval, formatTime } from "../../utils/days";

import CheckButton from "../CheckButton/CheckButton";
import IconButton from "../IconButton/IconButton";

const TaskCard = ({
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
  projectId,
  projectName,
  onClick,
  toggleEditTask,
  background,
  border,
  verticalMargin,
  defaultCursor,
  noEditButton,
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

  const getStyles = () => {
    let cln = "task-card";

    if (background) cln += " task-card--background";
    if (border) cln += " task-card--border";
    if (verticalMargin) cln += " task-card--vertical-margin";

    return cln;
  };

  const getContentStyles = () => {
    let cln = "task-card__content";

    if (defaultCursor) cln += " task-card__content--default-cursor";

    return cln;
  };

  const handleClick = () => onClick(taskId);

  return (
    <div className={getStyles()}>
      <div className="task-card__header">
        <CheckButton
          loading={updating}
          onClick={handleCompletedButton}
          disabled={!canEdit}
          size="small"
          check={taskCompleted}
        />
      </div>
      <div className={getContentStyles()} onClick={handleClick}>
        <div className="task-card__name">{taskName}</div>

        {dateToComplete && (
          <div className="task-card__date-section">
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
      {!noEditButton && (
        <div className="task-card__actions">
          <IconButton disabled={!canEdit} onClick={toggleEditTask}>
            <FiEdit2 />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
