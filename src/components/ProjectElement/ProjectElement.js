import React, { useState } from "react";
import "./ProjectElement.css";

import ExpandableComponent from "../ExpandableComponent/ExpandableComponent";
import ProjectCard from "../ProjectCard/ProjectCard";
import ProjectDetails from "../ProjectDetails/ProjectDetails";
import EditProjectForm from "../EditProjectForm/EditProjectForm";

const ProjectElement = ({
  authorEmail,
  authorId,
  authorName,
  canChangePermissions,
  canDelete,
  canEdit,
  canShare,
  createdAt,
  projectDescription,
  projectId,
  projectName,
}) => {
  const [editProject, setEditProject] = useState(false);

  const toggleEditProject = () => setEditProject((prev) => !prev);

  return (
    <div className="project-element">
      {editProject ? (
        <EditProjectForm
          projectId={projectId}
          setEditProject={setEditProject}
          projectName={projectName}
          projectDescription={projectDescription}
          canChangePermissions={canChangePermissions}
          canDelete={canDelete}
          canEdit={canEdit}
          canShare={canShare}
        />
      ) : (
        <ExpandableComponent
          hoverActiveStyles
          key={projectId}
          alwaysVisibleComponent={
            <ProjectCard projectName={projectName} authorName={authorName} />
          }
          componentToBeExpanded={
            <ProjectDetails
              toggleEditProject={toggleEditProject}
              projectId={projectId}
              authorName={authorName}
              createdAt={createdAt}
              projectDescription={projectDescription}
              canChangePermissions={canChangePermissions}
              canDelete={canDelete}
              canEdit={canEdit}
              canShare={canShare}
            />
          }
        />
      )}
    </div>
  );
};

export default ProjectElement;
