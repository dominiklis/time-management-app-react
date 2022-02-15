import React, { useEffect, useMemo } from "react";

import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { createSelectCompletedTasks } from "../../store/selectors";

import TaskElement from "../../components/TaskElement/TaskElement";

const CompletedTasks = () => {
  const setBrowseTasksPageTitle = useOutletContext();

  useEffect(() => {
    setBrowseTasksPageTitle({
      leftButton: { text: "today", to: "today" },
      rightButton: { text: "monthly", to: "month" },
      header: "completed",
    });
  }, [setBrowseTasksPageTitle]);

  const { tasks, tasksLoaded } = useSelector((state) => state.tasks);

  const selectCompletedTasks = useMemo(createSelectCompletedTasks, []);

  const compltedTasks = useSelector(selectCompletedTasks);

  return (
    <div>
      {tasks.length === 0 && tasksLoaded ? (
        <p>there are no tasks to show</p>
      ) : (
        <>
          <div className="today-page">
            {compltedTasks.map((task) => (
              <TaskElement
                key={task.taskId}
                task={task}
                useCompletedDateInCard
                hideCompletedDateInDetails
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CompletedTasks;
