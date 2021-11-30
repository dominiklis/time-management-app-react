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
import TaskCard from "../../components/TaskCard/TaskCard";
import Accordion from "../../components/Accordion/Accordion";

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
      <div className="home-page--loading">
        <LoadingIndicator />
      </div>
    );
  }

  if (tasks.length === 0) return <div>Add your first task.</div>;

  return (
    <div>
      <Accordion header="Overdue" headerColor="warning" hidden>
        {overdueTasks(tasks).map((task) => (
          <TaskCard key={task.taskId} {...task} overdue />
        ))}
      </Accordion>

      <Accordion header="No date" hidden>
        {tasksWithoutDate(tasks).map((task) => (
          <TaskCard key={task.taskId} {...task} />
        ))}
      </Accordion>

      <Accordion header="Today" headerColor="primary">
        {tasksForToday(tasks).map((task) => (
          <TaskCard key={task.taskId} {...task} />
        ))}
      </Accordion>
    </div>
  );
};

export default Home;
