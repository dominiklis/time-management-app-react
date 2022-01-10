import React, { useState } from "react";
import "./BrowsePage.css";

import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import constants from "../../utils/constants";

import CreateTaskForm from "../../components/CreateTaskForm/CreateTaskForm";
import FloatingButton from "../../components/FloatingButton/FloatingButton";
import Modal from "../../components/Modal/Modal";
import Page from "../../components/Page/Page";
import AppLink from "../../components/Link/AppLink";

const BrowsePage = () => {
  const { tasksLoaded } = useSelector((state) => state.tasks);

  const [showModal, setShowModal] = useState(false);

  const [browseTasksPageTitle, setBrowseTasksPageTitle] = useState({
    leftButton: { text: "archive", to: "archive" },
    rightButton: { text: "monthly", to: "month" },
    header: "today",
  });

  const handleOpenModal = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <Page title={constants.pageTitles.browseTasks} loadingPage={!tasksLoaded}>
      {showModal && (
        <Modal
          modalOpen={showModal}
          handleClose={handleClose}
          modalTitle={constants.modalTitles.createTask}
        >
          <CreateTaskForm afterSubmit={handleClose} />
        </Modal>
      )}

      <div className="browse-page__navigation">
        <AppLink to={browseTasksPageTitle.leftButton.to}>
          {browseTasksPageTitle.leftButton.text}
        </AppLink>
        <h2>{browseTasksPageTitle.header}</h2>
        <AppLink to={browseTasksPageTitle.rightButton.to}>
          {browseTasksPageTitle.rightButton.text}
        </AppLink>
      </div>

      <Outlet context={setBrowseTasksPageTitle} />
      <FloatingButton onClick={handleOpenModal} />
    </Page>
  );
};

export default BrowsePage;
