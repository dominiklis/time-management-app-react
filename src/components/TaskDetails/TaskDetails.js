import React, { useState } from "react";
import "./TaskDetails.css";

import { useDispatch, useSelector } from "react-redux";
import { formatDate, formatTime } from "../../utils/days";
import { CgPen, CgAssign, CgClose, CgTrashEmpty } from "react-icons/cg";
import { getProjectsThatUserCanEdit } from "../../utils/filterProjects";
import { deleteTask } from "../../store/slices/tasksSlice";
import { updateTask } from "../../store/slices/tasksSlice";

import TaskSteps from "../TaskSteps/TaskSteps";
import TaskUsers from "../TaskUsers/TaskUsers";
import Tabs from "../Tabs/Tabs";
import AppLink from "../Link/AppLink";
import IconButton from "../IconButton/IconButton";
import Modal from "../Modal/Modal";
import ProjectCard from "../ProjectCard/ProjectCard";
import LoadingPage from "../LoadingPage/LoadingPage";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

const TaskDetails = ({ task, handleEditButton }) => {
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
      content: (
        <TaskSteps
          taskId={task.taskId}
          steps={task.steps}
          canEdit={task.canEdit}
        />
      ),
    };

    const usersTab = {
      label: "share",
      content: (
        <TaskUsers
          authorId={task.authorId}
          taskId={task.taskId}
          users={task.users}
          canShare={task.canShare}
          canChangePermissions={task.canChangePermissions}
        />
      ),
    };

    if (!task.steps && !task.canEdit) return [usersTab];

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
        taskId: task.taskId,
        taskName: task.taskName,
        taskDescription: task.taskDescription,
        taskCompleted: task.taskCompleted,
        dateToComplete: task.dateToComplete,
        startTime: task.startTime,
        endTime: task.endTime,
        projectId: projectId,
      })
    );
  };

  const [deletingTask, setDeletingTask] = useState(false);

  const handleDeleteButton = async () => {
    setDeletingTask(true);
    await dispatch(deleteTask(task.taskId)).unwrap();
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
                  project.projectId === task.projectId
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

      <div className="task-details__top">
        <div className="task-details__actions">
          <IconButton
            onClick={handleOpenModal}
            disabled={!task.canEdit || user.id !== task.authorId}
          >
            <CgAssign />
          </IconButton>
          <IconButton onClick={handleEditButton} disabled={!task.canEdit}>
            <CgPen />
          </IconButton>
          {deletingTask ? (
            <IconButton disabled={true}>
              <LoadingIndicator size="small" />
            </IconButton>
          ) : (
            <IconButton disabled={!task.canDelete} onClick={handleDeleteButton}>
              <CgTrashEmpty />
            </IconButton>
          )}
        </div>
        <div>
          <div className="task-details__created-info">
            created{" "}
            {`${formatDate(task.createdAt)} ${formatTime(task.createdAt)}`}
            {user.id !== task.authorId && (
              <>
                {" "}
                by{" "}
                <span className="task-details__author-name">
                  {task.authorName}
                </span>
              </>
            )}
          </div>

          <div className="task-details__assignemnts">
            {task.projectId ? (
              <>
                task assigned to project:{" "}
                <AppLink to={`/projects/${task.projectId}`}>
                  {task.projectName}
                </AppLink>
              </>
            ) : (
              <>
                assign this task to project
                <AppLink to={`/projects/${task.projectId}`}>
                  {task.projectName}
                </AppLink>
              </>
            )}
          </div>
        </div>
      </div>

      {task.taskDescription && (
        <>
          <h3 className="task-details__header">description:</h3>
          <div className="task-details__description">
            {task.taskDescription}
          </div>
        </>
      )}

      <Tabs content={getTabsContent()} />
    </div>
  );
};

export default TaskDetails;
