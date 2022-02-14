import { getToday, getTomorrow } from "./days";

const tasksForToday = (tasks) => {
  const today = getToday();

  const tomorrow = getTomorrow();

  return tasks.filter((task) => {
    if (!task.startDate) return false;

    let taskDate = null;
    if (task.endDate) taskDate = new Date(task.endDate);
    else taskDate = new Date(task.startDate);

    return (
      taskDate.getTime() >= today.getTime() &&
      taskDate.getTime() < tomorrow.getTime()
    );
  });
};

const tasksForTodayWithStartTimeOnly = (tasks) => {
  const todays = tasksForToday(tasks);

  return todays.filter((task) => task.startTime);
};

const tasksForTodayWithDateOnly = (tasks) => {
  const todays = tasksForToday(tasks);

  return todays.filter((task) => task.startDate && !task.startTime);
};

const overdueTasks = (tasks) => {
  const today = getToday();

  const result = tasks.filter((task) => {
    if (!task.startDate || task.taskCompleted) return false;

    let date = task.startDate;
    if (task.endDate) date = task.endDate;

    return new Date(date).getTime() < today.getTime();
  });

  return result;
};

const tasksWithoutDate = (tasks) => tasks.filter((task) => !task.startDate);

const getCompletedTasks = (tasks, completed = true) =>
  tasks.filter((task) => {
    if (task.taskCompleted === completed) return true;
    return false;
  });

const getTasksOfPeriod = (tasks, start, end, sorted) => {
  start = new Date(start);
  end = new Date(end);

  const tasksFromGivenPeriod = tasks.filter((task) => {
    if (!task.startDate) return false;

    let taskDate = null;
    if (task.endDate) taskDate = new Date(task.endDate);
    else taskDate = new Date(task.startDate);

    return (
      taskDate.getTime() >= start.getTime() &&
      taskDate.getTime() < end.getTime()
    );
  });

  if (sorted) {
    const sortedTasks = {};

    tasksFromGivenPeriod.forEach((task) => {
      const dateToComplete = task.endDate
        ? task.endDate.split("T")[0]
        : task.startDate.split("T")[0];

      if (!sortedTasks[dateToComplete]) sortedTasks[dateToComplete] = [];

      sortedTasks[dateToComplete].push(task);
    });

    return sortedTasks;
  }

  return tasksFromGivenPeriod;
};

const getTasksForProject = (tasks, projectId) =>
  tasks.filter((task) => task.projectId === projectId);

const getTaskById = (tasks, taskId) =>
  tasks.find((task) => task.taskId === taskId);

const filterByPriority = (tasks, priorities) => {
  if (priorities.length === 0) return tasks;

  return tasks.filter((task) => priorities.includes(task.priority));
};

export {
  tasksForToday,
  tasksForTodayWithStartTimeOnly,
  tasksForTodayWithDateOnly,
  overdueTasks,
  tasksWithoutDate,
  getCompletedTasks,
  getTasksOfPeriod,
  getTasksForProject,
  getTaskById,
  filterByPriority,
};
