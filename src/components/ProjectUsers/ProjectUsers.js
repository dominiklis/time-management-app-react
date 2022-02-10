import React, { useState } from "react";
import "./ProjectUsers.css";

import {
  deleteSharing,
  editSharing,
  shareProject,
} from "../../store/slices/projectsSlice";
import { useDispatch, useSelector } from "react-redux";
import { determineLogin } from "../../utils/determineLogin";

import ShareForm from "../ShareForm/ShareForm";
import UserListItem from "../UserListItem/UserListItem";
import List from "../List/List";

const ProjectUsers = ({
  projectId,
  authorId,
  users,
  canShare,
  canChangePermissions,
}) => {
  const dispatch = useDispatch();

  const {
    loadings: {
      sharing: { create: shareProjectLoading, edit: editShareLoading },
    },
    errors: {
      sharing: { create: shareProjectError },
    },
  } = useSelector((state) => state.projects);

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
    } else await dispatch(shareProject({ ...formInputs, projectId }));

    setFormSubmitted(true);
  };

  const handleEdit = async (values) => {
    if (!values.canShare) values.canShare = false;
    if (!values.canChangePermissions) values.canChangePermissions = false;
    if (!values.canEdit) values.canEdit = false;
    if (!values.canDelete) values.canDelete = false;

    await dispatch(editSharing({ ...values, projectId }));
  };

  const handleDelete = async (userId) => {
    await dispatch(deleteSharing({ projectId, userId }));
  };

  return (
    <div className="project-users">
      {canShare && (
        <ShareForm
          showError={formSubmitted}
          canChangePermissions={canChangePermissions}
          error={shareProjectError}
          onSubmit={handleShareSubmit}
          loading={shareProjectLoading}
        />
      )}
      <h6 className="project-users__header">
        users with access to this project: {users?.length || 0}
      </h6>
      <List>
        {users?.map((u) => (
          <UserListItem
            key={u.userId}
            authorId={authorId}
            canLoggedUserChangePermissions={canChangePermissions}
            {...u}
            handleEdit={handleEdit}
            editLoading={editShareLoading}
            handleDelete={handleDelete}
          />
        ))}
      </List>
    </div>
  );
};

export default ProjectUsers;
