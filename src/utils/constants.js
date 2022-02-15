const constants = {
  assignToProject: "assign to project",
  highlightedProject: "highlighted project",

  errors: {
    name: "name cannot be empty",
    endTime: "task cannot end before it begins",
  },

  pageTitles: {
    home: "Tasks for today",
    yourTasks: "Your tasks",
    browseTasks: "Browse Tasks",
    search: "Search",
    searchFor: (searchInput) => `Search results for "${searchInput}"`,
    projects: "Your Projects",
  },

  modalTitles: {
    createTask: "Create Task",
    addTaskToProject: "Add task to project",
  },

  pageTexts: {
    addFirstTask: "add your first task",
  },

  accordionHeaders: {
    tasksWithoutDate: "tasks without date",
  },
};

export default constants;
