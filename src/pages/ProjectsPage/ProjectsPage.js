import React, { useCallback, useEffect, useState } from "react";
import "./ProjectsPage.css";

import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../../store/slices/projectsSlice";

import CreateProjectForm from "../../components/CreateProjectForm/CreateProjectForm";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import Page from "../../components/Page/Page";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import ExpandableComponent from "../../components/ExpandableComponent/ExpandableComponent";

const ProjectsPage = () => {
  const { projects, projectsLoaded } = useSelector((state) => state.projects);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const loadProjects = useCallback(async () => {
    if (projects.length === 0 && !projectsLoaded) {
      await dispatch(getProjects()).unwrap();
    }
    setLoading(false);
  }, [dispatch, projects.length, projectsLoaded]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <Page title="Your Projects">
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
          componentToBeExpanded={<div>ELO</div>}
        />
      ))}
    </Page>
  );
};

export default ProjectsPage;
