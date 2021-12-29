import React, { useState } from "react";

import TaskCard from "../TaskCard/TaskCard";
import TaskDetails from "../TaskDetails/TaskDetails";
import ExpandableComponent from "../ExpandableComponent/ExpandableComponent";
import EditTask from "../EditTask/EditTask";

const TaskElement = ({ task }) => {
  const [editTask, setEditTask] = useState(false);

  const toggleEditTask = () => setEditTask((prev) => !prev);

  return (
    <div className="task-element">
      {editTask ? (
        <EditTask
          setEditTask={setEditTask}
          {...task}
          disableDeleteButton={!task.canDelete}
        />
      ) : (
        <ExpandableComponent
          passOnClickHandler
          alwaysVisibleComponent={
            <TaskCard {...task} toggleEditTask={toggleEditTask} />
          }
          componentToBeExpanded={<TaskDetails {...task} />}
        />
      )}
    </div>
  );
};

export default TaskElement;
