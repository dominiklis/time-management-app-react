import React from "react";
import "./TaskDetails.css";

import { useSelector } from "react-redux";
import { formatDate, formatTime } from "../../utils/days";

import TaskSteps from "../TaskSteps/TaskSteps";
import TaskUsers from "../TaskUsers/TaskUsers";
import Tabs from "../Tabs/Tabs";
import AppLink from "../Link/AppLink";

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
  projectId,
  projectName,
}) => {
  const { user } = useSelector((state) => state.users);

  return (
    <div className="task-details">
      {projectId && projectName && (
        <div className="task-details__assignemnts">
          task assigned to project:{" "}
          <AppLink to={`/projects/${projectId}`}>{projectName}</AppLink>
        </div>
      )}

      <div className="task-details__created-info">
        created {`${formatDate(createdAt)} ${formatTime(createdAt)}`}
        {user.id !== authorId && (
          <>
            {" "}
            by <span className="task-details__author-name">{authorName}</span>
          </>
        )}
      </div>

      {taskDescription && (
        <>
          <h3 className="task-details__header">description:</h3>
          <div className="task-details__description">{taskDescription}</div>
        </>
      )}

      <Tabs
        content={[
          {
            label: "steps",
            content: (
              <TaskSteps taskId={taskId} steps={steps} canEdit={canEdit} />
            ),
          },
          {
            label: "share",
            content: (
              <TaskUsers
                authorId={authorId}
                taskId={taskId}
                users={users}
                canShare={canShare}
                canChangePermissions={canChangePermissions}
                loggedUserId={user.id}
              />
            ),
          },
        ]}
      />
    </div>
  );
};

export default TaskDetails;
