import React from "react";
import "./TaskDetails.css";

import { formatDate, formatTime } from "../../utils/days";

import TaskSteps from "../TaskSteps/TaskSteps";
import TaskUsers from "../TaskUsers/TaskUsers";

const TaskDetails = ({
  taskId,
  authorId,
  authorName,
  authorEmail,
  taskDescription,
  createdAt,
  completedAt,
  accessedAt,
  canShare,
  canChangePermissions,
  canEdit,
  canDelete,
  overdue,
  steps,
  users,
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

      <TaskSteps taskId={taskId} steps={steps} canEdit={canEdit} />
      <TaskUsers
        authorId={authorId}
        taskId={taskId}
        users={users}
        canShare={canShare}
        canChangePermissions={canChangePermissions}
      />
    </div>
  );
};

export default TaskDetails;
