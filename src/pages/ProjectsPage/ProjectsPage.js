import React, { useEffect, useState } from "react";
import "./ProjectsPage.css";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import CreateProjectForm from "../../components/CreateProjectForm/CreateProjectForm";
import Page from "../../components/Page/Page";
import ProjectElement from "../../components/ProjectElement/ProjectElement";
import Modal from "../../components/Modal/Modal";
import CreateTaskForm from "../../components/CreateTaskForm/CreateTaskForm";
import HighlightedProject from "../../components/HighlightedProject/HighlightedProject";
import List from "../../components/List/List";

const ProjectsPage = () => {
  let { projectId } = useParams();

  const [modalState, setModalState] = useState({
    projectId: null,
    showModal: false,
  });

  const handleOpenModal = (projectId) =>
    setModalState({ projectId, showModal: true });

  const handleClose = () =>
    setModalState({ projectId: null, showModal: false });

  const { projects, projectsLoaded } = useSelector((state) => state.projects);

  return (
    <Page title="Your Projects" loadingPage={!projectsLoaded}>
      {modalState.showModal && (
        <Modal
          handleClose={handleClose}
          modalOpen={modalState.showModal && modalState.projectId}
          modalTitle="Add task to project"
        >
          <CreateTaskForm
            afterSubmit={handleClose}
            projectId={modalState.projectId}
          />
        </Modal>
      )}
      <CreateProjectForm />

      {projectId && (
        <HighlightedProject
          project={projects.find((p) => p.projectId === projectId)}
          handleAddTaskToProject={handleOpenModal}
        />
      )}

      <List className="projects__list">
        {projects
          .filter((p) => {
            if (projectId && p.projectId === projectId) return false;

            return true;
          })
          .map((project) => (
            <li key={project.projectId}>
              <ProjectElement
                project={project}
                handleAddTaskToProject={handleOpenModal}
              />
            </li>
          ))}
      </List>
    </Page>
  );
};

export default ProjectsPage;
