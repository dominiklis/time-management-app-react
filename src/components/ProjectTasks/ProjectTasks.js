import React, { useState } from "react";
import "./ProjectTasks.css";

import { useSelector } from "react-redux";
import {
  filterByPriority,
  getCompletedTasks,
  getTaskById,
  getTasksForProject,
} from "../../utils/filterTasks";
import TaskElement from "../TaskElement/TaskElement";
import TaskCard from "../TaskCard/TaskCard";
import Modal from "../Modal/Modal";
import PriorityFilter from "../PriorityFilter/PriorityFilter";

const ProjectTasks = ({ projectId }) => {
  const { tasks } = useSelector((state) => state.tasks);
  const [priority, setPriority] = useState([]);

  const [modalState, setModalState] = useState({
    task: null,
    showModal: false,
  });

  const handleOpenModal = (taskId) =>
    setModalState({ taskId, showModal: true });

  const handleCloseModal = () =>
    setModalState({ taskId: null, showModal: false });

  return (
    <div className="project-tasks">
      <PriorityFilter selected={priority} setSelected={setPriority} />

      {modalState.showModal && (
        <Modal
          modalOpen={modalState.showModal}
          handleClose={handleCloseModal}
          modalTitle="task details"
        >
          <TaskElement
            border
            task={getTaskById(tasks, modalState.taskId)}
            alwaysExpanded
          />
        </Modal>
      )}

      <div className="project-tasks__uncompleted">
        <h5 className="project-tasks__section-header">uncompleted</h5>
        {filterByPriority(
          getCompletedTasks(getTasksForProject(tasks, projectId), false),
          priority
        ).map((task) => (
          <TaskCard
            key={task.taskId}
            task={task}
            background
            border
            verticalMargin
            showRemoveProjectIdButton
            onClick={() => handleOpenModal(task.taskId)}
          />
        ))}
      </div>
      <div className="project-tasks__completed">
        <h5 className="project-tasks__section-header">completed</h5>
        {filterByPriority(
          getCompletedTasks(getTasksForProject(tasks, projectId), true),
          priority
        ).map((task) => (
          <TaskCard
            key={task.taskId}
            task={task}
            background
            border
            verticalMargin
            showRemoveProjectIdButton
            onClick={handleOpenModal}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectTasks;
