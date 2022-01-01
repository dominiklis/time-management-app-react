import React, { useState } from "react";
import "./UserListItem.css";

import { useSelector } from "react-redux";
import { IconContext } from "react-icons/lib";
import { FiEdit2, FiUser, FiTrash2, FiX } from "react-icons/fi";

import IconButton from "../IconButton/IconButton";
import ShareForm from "../ShareForm/ShareForm";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

const TaskUserCard = ({
  authorId,
  canLoggedUserChangePermissions,
  userId,
  userName,
  canShare,
  canEdit,
  canChangePermissions,
  canDelete,
  handleEdit,
  editLoading,
  handleDelete,
}) => {
  const { user } = useSelector((state) => state.users);

  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleEditButton = () => setEditing(true);

  const handleEndEditingButton = () => setEditing(false);

  const handleEditSubmit = async (values) => {
    await handleEdit({ ...values, userId });
    setEditing(false);
  };

  const handleDeleteButton = () => {
    setDeleting(true);
    handleDelete(userId);
  };

  return (
    <li className="task-user-card">
      <div className="task-user-card__user-name">
        {editing ? (
          <ShareForm
            canChangePermissions
            editing
            buttonText="save"
            header={`${userName} - editing access`}
            userName={userName}
            userCanShare={canShare}
            userCanEdit={canEdit}
            userCanChangePermissions={canChangePermissions}
            userCanDelete={canDelete}
            onSubmit={handleEditSubmit}
            loading={editLoading}
          />
        ) : (
          <>
            <IconContext.Provider
              value={{ className: "task-user-card__user-icons" }}
            >
              <FiUser />
            </IconContext.Provider>
            {userName}
          </>
        )}
      </div>
      <div className="task-user-card__actions">
        {editing ? (
          <IconButton
            className={"task-user-card__close-button"}
            onClick={handleEndEditingButton}
          >
            <FiX />
          </IconButton>
        ) : (
          <>
            <IconButton
              disabled={
                !canLoggedUserChangePermissions ||
                userId === authorId ||
                deleting ||
                userId === user.id
              }
              onClick={handleEditButton}
            >
              <FiEdit2 />
            </IconButton>

            {deleting ? (
              <IconButton disabled={true}>
                <LoadingIndicator size="small" />
              </IconButton>
            ) : (
              <IconButton
                disabled={
                  !canLoggedUserChangePermissions || userId === authorId
                }
                onClick={handleDeleteButton}
              >
                <FiTrash2 />
              </IconButton>
            )}
          </>
        )}
      </div>
    </li>
  );
};

export default TaskUserCard;
