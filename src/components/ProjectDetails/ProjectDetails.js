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
  project,
  toggleEditProject,
  handleAddTaskToProject,
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
          projectId={project.projectId}
          authorId={project.authorId}
          users={project.users}
          canShare={project.canShare}
          canChangePermissions={project.canChangePermissions}
        />
      ),
    };

    const usersTab = {
      label: "users",
      content: (
        <ProjectUsers
          projectId={project.projectId}
          authorId={project.authorId}
          users={project.users}
          canShare={project.canShare}
          canChangePermissions={project.canChangePermissions}
        />
      ),
    };

    return [stepsTab, usersTab];
  };

  const handleDeleteButton = async () => {
    await dispatch(deleteProject(project.projectId)).unwrap();
  };

  const handleAddTaskButton = () => {
    handleAddTaskToProject(project.projectId);
  };

  return (
    <div className="project-details">
      <div className="project-details__top">
        <div className="project-details__actions">
          <IconButton
            onClick={handleAddTaskButton}
            disabled={!project.canEdit || deleteProjectLoading}
          >
            <CgMathPlus />
          </IconButton>
          <IconButton
            onClick={toggleEditProject}
            disabled={!project.canEdit || deleteProjectLoading}
          >
            <FiEdit2 />
          </IconButton>
          {deleteProjectLoading ? (
            <IconButton disabled={true}>
              <LoadingIndicator size="small" />
            </IconButton>
          ) : (
            <IconButton
              disabled={!project.canDelete}
              onClick={handleDeleteButton}
            >
              <CgTrashEmpty />
            </IconButton>
          )}
        </div>
        <div className="project-details__created-info">
          created{" "}
          {`${formatDate(project.createdAt)} ${formatTime(project.createdAt)}`}{" "}
          by{" "}
          <span className="project-details__author-name">
            {project.authorName}
          </span>
        </div>
      </div>

      {project.projectDescription && (
        <>
          <h3 className="project-details__header">description:</h3>
          <div className="project-details__description">
            {project.projectDescription}
          </div>
        </>
      )}

      <Tabs content={getTabsContent()} />
    </div>
  );
};

export default ProjectDetails;
