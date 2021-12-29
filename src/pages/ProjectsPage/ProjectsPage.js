import React from "react";
import "./ProjectsPage.css";

import { useSelector } from "react-redux";

import CreateProjectForm from "../../components/CreateProjectForm/CreateProjectForm";
import Page from "../../components/Page/Page";
import ProjectElement from "../../components/ProjectElement/ProjectElement";

const ProjectsPage = () => {
  const { projects, projectsLoaded } = useSelector((state) => state.projects);

  return (
    <Page title="Your Projects" loadingPage={!projectsLoaded}>
      <CreateProjectForm />

      {projects.map((project) => (
        <ProjectElement key={project.projectId} {...project} />
      ))}
    </Page>
  );
};

export default ProjectsPage;
