import React from "react";
import "./TaskUsers.css";

import { useDispatch } from "react-redux";
import { shareTask } from "../../store/slices/tasksSlice";

import ShareTaskForm from "../ShareTaskForm/ShareTaskForm";
import TaskUserCard from "../TaskUserCard/TaskUserCard";

const TaskUsers = ({ taskId, users, canShare, canChangePermissions }) => {
  const dispatch = useDispatch();

  const handleNewShareSubmit = async (formInputs) => {
    await dispatch(shareTask(formInputs));
  };

  return (
    <div className="task-users">
      {canShare && (
        <ShareTaskForm
          taskId={taskId}
          canChangePermissions={canChangePermissions}
          onSubmit={handleNewShareSubmit}
        />
      )}
      users with access to this task: {users.length}
      {users.map((user) => (
        <TaskUserCard key={user.userId} {...user} />
      ))}
    </div>
  );
};

export default TaskUsers;
