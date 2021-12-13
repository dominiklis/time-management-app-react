import React, { useState } from "react";
import "./TaskElement.css";

import EditTask from "../EditTask/EditTask";
import TaskCard from "../TaskCard/TaskCard";
import TaskDetails from "../TaskDetails/TaskDetails";

const TaskElement = ({ task, overdue, disableBottomBorder }) => {
  const [editTask, setEditTask] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const toggleShowDetails = () => setShowDetails((prev) => !prev);
  const toggleEditTask = () => setEditTask((prev) => !prev);

  return (
    <div
      className={`task${disableBottomBorder ? " task--no-border" : ""}`}
      aria-expanded={showDetails}
    >
      {editTask ? (
        <EditTask
          {...task}
          setEditTask={setEditTask}
          afterSubmit={toggleEditTask}
          disableDeleteButton={!task.canDelete}
        />
      ) : (
        <>
          <div className="task__card">
            <TaskCard
              {...task}
              onClick={editTask ? null : toggleShowDetails}
              setEditTask={setEditTask}
              taskActive={showDetails}
              overdue={overdue}
            />
          </div>
          <div className="task__details" aria-expanded={showDetails}>
            <TaskDetails {...task} />
          </div>
        </>
      )}
    </div>
  );
};

export default TaskElement;
