import { createSelector } from "@reduxjs/toolkit";
import {
  getCompletedTasks,
  overdueTasks,
  tasksForToday,
  tasksForTodayWithDateOnly,
  tasksForTodayWithStartTimeOnly,
  tasksWithoutDate,
} from "../utils/filterTasks";
import { sortByTime, sortCompletionDate } from "../utils/sortTasks";

const tasksSelector = (state) => state.tasks.tasks;

const createSelectTasksForToday = () =>
  createSelector(tasksSelector, (tasks) =>
    tasksForToday(tasks).sort(sortByTime())
  );

const createSelectTasksForTodayWithStartTime = () =>
  createSelector(tasksSelector, (tasks) =>
    tasksForTodayWithStartTimeOnly(tasks).sort(sortByTime())
  );

const createSelectTasksForTodayWithStartDateOnly = () =>
  createSelector(tasksSelector, (tasks) =>
    tasksForTodayWithDateOnly(tasks).sort(sortByTime())
  );

const createSelectOverdueTasks = () =>
  createSelector(tasksSelector, (tasks) =>
    overdueTasks(tasks).sort(sortByTime(true))
  );

const createSelectTasksWithoutDate = () =>
  createSelector(tasksSelector, (tasks) => tasksWithoutDate(tasks));

const createSelectCompletedTasks = () =>
  createSelector(tasksSelector, (tasks) =>
    getCompletedTasks(tasks).sort(sortCompletionDate)
  );

export {
  createSelectTasksForToday,
  createSelectTasksForTodayWithStartDateOnly,
  createSelectTasksForTodayWithStartTime,
  createSelectOverdueTasks,
  createSelectTasksWithoutDate,
  createSelectCompletedTasks,
};
