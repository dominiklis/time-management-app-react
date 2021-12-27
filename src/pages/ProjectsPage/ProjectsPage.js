import React, { useCallback, useEffect, useState } from "react";
import "./ProjectsPage.css";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProjects } from "../../store/slices/projectsSlice";

import CreateProjectForm from "../../components/CreateProjectForm/CreateProjectForm";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import Page from "../../components/Page/Page";
import ProjectCard from "../../components/ProjectCard/ProjectCard";

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
        <Link
          className="projects__link"
          to={`/projects/${project.projectId}`}
          key={project.projectId}
        >
          <ProjectCard
            projectName={project.projectName}
            authorName={project.authorName}
          />
        </Link>
      ))}
    </Page>
  );
};

export default ProjectsPage;
