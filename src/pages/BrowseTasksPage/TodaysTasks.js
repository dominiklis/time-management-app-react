import React, { useEffect, useMemo } from "react";

import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { tasksForToday } from "../../utils/filterTasks";

import TaskElement from "../../components/TaskElement/TaskElement";
import {
  createSelectTasksWithDateAndStartTime,
  createSelectTasksWithDateOnly,
} from "../../utils/selectors";

const TodaysTasks = () => {
  const setBrowseTasksPageTitle = useOutletContext();

  useEffect(() => {
    setBrowseTasksPageTitle({
      leftButton: { text: "completed", to: "completed" },
      rightButton: { text: "monthly", to: "month" },
      header: "today",
    });
  }, [setBrowseTasksPageTitle]);

  const { tasks, tasksLoaded } = useSelector((state) => state.tasks);

  const selectTasksWithDateAndStartTime = useMemo(
    createSelectTasksWithDateAndStartTime,
    []
  );

  const selectTasksWithDateOnly = useMemo(createSelectTasksWithDateOnly, []);

  const tasksWithDateAndStartTime = useSelector((state) =>
    selectTasksWithDateAndStartTime(state, true)
  );

  const tasksWithDateOnly = useSelector((state) =>
    selectTasksWithDateOnly(state)
  );

  return (
    <div>
      {tasks.length === 0 && tasksLoaded ? (
        <p>add your first task</p>
      ) : (
        <>
          <div className="today-page">
            {tasksForToday(tasksWithDateAndStartTime).map((task) => (
              <TaskElement key={task.taskId} task={task} />
            ))}
          </div>
          <h3>also to be done today</h3>
          <div className="today-page">
            {tasksForToday(tasksWithDateOnly).map((task) => (
              <TaskElement key={task.taskId} task={task} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TodaysTasks;
