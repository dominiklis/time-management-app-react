const getProjectsThatUserCanEdit = (projects) =>
  projects.filter((project) => {
    if (project.canEdit) return true;
    return false;
  });

export { getProjectsThatUserCanEdit };
