import React, { useState } from "react";
import "./TaskUsers.css";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteSharing,
  editSharing,
  shareTask,
} from "../../store/slices/tasksSlice";

import ShareForm from "../ShareForm/ShareForm";
import UserListItem from "../UserListItem/UserListItem";
import List from "../List/List";
import { determineLogin } from "../../utils/determineLogin";

const TaskUsers = ({
  authorId,
  taskId,
  users,
  canShare,
  canChangePermissions,
}) => {
  const dispatch = useDispatch();

  const {
    loadings: {
      sharing: {
        sharingTask: sharingTaskLoading,
        editingSharing: editingSharingLoading,
      },
    },
    errors: {
      sharing: { sharingTask: sharingTaskError },
    },
  } = useSelector((state) => state.tasks);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleShareSubmit = async (formInputs) => {
    setFormSubmitted(false);

    const { userName, userEmail, userId } = determineLogin(formInputs.login);

    const [userWithAccess] = users.filter(
      (u) =>
        u.userName === userName ||
        u.userEmail === userEmail ||
        u.userId === userId
    );

    if (userWithAccess) {
      await handleEdit({ ...formInputs, userId: userWithAccess.userId });
    } else await dispatch(shareTask({ ...formInputs, taskId }));

    setFormSubmitted(true);
  };

  const handleEdit = async (values) => {
    if (!values.canShare) values.canShare = false;
    if (!values.canChangePermissions) values.canChangePermissions = false;
    if (!values.canEdit) values.canEdit = false;
    if (!values.canDelete) values.canDelete = false;

    await dispatch(editSharing({ ...values, taskId }));
  };

  const handleDelete = async (userId) => {
    await dispatch(deleteSharing({ taskId, userId }));
  };

  return (
    <div className="task-users">
      {canShare && (
        <ShareForm
          showError={formSubmitted}
          canChangePermissions={canChangePermissions}
          error={sharingTaskError}
          onSubmit={handleShareSubmit}
          loading={sharingTaskLoading}
        />
      )}
      <h6 className="task-users__header">
        users with access to this task: {users.length}
      </h6>
      <List>
        {users.map((u) => (
          <UserListItem
            key={u.userId}
            authorId={authorId}
            canLoggedUserChangePermissions={canChangePermissions}
            {...u}
            handleEdit={handleEdit}
            editLoading={editingSharingLoading}
            handleDelete={handleDelete}
          />
        ))}
      </List>
    </div>
  );
};

export default TaskUsers;
