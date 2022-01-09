import React, { useState } from "react";
import "./ProjectElement.css";

import ExpandableComponent from "../ExpandableComponent/ExpandableComponent";
import ProjectCard from "../ProjectCard/ProjectCard";
import ProjectDetails from "../ProjectDetails/ProjectDetails";
import EditProjectForm from "../EditProjectForm/EditProjectForm";

const ProjectElement = ({
  project,
  handleAddTaskToProject,
  border,
  headerColor,
  initiallyExpanded,
}) => {
  const [editingState, setEditingState] = useState({
    editing: false,
    returnedFromEditing: false,
  });

  const atTheEndOfEdition = () =>
    setEditingState({ editing: false, returnedFromEditing: true });

  const toggleEditProject = () =>
    setEditingState((prev) => ({ ...prev, editing: !prev.editing }));

  const getStyle = () => {
    let cln = "project-element";

    if (border) cln += " project-element--border";

    return cln;
  };

  return (
    <div className={getStyle()}>
      {editingState.editing ? (
        <EditProjectForm
          project={project}
          atTheEndOfEdition={atTheEndOfEdition}
        />
      ) : (
        <ExpandableComponent
          hoverActiveStyles
          initiallyExpanded={
            initiallyExpanded || editingState.returnedFromEditing
          }
          key={project.projectId}
          alwaysVisibleComponent={
            <ProjectCard
              projectName={project.projectName}
              authorName={project.authorName}
              color={headerColor}
            />
          }
          componentToBeExpanded={
            <ProjectDetails
              project={project}
              toggleEditProject={toggleEditProject}
              handleAddTaskToProject={handleAddTaskToProject}
            />
          }
        />
      )}
    </div>
  );
};

export default ProjectElement;
