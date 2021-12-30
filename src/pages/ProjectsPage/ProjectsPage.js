import React, { useState } from "react";
import "./ProjectsPage.css";

import { useSelector } from "react-redux";

import CreateProjectForm from "../../components/CreateProjectForm/CreateProjectForm";
import Page from "../../components/Page/Page";
import ProjectElement from "../../components/ProjectElement/ProjectElement";
import Modal from "../../components/Modal/Modal";
import CreateTaskForm from "../../components/CreateTaskForm/CreateTaskForm";

const ProjectsPage = () => {
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

      {projects.map((project) => (
        <ProjectElement
          key={project.projectId}
          {...project}
          handleAddTaskToProject={handleOpenModal}
        />
      ))}
    </Page>
  );
};

export default ProjectsPage;
