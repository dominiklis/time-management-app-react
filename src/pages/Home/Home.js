import React, { useEffect } from "react";
import "./Home.css";

import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../store/slices/tasksSlice";

import {
  overdueTasks,
  tasksForToday,
  tasksWithoutDate,
} from "../../utils/filterTasks";

import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";
import Accordion from "../../components/Accordion/Accordion";
import Page from "../../components/Page/Page";
import TaskElement from "../../components/TaskElement/TaskElement";

const Home = () => {
  const { tasks, tasksLoaded } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const loadTasks = async () => {
    if (tasks.length === 0 && !tasksLoaded) await dispatch(getTasks()).unwrap();
  };

  useEffect(() => {
    loadTasks();
  }, []);

  if (!tasksLoaded) {
    return (
      <div className="home-page__loading">
        <LoadingIndicator />
      </div>
    );
  }

  if (tasks.length === 0) return <div>Add your first task.</div>;

  return (
    <Page>
      <Accordion
        header={`Overdue (${overdueTasks(tasks).length})`}
        color="warning"
      >
        {overdueTasks(tasks).map((task, index) => (
          <TaskElement
            key={task.taskId}
            task={task}
            overdue
            disableBottomBorder={index === overdueTasks(tasks).length - 1}
          />
        ))}
      </Accordion>

      <Accordion header={`No date (${tasksWithoutDate(tasks).length})`}>
        {tasksWithoutDate(tasks).map((task, index) => (
          <TaskElement
            key={task.taskId}
            task={task}
            disableBottomBorder={index === tasksWithoutDate(tasks).length - 1}
          />
        ))}
      </Accordion>

      <div className="home-page__today">
        <Accordion
          header={`Today (${tasksForToday(tasks).length})`}
          color="primary"
          open
        >
          {tasksForToday(tasks).map((task, index) => (
            <TaskElement
              key={task.taskId}
              task={task}
              disableBottomBorder={index === tasksForToday(tasks).length - 1}
            />
          ))}
        </Accordion>
      </div>
    </Page>
  );
};

export default Home;
