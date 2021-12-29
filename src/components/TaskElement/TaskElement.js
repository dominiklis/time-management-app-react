import React, { useState } from "react";
import "./TaskElement.css";

import TaskCard from "../TaskCard/TaskCard";
import TaskDetails from "../TaskDetails/TaskDetails";
import ExpandableComponent from "../ExpandableComponent/ExpandableComponent";
import EditTask from "../EditTask/EditTask";

const TaskElement = ({ task, border, alwaysExapnded }) => {
  const [editTask, setEditTask] = useState(false);

  const toggleEditTask = () => setEditTask((prev) => !prev);

  const getStyles = () => {
    let cln = "task-element";

    if (border) cln += " task-element--bordered";

    return cln;
  };

  return (
    <div className={getStyles()}>
      {editTask ? (
        <EditTask
          setEditTask={setEditTask}
          {...task}
          disableDeleteButton={!task.canDelete}
        />
      ) : (
        <ExpandableComponent
          alwaysExapnded={alwaysExapnded}
          passOnClickHandler
          alwaysVisibleComponent={
            <TaskCard
              {...task}
              toggleEditTask={toggleEditTask}
              defaultCursor={alwaysExapnded}
            />
          }
          componentToBeExpanded={<TaskDetails {...task} />}
        />
      )}
    </div>
  );
};

export default TaskElement;
