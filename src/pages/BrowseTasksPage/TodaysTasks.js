import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import {
  filterByPriority,
  overdueTasks,
  tasksForToday,
  tasksWithoutDate,
} from "../../utils/filterTasks";
import constants from "../../utils/constants";

import Accordion from "../../components/Accordion/Accordion";

import TaskElement from "../../components/TaskElement/TaskElement";

import SearchAndFilterHeader from "../../components/SearchAndFilterHeader/SearchAndFilterHeader";
import { useOutletContext } from "react-router-dom";

const TodaysTasks = () => {
  const { tasks, tasksLoaded } = useSelector((state) => state.tasks);

  const [priority, setPriority] = useState([]);

  const setBrowseTasksPageTitle = useOutletContext();

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
            header={`Today (${tasksForToday(tasks).length})`}
            color="primary"
            open
          >
            {filterByPriority(tasksForToday(tasks), priority).map((task) => (
              <TaskElement key={task.taskId} task={task} />
            ))}
          </Accordion>

          <Accordion
            header={`Overdue (${overdueTasks(tasks).length})`}
            color="warning"
          >
            {filterByPriority(overdueTasks(tasks), priority).map((task) => (
              <TaskElement key={task.taskId} task={task} />
            ))}
          </Accordion>

          <Accordion header={`No date (${tasksWithoutDate(tasks).length})`}>
            {filterByPriority(tasksWithoutDate(tasks), priority).map((task) => (
              <TaskElement key={task.taskId} task={task} />
            ))}
          </Accordion>
        </>
      )}
    </>
  );
};

export default TodaysTasks;
