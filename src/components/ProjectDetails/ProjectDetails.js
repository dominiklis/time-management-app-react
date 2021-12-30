import React from "react";
import "./ProjectDetails.css";

import { formatDate, formatTime } from "../../utils/days";
import { FiEdit2 } from "react-icons/fi";

import ProjectTasks from "../ProjectTasks/ProjectTasks";
import Tabs from "../Tabs/Tabs";
import IconButton from "../IconButton/IconButton";

const ProjectDetails = ({
  toggleEditProject,
  projectId,
  authorName,
  createdAt,
  projectDescription,
  canChangePermissions,
  canDelete,
  canEdit,
  canShare,
}) => {
  const getTabsContent = () => {
    const stepsTab = {
      label: "tasks",
      content: <ProjectTasks projectId={projectId} />,
    };

    const usersTab = {
      label: "users",
      content: <div>proejct users</div>,
    };

    return [stepsTab, usersTab];
  };

  return (
    <div className="project-details">
      {/* {projectId} */}
      <div className="project-details__top">
        <div className="project-details__created-info">
          created {`${formatDate(createdAt)} ${formatTime(createdAt)}`} by{" "}
          <span className="project-details__author-name">{authorName}</span>
        </div>
        <IconButton disabled={!canEdit} onClick={toggleEditProject}>
          <FiEdit2 />
        </IconButton>
      </div>

      {projectDescription && (
        <>
          <h3 className="project-details__header">description:</h3>
          <div className="project-details__description">
            {projectDescription}
          </div>
        </>
      )}

      <Tabs content={getTabsContent()} />
    </div>
  );
};

export default ProjectDetails;
