import React from "react";
import "./HighlightedProject.css";

import constants from "../../utils/constants";

import ProjectElement from "../ProjectElement/ProjectElement";

const HighlightedProject = ({ project, handleOpenModal }) => {
  return (
    <div className="highlighted-project">
      <h5>{constants.highlightedProject}</h5>
      <ProjectElement
        project={project}
        handleAddTaskToProject={handleOpenModal}
        border
        headerColor="primary"
        initiallyExpanded
      />
    </div>
  );
};

export default HighlightedProject;
