import React, { useState } from "react";

import "./TaskElement.css";

import EditTask from "../EditTask/EditTask";
import TaskCard from "../TaskCard/TaskCard";
import TaskDetails from "../TaskDetails/TaskDetails";

const TaskElement = ({ task }) => {
  const [editTask, setEditTask] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const toggleShowDetails = () => setShowDetails((prev) => !prev);
  const toggleEditTask = () => setEditTask((prev) => !prev);

  return (
    <div className="task">
      {editTask ? (
        <EditTask
          {...task}
          setEditTask={setEditTask}
          afterSubmit={toggleEditTask}
        />
      ) : (
        <>
          <div className="task__card">
            <TaskCard
              {...task}
              onClick={editTask ? null : toggleShowDetails}
              setEditTask={setEditTask}
            />
          </div>
          <div
            className={`task__details${
              showDetails ? "" : " task__details--hide"
            }`}
          >
            <TaskDetails {...task} />
          </div>
        </>
      )}
    </div>
  );
};

export default TaskElement;
