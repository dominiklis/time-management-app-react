import React, { useCallback, useEffect, useState } from "react";
import "./AllTasks.css";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  formatDate,
  formatMonthAndYear,
  getNextMonth,
  getPrevMonth,
  getToday,
} from "../../utils/days";

import Page from "../../components/Page/Page";
import NavigationButton from "../../components/NavigationButton/NavigationButton";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import Accordion from "../../components/Accordion/Accordion";
import TaskElement from "../../components/TaskElement/TaskElement";
import { getTasksOfPeriod } from "../../utils/filterTasks";
import { getTasks } from "../../store/slices/tasksSlice";

const getPath = (date) => {
  return `/all/${date.getFullYear()}-${date.getMonth() < 9 ? "0" : ""}${
    date.getMonth() + 1
  }`;
};

const AllTasks = () => {
  const { tasks, tasksLoaded } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { monthYear } = useParams();

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

  useEffect(() => {
    const loadTasks = async () => {
      if (tasks.length === 0 && !tasksLoaded)
        await dispatch(getTasks()).unwrap();
    };

    loadTasks();
  }, []);

  if (!tasksLoaded || !month) {
    return <LoadingPage />;
  }

  return (
    <Page>
      <div className="all-tasks-page__navigation">
        <NavigationButton onClick={handlePrevMonth}>{"<"}</NavigationButton>
        <div className="all-tasks-page__current-month">
          {formatMonthAndYear(month)}
        </div>
        <NavigationButton onClick={handleNextMonth}>{">"}</NavigationButton>
      </div>
      {Object.keys(sortedtasks).map((date) => (
        <Accordion
          header={formatDate(date) + ` (${sortedtasks[date].length})`}
          key={date}
        >
          {sortedtasks[date].map((task, index) => (
            <TaskElement
              key={task.taskId}
              task={task}
              disableBottomBorder={index === sortedtasks[date].length - 1}
            />
          ))}
        </Accordion>
      ))}
    </Page>
  );
};

export default AllTasks;
