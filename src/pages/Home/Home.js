import React, { useState } from "react";
import "./Home.css";

import { useSelector } from "react-redux";
import {
  filterByPriority,
  overdueTasks,
  tasksForToday,
  tasksWithoutDate,
} from "../../utils/filterTasks";

import Accordion from "../../components/Accordion/Accordion";
import Page from "../../components/Page/Page";
import TaskElement from "../../components/TaskElement/TaskElement";
import CreateTaskForm from "../../components/CreateTaskForm/CreateTaskForm";
import Modal from "../../components/Modal/Modal";
import FloatingButton from "../../components/FloatingButton/FloatingButton";
import SearchForm from "../../components/SearchForm/SearchForm";
import PriorityFilter from "../../components/PriorityFilter/PriorityFilter";

const Home = () => {
  const { tasks, tasksLoaded } = useSelector((state) => state.tasks);

  const [showModal, setShowModal] = useState(false);
  const [priority, setPriority] = useState([]);

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);

  return (
    <Page title="Tasks For Today" loadingPage={!tasksLoaded}>
      {showModal && (
        <Modal
          modalTitle="Create Task"
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
        <p>Add your first task.</p>
      ) : (
        <>
          <SearchForm />
          <PriorityFilter selected={priority} setSelected={setPriority} />

          <div className="home-page">
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
              {filterByPriority(tasksWithoutDate(tasks), priority).map(
                (task) => (
                  <TaskElement key={task.taskId} task={task} />
                )
              )}
            </Accordion>
          </div>
        </>
      )}
    </Page>
  );
};

export default Home;
