import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateProjectForm from "../../components/CreateProjectForm/CreateProjectForm";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import Page from "../../components/Page/Page";
import { getProjects } from "../../store/slices/projectsSlice";
import "./ProjectsPage.css";

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

      <h4>your projects:</h4>
      {projects.map((project) => (
        <div>{project.projectName}</div>
      ))}
    </Page>
  );
};

export default ProjectsPage;
