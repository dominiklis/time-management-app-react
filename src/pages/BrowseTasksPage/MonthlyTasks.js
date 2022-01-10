import React, { useCallback, useEffect, useState } from "react";
import "./MonthlyTasks.css";

import { useSelector } from "react-redux";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import {
  formatDate,
  formatMonthAndYear,
  getNextMonth,
  getPrevMonth,
  getToday,
} from "../../utils/days";
import {
  filterByPriority,
  getTasksOfPeriod,
  tasksWithoutDate,
} from "../../utils/filterTasks";
import constants from "../../utils/constants";

import NavigationButton from "../../components/NavigationButton/NavigationButton";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import Accordion from "../../components/Accordion/Accordion";
import TaskElement from "../../components/TaskElement/TaskElement";
import SearchAndFilterHeader from "../../components/SearchAndFilterHeader/SearchAndFilterHeader";

const getPath = (date) => {
  return `/browse/month/${date.getFullYear()}-${
    date.getMonth() < 9 ? "0" : ""
  }${date.getMonth() + 1}`;
};

const MonthlyTasks = () => {
  const setBrowseTasksPageTitle = useOutletContext();

  useEffect(() => {
    setBrowseTasksPageTitle({
      leftButton: { text: "completed", to: "completed" },
      rightButton: { text: "today", to: "today" },
      header: "monthly",
    });
  }, [setBrowseTasksPageTitle]);

  const { tasks, tasksLoaded } = useSelector((state) => state.tasks);

  const navigate = useNavigate();
  const { monthYear } = useParams();

  const [priority, setPriority] = useState([]);
  const [month, setMonth] = useState(null);
  const [sortedtasks, setSortedTasks] = useState([]);

  const handlePrevMonth = () => {
    const prev = getPrevMonth(month);

    navigate(getPath(prev));
  };

  const handleNextMonth = () => {
    const next = getNextMonth(month);

    navigate(getPath(next));
  };

  const getTasksForSelectMonth = useCallback(
    (monthYear) => {
      const tasksForThisMonth = getTasksOfPeriod(
        tasks,
        monthYear,
        getNextMonth(monthYear),
        true
      );

      setSortedTasks(tasksForThisMonth);
    },
    [tasks]
  );

  useEffect(() => {
    if (!monthYear) {
      const today = getToday();
      navigate(getPath(today));
    } else {
      setMonth(new Date(monthYear + "-01"));
      getTasksForSelectMonth(new Date(monthYear + "-01"));
    }
  }, [getTasksForSelectMonth, monthYear, navigate, tasks]);

  if (!tasksLoaded || !month) {
    return <LoadingPage />;
  }

  return (
    <>
      <SearchAndFilterHeader priority={priority} setPriority={setPriority} />
      <div className="all-tasks-page__top">
        <NavigationButton onClick={handlePrevMonth}>{"<"}</NavigationButton>
        <div className="all-tasks-page__current-month">
          {formatMonthAndYear(month)}
        </div>
        <NavigationButton onClick={handleNextMonth}>{">"}</NavigationButton>
      </div>
      <Accordion
        header={constants.accordionHeaders.tasksWithoutDate}
        color="secondary"
      >
        {filterByPriority(tasksWithoutDate(tasks), priority).map((task) => (
          <TaskElement key={task.taskId} task={task} />
        ))}
      </Accordion>
      {Object.keys(sortedtasks)
        .sort()
        .map((date) => (
          <Accordion
            header={formatDate(date) + ` (${sortedtasks[date].length})`}
            key={date}
          >
            {filterByPriority(sortedtasks[date], priority).map(
              (task, index) => (
                <TaskElement key={task.taskId} task={task} />
              )
            )}
          </Accordion>
        ))}
    </>
  );
};

export default MonthlyTasks;
