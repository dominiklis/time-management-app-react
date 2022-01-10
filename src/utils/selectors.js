import { createSelector } from "@reduxjs/toolkit";

const tasksSelector = (state) => state.tasks.tasks;

const createSelectCompletedTasks = () =>
  createSelector(tasksSelector, (tasks) =>
    tasks
      .filter((task) => task.taskCompleted)
      .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
  );

const createSelectTasksWithoutDateSet = () =>
  createSelector(tasksSelector, (tasks) =>
    tasks.filter((task) => !task.dateToComplete)
  );

const createSelectTasksWithDateOnly = () =>
  createSelector(tasksSelector, (tasks) =>
    tasks.filter((task) => !!task.dateToComplete && !task.startTime)
  );

const createSelectTasksWithDateAndStartTime = () =>
  createSelector(
    tasksSelector,
    (_, sortByStartTime) => sortByStartTime,
    (tasks, sortByStartTime = false) =>
      tasks
        .filter((task) => !!task.startTime)
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
