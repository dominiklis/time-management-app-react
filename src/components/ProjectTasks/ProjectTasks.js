import React, { useState } from "react";
import "./ProjectTasks.css";

import { useSelector } from "react-redux";
import { getCompletedTasks, getTasksForProject } from "../../utils/filterTasks";
import TaskElement from "../TaskElement/TaskElement";
import TaskCard from "../TaskCard/TaskCard";
import Modal from "../Modal/Modal";

const ProjectTasks = ({ projectId }) => {
  const { tasks } = useSelector((state) => state.tasks);

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <div className="project-tasks">
      {showModal && (
        <Modal setShowModal={setShowModal} modalTitle="task details">
          <TaskElement
            border
            key={tasks[0].taskId}
            task={tasks[0]}
            alwaysExapnded
          />
        </Modal>
      )}

      <div className="project-tasks__uncompleted">
        <h5 className="project-tasks__section-header">uncompleted</h5>
        {getCompletedTasks(getTasksForProject(tasks, projectId), false).map(
          (task) => (
            <TaskCard
              key={task.taskId}
              {...task}
              background
              border
              verticalMargin
              noEditButton
              onClick={handleOpenModal}
            />
          )
        )}
      </div>
      <div className="project-tasks__completed">
        <h5 className="project-tasks__section-header">completed</h5>
        {getCompletedTasks(getTasksForProject(tasks, projectId), true).map(
          (task) => (
            <TaskCard
              key={task.taskId}
              {...task}
              background
              border
              verticalMargin
              noEditButton
              onClick={handleOpenModal}
            />
          )
        )}
      </div>
    </div>
  );
};

export default ProjectTasks;
