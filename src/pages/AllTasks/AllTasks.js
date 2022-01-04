import React, { useCallback, useEffect, useState } from "react";
import "./AllTasks.css";

import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  formatDate,
  formatMonthAndYear,
  getNextMonth,
  getPrevMonth,
  getToday,
} from "../../utils/days";
import { getTasksOfPeriod, tasksWithoutDate } from "../../utils/filterTasks";

import Page from "../../components/Page/Page";
import NavigationButton from "../../components/NavigationButton/NavigationButton";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import Accordion from "../../components/Accordion/Accordion";
import TaskElement from "../../components/TaskElement/TaskElement";
import Modal from "../../components/Modal/Modal";
import CreateTaskForm from "../../components/CreateTaskForm/CreateTaskForm";
import FloatingButton from "../../components/FloatingButton/FloatingButton";
import SearchForm from "../../components/SearchForm/SearchForm";

const getPath = (date) => {
  return `/all/${date.getFullYear()}-${date.getMonth() < 9 ? "0" : ""}${
    date.getMonth() + 1
  }`;
};

const AllTasks = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const { tasks, tasksLoaded } = useSelector((state) => state.tasks);

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

  if (!tasksLoaded || !month) {
    return <LoadingPage />;
  }

  return (
    <Page title="All Tasks">
      {showModal && (
        <Modal
          modalOpen={showModal}
          handleClose={handleClose}
          modalTitle="Create Task"
        >
          <CreateTaskForm title="Create new task" afterSubmit={handleClose} />
        </Modal>
      )}

      <SearchForm />

      <FloatingButton onClick={handleOpenModal} />
      <div className="all-tasks-page__navigation">
        <NavigationButton onClick={handlePrevMonth}>{"<"}</NavigationButton>
        <div className="all-tasks-page__current-month">
          {formatMonthAndYear(month)}
        </div>
        <NavigationButton onClick={handleNextMonth}>{">"}</NavigationButton>
      </div>
      <Accordion header="tasks without date" color="secondary">
        {tasksWithoutDate(tasks).map((task) => (
          <TaskElement key={task.taskId} task={task} />
        ))}
      </Accordion>
      {Object.keys(sortedtasks).map((date) => (
        <Accordion
          header={formatDate(date) + ` (${sortedtasks[date].length})`}
          key={date}
        >
          {sortedtasks[date].map((task, index) => (
            <TaskElement key={task.taskId} task={task} />
          ))}
        </Accordion>
      ))}
    </Page>
  );
};

export default AllTasks;
