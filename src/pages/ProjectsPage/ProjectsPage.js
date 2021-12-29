import React from "react";
import "./ProjectsPage.css";

import { useSelector } from "react-redux";

import CreateProjectForm from "../../components/CreateProjectForm/CreateProjectForm";
import Page from "../../components/Page/Page";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import ExpandableComponent from "../../components/ExpandableComponent/ExpandableComponent";

const ProjectsPage = () => {
  const { projects, projectsLoaded } = useSelector((state) => state.projects);

  return (
    <Page title="Your Projects" loadingPage={!projectsLoaded}>
      <CreateProjectForm />

      {projects.map((project) => (
        <ExpandableComponent
          hoverActiveStyles
          key={project.projectId}
          alwaysVisibleComponent={
            <ProjectCard
              projectName={project.projectName}
              authorName={project.authorName}
            />
          }
          componentToBeExpanded={<div>project details</div>}
        />
      ))}
    </Page>
  );
};

export default ProjectsPage;
