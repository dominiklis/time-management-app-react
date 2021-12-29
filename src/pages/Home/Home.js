import React from "react";
import "./Home.css";

import { useSelector } from "react-redux";

import {
  overdueTasks,
  tasksForToday,
  tasksWithoutDate,
} from "../../utils/filterTasks";

import Accordion from "../../components/Accordion/Accordion";
import Page from "../../components/Page/Page";
import TaskElement from "../../components/TaskElement/TaskElement";
import CreateTaskForm from "../../components/CreateTaskForm/CreateTaskForm";

const Home = () => {
  const { tasks, tasksLoaded } = useSelector((state) => state.tasks);

  if (tasks.length === 0 && tasksLoaded) return <div>Add your first task.</div>;

  return (
    <Page title="Tasks For Today" loadingPage={!tasksLoaded}>
      <CreateTaskForm border onlyTaskName title="create new task" />

      <div className="home-page">
        <Accordion
          header={`Today (${tasksForToday(tasks).length})`}
          color="primary"
          open
        >
          {tasksForToday(tasks).map((task) => (
            <TaskElement key={task.taskId} task={task} />
          ))}
        </Accordion>

        <Accordion
          header={`Overdue (${overdueTasks(tasks).length})`}
          color="warning"
        >
          {overdueTasks(tasks).map((task) => (
            <TaskElement key={task.taskId} task={task} />
          ))}
        </Accordion>

        <Accordion header={`No date (${tasksWithoutDate(tasks).length})`}>
          {tasksWithoutDate(tasks).map((task) => (
            <TaskElement key={task.taskId} task={task} />
          ))}
        </Accordion>
      </div>
    </Page>
  );
};

export default Home;
