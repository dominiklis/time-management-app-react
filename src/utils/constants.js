const constants = {
  nameError: "name cannot be empty",
  assignToProject: "assign to project",
  highlightedProject: "highlighted project",

  pageTitles: {
    home: "Your tasks",
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
