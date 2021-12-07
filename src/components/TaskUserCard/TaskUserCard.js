import React, { useState } from "react";
import "./TaskUserCard.css";

import { IconContext } from "react-icons/lib";
import { FiEdit2, FiUser, FiTrash2, FiX } from "react-icons/fi";
import IconButton from "../IconButton/IconButton";

import ShareTaskForm from "../ShareTaskForm/ShareTaskForm";
import { editSharing } from "../../store/slices/tasksSlice";
import { useDispatch, useSelector } from "react-redux";

const TaskUserCard = ({
  taskId,
  authorId,
  canLoggedUserChangePermissions,
  userId,
  userName,
  canShare,
  canEdit,
  canChangePermissions,
  canDelete,
}) => {
  const dispatch = useDispatch();
  const {
    loadings: {
      sharing: { editingSharing: editingSharingLoading },
    },
  } = useSelector((state) => state.tasks);

  const [editing, setEditing] = useState(false);

  const handleEditButton = () => setEditing((prev) => !prev);

  const handleEditShareSubmit = async (formInputs) => {
    if (!formInputs.canShare) formInputs.canShare = false;
    if (!formInputs.canChangePermissions)
      formInputs.canChangePermissions = false;
    if (!formInputs.canEdit) formInputs.canEdit = false;
    if (!formInputs.canDelete) formInputs.canDelete = false;

    formInputs.taskId = taskId;
    formInputs.userId = userId;

    await dispatch(editSharing(formInputs));
    setEditing(false);
  };

  const handleDeleteButton = () => {
    console.log("delete");
  };

  return (
    <div className="task-user-card">
      <div className="task-user-card__user-name">
        {editing ? (
          <ShareTaskForm
            canChangePermissions
            editing
            buttonText="save"
            header={`${userName} - editing access`}
            userCanShare={canShare}
            userCanEdit={canEdit}
            userCanChangePermissions={canChangePermissions}
            userCanDelete={canDelete}
            onSubmit={handleEditShareSubmit}
            loading={editingSharingLoading}
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
          <IconButton onClick={handleEditButton}>
            <FiX />
          </IconButton>
        ) : (
          <>
            <IconButton
              disabled={!canLoggedUserChangePermissions || userId === authorId}
              onClick={handleEditButton}
            >
              <FiEdit2 />
            </IconButton>
            <IconButton
              disabled={!canLoggedUserChangePermissions || userId === authorId}
              onClick={handleDeleteButton}
            >
              <FiTrash2 />
            </IconButton>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskUserCard;
