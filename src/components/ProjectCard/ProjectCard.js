import React from "react";
import "./ProjectCard.css";

const ProjectCard = ({ authorName, projectName }) => {
  return (
    <div className="project-card">
      <div className="project-card__name">{projectName}</div>
      <div className="project-card__author">{authorName}</div>
    </div>
  );
};

export default ProjectCard;
