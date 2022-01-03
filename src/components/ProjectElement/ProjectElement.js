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
  const [editProject, setEditProject] = useState(false);

  const toggleEditProject = () => setEditProject((prev) => !prev);
  const getStyle = () => {
    let cln = "project-element";

    if (border) cln += " project-element--border";

    return cln;
  };

  return (
    <div className={getStyle()}>
      {editProject ? (
        <EditProjectForm project={project} setEditProject={setEditProject} />
      ) : (
        <ExpandableComponent
          hoverActiveStyles
          initiallyExpanded={initiallyExpanded}
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
