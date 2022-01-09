const priorityLevels = ["normal", "important", "urgent"];

const getPriorityLevel = (priority) => {
  if (priority < 0) priority = 0;
  if (priority >= priorityLevels.length) priority = priorityLevels.length - 1;

  return priorityLevels[priority];
};

export default getPriorityLevel;
