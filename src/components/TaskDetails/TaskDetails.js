import React from "react";
import { formatDate, formatTime } from "../../utils/days";
import "./TaskDetails.css";

const TaskDetails = ({
  taskId,
  authorId,
  authorName,
  authorEmail,
  // taskName,
  taskDescription,
  // taskCompleted,
  createdAt,
  completedAt,
  // dateToComplete,
  // startTime,
  // endTime,
  accessedAt,
  canShare,
  canChangePermissions,
  canEdit,
  canDelete,
  overdue,
}) => {
  return (
    <div className="task-details">
      <div className="task-details__assignemnts">[project name]</div>

      <div className="task-details__created-info">
        created {`${formatDate(createdAt)} ${formatTime(createdAt)}`} by{" "}
        <span className="task-details__author-name">{authorName}</span>
      </div>

      {taskDescription && (
        <>
          <h3 className="task-details__header">description:</h3>
          <div className="task-details__description">{taskDescription}</div>
        </>
      )}
    </div>
  );
};

export default TaskDetails;
