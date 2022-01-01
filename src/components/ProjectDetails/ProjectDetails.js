import React from "react";
import "./ProjectDetails.css";

import { formatDate, formatTime } from "../../utils/days";
import { FiEdit2 } from "react-icons/fi";
import { CgTrashEmpty, CgMathPlus } from "react-icons/cg";

import ProjectTasks from "../ProjectTasks/ProjectTasks";
import Tabs from "../Tabs/Tabs";
import IconButton from "../IconButton/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { deleteProject } from "../../store/slices/projectsSlice";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import ProjectUsers from "../ProjectUsers/ProjectUsers";

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
  handleAddTaskToProject,
  authorId,
  users,
}) => {
  const dispatch = useDispatch();

  const {
    loadings: { deleteProject: deleteProjectLoading },
  } = useSelector((state) => state.projects);

  const getTabsContent = () => {
    const stepsTab = {
      label: "tasks",
      content: (
        <ProjectTasks
          projectId={projectId}
          authorId={authorId}
          users={users}
          canShare={canShare}
          canChangePermissions={canChangePermissions}
        />
      ),
    };

    const usersTab = {
      label: "users",
      content: (
        <ProjectUsers
          projectId={projectId}
          authorId={authorId}
          users={users}
          canShare={canShare}
          canChangePermissions={canChangePermissions}
        />
      ),
    };

    return [stepsTab, usersTab];
  };

  const handleDeleteButton = async () => {
    await dispatch(deleteProject(projectId)).unwrap();
  };

  const handleAddTaskButton = () => {
    handleAddTaskToProject(projectId);
  };

  return (
    <div className="project-details">
      {/* {projectId} */}
      <div className="project-details__top">
        <div className="project-details__created-info">
          created {`${formatDate(createdAt)} ${formatTime(createdAt)}`} by{" "}
          <span className="project-details__author-name">{authorName}</span>
        </div>
        <div className="project-details__actions">
          <IconButton
            onClick={handleAddTaskButton}
            disabled={!canEdit || deleteProjectLoading}
          >
            <CgMathPlus />
          </IconButton>
          <IconButton
            onClick={toggleEditProject}
            disabled={!canEdit || deleteProjectLoading}
          >
            <FiEdit2 />
          </IconButton>
          {deleteProjectLoading ? (
            <IconButton disabled={true}>
              <LoadingIndicator size="small" />
            </IconButton>
          ) : (
            <IconButton disabled={!canDelete} onClick={handleDeleteButton}>
              <CgTrashEmpty />
            </IconButton>
          )}
        </div>
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
