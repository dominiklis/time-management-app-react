import React, { useEffect, useMemo, useState } from "react";

import { useSelector } from "react-redux";
import { filterByPriority } from "../../utils/filterTasks";
import constants from "../../utils/constants";
import { useOutletContext } from "react-router-dom";
import {
  createSelectOverdueTasks,
  createSelectTasksForToday,
  createSelectTasksWithoutDate,
} from "../../store/selectors";

import Accordion from "../../components/Accordion/Accordion";
import TaskElement from "../../components/TaskElement/TaskElement";
import SearchAndFilterHeader from "../../components/SearchAndFilterHeader/SearchAndFilterHeader";

const TodaysTasks = () => {
  const { tasks, tasksLoaded } = useSelector((state) => state.tasks);

  const [priority, setPriority] = useState([]);

  const setBrowseTasksPageTitle = useOutletContext();

  const selectTodaysTasks = useMemo(createSelectTasksForToday, []);
  const selectOverdueTasks = useMemo(createSelectOverdueTasks, []);
  const selectTasksWithoutDate = useMemo(createSelectTasksWithoutDate, []);

  const todaysTasks = useSelector((state) => selectTodaysTasks(state));
  const overdueTasks = useSelector((state) => selectOverdueTasks(state));
  const tasksWithoutDate = useSelector((state) =>
    selectTasksWithoutDate(state)
  );

  useEffect(() => {
    setBrowseTasksPageTitle({
      leftButton: { text: "completed", to: "completed" },
      rightButton: { text: "monthly", to: "month" },
      header: "today",
    });
  }, [setBrowseTasksPageTitle]);

  return (
    <>
      {tasks.length === 0 && tasksLoaded ? (
        <p>{constants.pageTexts.addFirstTask}</p>
      ) : (
        <>
          <SearchAndFilterHeader
            priority={priority}
            setPriority={setPriority}
          />

          <Accordion
            header={`Today (${todaysTasks.length})`}
            color="primary"
            open
          >
            {filterByPriority(todaysTasks, priority).map((task) => (
              <TaskElement key={task.taskId} task={task} />
            ))}
          </Accordion>

          <Accordion
            header={`Overdue (${overdueTasks.length})`}
            color="warning"
          >
            {filterByPriority(overdueTasks, priority).map((task) => (
              <TaskElement key={task.taskId} task={task} />
            ))}
          </Accordion>

          <Accordion header={`No date (${tasksWithoutDate.length})`}>
            {filterByPriority(tasksWithoutDate, priority).map((task) => (
              <TaskElement key={task.taskId} task={task} />
            ))}
          </Accordion>
        </>
      )}
    </>
  );
};

export default TodaysTasks;
