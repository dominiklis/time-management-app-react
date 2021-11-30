import { getToday, getTomorrow } from "./days";

const overdueTasks = (tasks) => {
  const today = getToday();

  return tasks.filter((task) => {
    if (!task.dateToComplete) return false;
    const taskDate = new Date(task.dateToComplete);
    return taskDate.getTime() < today.getTime();
  });
};

const tasksWithoutDate = (tasks) => {
  return tasks.filter((task) => !task.dateToComplete);
};

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

export { overdueTasks, tasksWithoutDate, tasksForToday };
