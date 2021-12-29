import React, { useState } from "react";
import "./ProjectElement.css";

import ExpandableComponent from "../ExpandableComponent/ExpandableComponent";
import ProjectCard from "../ProjectCard/ProjectCard";
import ProjectDetails from "../ProjectDetails/ProjectDetails";

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

  return (
    <div className="project-element">
      {editProject ? (
        <div>editing project </div>
      ) : (
        <ExpandableComponent
          hoverActiveStyles
          key={projectId}
          alwaysVisibleComponent={
            <ProjectCard projectName={projectName} authorName={authorName} />
          }
          componentToBeExpanded={
            <ProjectDetails
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
