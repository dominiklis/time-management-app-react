import React, { useCallback, useEffect } from "react";
import "./Home.css";

import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../store/slices/tasksSlice";

import {
  overdueTasks,
  tasksForToday,
  tasksWithoutDate,
} from "../../utils/filterTasks";

import Accordion from "../../components/Accordion/Accordion";
import Page from "../../components/Page/Page";
import TaskElement from "../../components/TaskElement/TaskElement";
import LoadingPage from "../../components/LoadingPage/LoadingPage";

const Home = () => {
  const { tasks, tasksLoaded } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const loadTasks = useCallback(async () => {
    if (tasks.length === 0 && !tasksLoaded) await dispatch(getTasks()).unwrap();
  }, [dispatch, tasks.length, tasksLoaded]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  if (!tasksLoaded) {
    return <LoadingPage fullScreen />;
  }

  if (tasks.length === 0) return <div>Add your first task.</div>;

  return (
    <Page title="Tasks For Today">
      <div className="home-page">
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

        <Accordion
          header={`Overdue (${overdueTasks(tasks).length})`}
          color="warning"
        >
          {overdueTasks(tasks).map((task, index) => (
            <TaskElement
              key={task.taskId}
              task={task}
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
      </div>
    </Page>
  );
};

export default Home;
