import React from "react";
import "./ProjectTasks.css";

import { useSelector } from "react-redux";
import { getCompletedTasks, getTasksForProject } from "../../utils/filterTasks";
import TaskElement from "../TaskElement/TaskElement";

const ProjectTasks = ({ projectId }) => {
  const { tasks } = useSelector((state) => state.tasks);

  return (
    <div className="project-tasks">
      <div className="project-tasks__uncompleted">
        <h5 className="project-tasks__section-header">uncompleted</h5>
        {getCompletedTasks(getTasksForProject(tasks, projectId), false).map(
          (task) => (
            <TaskElement border key={task.taskId} task={task} />
          )
        )}
      </div>
      <div className="project-tasks__completed">
        <h5 className="project-tasks__section-header">completed</h5>
        {getCompletedTasks(getTasksForProject(tasks, projectId), true).map(
          (task) => (
            <TaskElement border key={task.taskId} task={task} />
          )
        )}
      </div>
    </div>
  );
};

export default ProjectTasks;
