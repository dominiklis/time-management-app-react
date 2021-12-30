import { getToday, getTomorrow } from "./days";

const overdueTasks = (tasks) => {
  const today = getToday();

  return tasks.filter((task) => {
    if (!task.dateToComplete || task.taskCompleted) return false;
    const taskDate = new Date(task.dateToComplete);
    return taskDate.getTime() < today.getTime();
  });
};

const tasksWithoutDate = (tasks) =>
  tasks.filter((task) => !task.dateToComplete);

const tasksForToday = (tasks) => {
  const today = getToday();

  const tomorrow = getTomorrow();

  return tasks.filter((task) => {
    if (!task.dateToComplete) return false;
    const taskDate = new Date(task.dateToComplete);
    return (
      taskDate.getTime() >= today.getTime() &&
      taskDate.getTime() < tomorrow.getTime()
    );
  });
};

const getTasksOfPeriod = (tasks, start, end, sorted) => {
  start = new Date(start);
  end = new Date(end);

  const tasksFromGivenPeriod = tasks.filter((task) => {
    if (!task.dateToComplete) return false;
    const taskDate = new Date(task.dateToComplete);
    return (
      taskDate.getTime() >= start.getTime() &&
      taskDate.getTime() < end.getTime()
    );
  });

  if (sorted) {
    const sortedTasks = {};
    tasksFromGivenPeriod.forEach((task) => {
      if (!sortedTasks[task.dateToComplete])
        sortedTasks[task.dateToComplete] = [];
      sortedTasks[task.dateToComplete].push(task);
    });

    return sortedTasks;
  }

  return tasksFromGivenPeriod;
};

const getTasksForProject = (tasks, projectId) =>
  tasks.filter((task) => task.projectId === projectId);

const getCompletedTasks = (tasks, completed) =>
  tasks.filter((task) => {
    if (task.taskCompleted === completed) return true;
    return false;
  });

const getTaskById = (tasks, taskId) =>
  tasks.find((task) => task.taskId === taskId);

export {
  overdueTasks,
  tasksWithoutDate,
  tasksForToday,
  getTasksOfPeriod,
  getTasksForProject,
  getCompletedTasks,
  getTaskById,
};
