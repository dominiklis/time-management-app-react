import { createSelector } from "@reduxjs/toolkit";
import { tasksWithoutDate } from "../utils/filterTasks";

const tasksSelector = (state) => state.tasks.tasks;

const createSelectCompletedTasks = () =>
  createSelector(tasksSelector, (tasks) =>
    tasks
      .filter((task) => task.taskCompleted)
      .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
  );

const createSelectTasksWithoutDateSet = () =>
  createSelector(tasksSelector, (tasks) => {
    return tasksWithoutDate(tasks);
  });

const createSelectTasksWithDateOnly = () =>
  createSelector(tasksSelector, (tasks) =>
    tasks.filter((task) => !!task.startDate && !task.startTime)
  );

const createSelectTasksWithDateAndStartTime = () =>
  createSelector(
    tasksSelector,
    (_, sortByStartTime) => sortByStartTime,
    (tasks, sortByStartTime = false) =>
      tasks
        .filter((task) => {
          return !!task.startDate && task.startTime;
        })
        .sort((a, b) => {
          if (!sortByStartTime) return 0;

          return new Date(a.startTime) - new Date(b.startTime);
        })
  );

export {
  createSelectCompletedTasks,
  createSelectTasksWithoutDateSet,
  createSelectTasksWithDateOnly,
  createSelectTasksWithDateAndStartTime,
};
