import React, { useState } from "react";
import "./ProjectElement.css";

import ExpandableComponent from "../ExpandableComponent/ExpandableComponent";
import ProjectCard from "../ProjectCard/ProjectCard";
import ProjectDetails from "../ProjectDetails/ProjectDetails";
import EditProjectForm from "../EditProjectForm/EditProjectForm";

const ProjectElement = ({ project, handleAddTaskToProject }) => {
  const [editProject, setEditProject] = useState(false);

  const toggleEditProject = () => setEditProject((prev) => !prev);

  return (
    <div className="project-element">
      {editProject ? (
        <EditProjectForm project={project} setEditProject={setEditProject} />
      ) : (
        <ExpandableComponent
          hoverActiveStyles
          key={project.projectId}
          alwaysVisibleComponent={
            <ProjectCard
              projectName={project.projectName}
              authorName={project.authorName}
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
