import React, { useMemo, useState } from "react";
import "./Home.css";

import { useSelector } from "react-redux";
import { tasksForToday } from "../../utils/filterTasks";
import constants from "../../utils/constants";
import {
  createSelectTasksWithDateAndStartTime,
  createSelectTasksWithDateOnly,
} from "../../utils/selectors";

import Page from "../../components/Page/Page";
import TaskElement from "../../components/TaskElement/TaskElement";
import CreateTaskForm from "../../components/CreateTaskForm/CreateTaskForm";
import Modal from "../../components/Modal/Modal";
import FloatingButton from "../../components/FloatingButton/FloatingButton";

const Home = () => {
  const { tasks, tasksLoaded } = useSelector((state) => state.tasks);

  const selectTasksWithDateAndStartTime = useMemo(
    createSelectTasksWithDateAndStartTime,
    []
  );

  const selectTasksWithDateOnly = useMemo(createSelectTasksWithDateOnly, []);

  const tasksWithDateAndStartTime = useSelector((state) =>
    selectTasksWithDateAndStartTime(state, true)
  );

  const tasksWithDateOnly = useSelector((state) =>
    selectTasksWithDateOnly(state)
  );

  const [showModal, setShowModal] = useState(false);

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
          {tasks.length === 0 && tasksLoaded ? (
            <p>{constants.pageTexts.addFirstTask}</p>
          ) : (
            <>
              <div className="today-page">
                {tasksForToday(tasksWithDateAndStartTime).map((task) => (
                  <TaskElement key={task.taskId} task={task} />
                ))}
              </div>
              <h3>also to be done today</h3>
              <div className="today-page">
                {tasksForToday(tasksWithDateOnly).map((task) => (
                  <TaskElement key={task.taskId} task={task} />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </Page>
  );
};

export default Home;
