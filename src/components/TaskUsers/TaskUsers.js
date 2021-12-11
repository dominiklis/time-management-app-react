import React, { useState } from "react";
import "./TaskUsers.css";

import { useDispatch, useSelector } from "react-redux";
import { shareTask } from "../../store/slices/tasksSlice";

import ShareTaskForm from "../ShareTaskForm/ShareTaskForm";
import TaskUserCard from "../TaskUserCard/TaskUserCard";

const TaskUsers = ({
  authorId,
  taskId,
  users,
  canShare,
  canChangePermissions,
}) => {
  const dispatch = useDispatch();

  const {
    errors: {
      sharing: { sharingTask: sharingTaskError },
    },
  } = useSelector((state) => state.tasks);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleNewShareSubmit = async (formInputs) => {
    setFormSubmitted(false);
    await dispatch(shareTask(formInputs));
    setFormSubmitted(true);
  };

  return (
    <div className="task-users">
      {/* {formSubmitted && <div>TEST</div>} */}
      {canShare && (
        <ShareTaskForm
          error={sharingTaskError}
          showError={formSubmitted}
          taskId={taskId}
          canChangePermissions={canChangePermissions}
          onSubmit={handleNewShareSubmit}
        />
      )}
      users with access to this task: {users.length}
      {users.map((user) => (
        <TaskUserCard
          taskId={taskId}
          authorId={authorId}
          canLoggedUserChangePermissions={canChangePermissions}
          key={user.userId}
          {...user}
        />
      ))}
    </div>
  );
};

export default TaskUsers;
