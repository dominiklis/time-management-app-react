import React, { useState } from "react";
import "./Home.css";

import { useSelector } from "react-redux";
import {
  filterByPriority,
  overdueTasks,
  tasksForToday,
  tasksWithoutDate,
} from "../../utils/filterTasks";
import constants from "../../utils/constants";

import Accordion from "../../components/Accordion/Accordion";
import Page from "../../components/Page/Page";
import TaskElement from "../../components/TaskElement/TaskElement";
import CreateTaskForm from "../../components/CreateTaskForm/CreateTaskForm";
import Modal from "../../components/Modal/Modal";
import FloatingButton from "../../components/FloatingButton/FloatingButton";
import SearchAndFilterHeader from "../../components/SearchAndFilterHeader/SearchAndFilterHeader";

const Home = () => {
  const { tasks, tasksLoaded } = useSelector((state) => state.tasks);

  const [showModal, setShowModal] = useState(false);
  const [priority, setPriority] = useState([]);

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);

  return (
    <Page title={constants.pageTitles.home} loadingPage={!tasksLoaded}>
      {showModal && (
        <Modal
          modalTitle={constants.modalTitles.createTask}
          modalOpen={showModal}
          handleClose={handleClose}
        >
          <CreateTaskForm
            afterSubmit={handleClose}
            verticalMargin
            centerButton
          />
        </Modal>
      )}
      <FloatingButton onClick={handleOpenModal} />

      {tasks.length === 0 && tasksLoaded ? (
        <p>{constants.pageTexts.addFirstTask}</p>
      ) : (
        <div className="home-page">
          <SearchAndFilterHeader
            priority={priority}
            setPriority={setPriority}
          />

          <Accordion
            header={`Today (${tasksForToday(tasks).length})`}
            color="primary"
            open
          >
            {filterByPriority(tasksForToday(tasks), priority).map((task) => (
              <TaskElement key={task.taskId} task={task} />
            ))}
          </Accordion>

          <Accordion
            header={`Overdue (${overdueTasks(tasks).length})`}
            color="warning"
          >
            {filterByPriority(overdueTasks(tasks), priority).map((task) => (
              <TaskElement key={task.taskId} task={task} />
            ))}
          </Accordion>

          <Accordion header={`No date (${tasksWithoutDate(tasks).length})`}>
            {filterByPriority(tasksWithoutDate(tasks), priority).map((task) => (
              <TaskElement key={task.taskId} task={task} />
            ))}
          </Accordion>
        </div>
      )}
    </Page>
  );
};

export default Home;
