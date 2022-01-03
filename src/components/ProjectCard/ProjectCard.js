import React from "react";
import "./ProjectCard.css";

const ProjectCard = ({ authorName, projectName, color }) => {
  const getNameStyle = () => {
    let cln = "project-card__name";

    if (color === "primary") cln += " project-card__name--primary";

    return cln;
  };

  return (
    <div className="project-card">
      <div className={getNameStyle()}>{projectName}</div>
      <div className="project-card__author">{authorName}</div>
    </div>
  );
};

export default ProjectCard;
