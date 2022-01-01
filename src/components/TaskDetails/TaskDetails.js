import React, { useState } from "react";
import "./TaskDetails.css";

import { useDispatch, useSelector } from "react-redux";
import { formatDate, formatTime } from "../../utils/days";
import { CgAssign, CgClose } from "react-icons/cg";
import { getProjectsThatUserCanEdit } from "../../utils/filterProjects";

import TaskSteps from "../TaskSteps/TaskSteps";
import TaskUsers from "../TaskUsers/TaskUsers";
import Tabs from "../Tabs/Tabs";
import AppLink from "../Link/AppLink";
import IconButton from "../IconButton/IconButton";
import Modal from "../Modal/Modal";
import ProjectCard from "../ProjectCard/ProjectCard";
import LoadingPage from "../LoadingPage/LoadingPage";
import { updateTask } from "../../store/slices/tasksSlice";

const TaskDetails = ({
  taskId,
  authorId,
  authorName,
  authorEmail,
  taskName,
  taskCompleted,
  dateToComplete,
  startTime,
  endTime,
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
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.users);
  const { projects } = useSelector((state) => state.projects);
  const {
    loadings: {
      tasks: { updateTask: editTaskLoading },
    },
  } = useSelector((state) => state.tasks);

  const getTabsContent = () => {
    const stepsTab = {
      label: "steps",
      content: <TaskSteps taskId={taskId} steps={steps} canEdit={canEdit} />,
    };

    const usersTab = {
      label: "share",
      content: (
        <TaskUsers
          authorId={authorId}
          taskId={taskId}
          users={users}
          canShare={canShare}
          canChangePermissions={canChangePermissions}
        />
      ),
    };

    if (!steps && !canEdit) return [usersTab];

    return [stepsTab, usersTab];
  };

  const [modalState, setModalState] = useState({
    task: null,
    showModal: false,
  });

  const handleOpenModal = (taskId) =>
    setModalState({ taskId, showModal: true });

  const handleCloseModal = () =>
    setModalState({ taskId: null, showModal: false });

  const handleProjectCardClick = async (projectId) => {
    await dispatch(
      updateTask({
        taskId,
        taskName,
        taskDescription,
        taskCompleted,
        dateToComplete,
        startTime,
        endTime,
        projectId: projectId,
      })
    );
  };

  return (
    <div className="task-details">
      {modalState.showModal && (
        <Modal
          modalOpen={modalState.showModal}
          handleClose={handleCloseModal}
          modalTitle="assign to project"
        >
          {editTaskLoading && <LoadingPage />}

          <ul>
            <li
              className="task-details__project-list-item task-details__project-list-item--align-vertically"
              onClick={() => handleProjectCardClick(null)}
            >
              <CgClose />
              <span>none</span>
            </li>
            {getProjectsThatUserCanEdit(projects).map((project) => (
              <li
                onClick={() => handleProjectCardClick(project.projectId)}
                key={project.projectId}
                className={`task-details__project-list-item${
                  project.projectId === projectId
                    ? " task-details__project-list-item--selected"
                    : ""
                }`}
              >
                <ProjectCard {...project} />
              </li>
            ))}
          </ul>
        </Modal>
      )}
      <div className="task-details__assignemnts">
        {projectId ? (
          <>
            task assigned to project:{" "}
            <AppLink to={`/projects/${projectId}`}>{projectName}</AppLink>
          </>
        ) : (
          <>
            assign this task to project
            <AppLink to={`/projects/${projectId}`}>{projectName}</AppLink>
          </>
        )}
        <IconButton
          color="secondary"
          onClick={handleOpenModal}
          disabled={!canEdit || user.id !== authorId}
        >
          <CgAssign />
        </IconButton>
      </div>

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

      <Tabs content={getTabsContent()} />
    </div>
  );
};

export default TaskDetails;
