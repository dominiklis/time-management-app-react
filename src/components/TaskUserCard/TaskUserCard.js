import React from "react";
import "./TaskUserCard.css";

const TaskUserCard = ({
  userId,
  userName,
  canShare,
  canEdit,
  canChangePermissions,
  canDelete,
}) => {
  return <div>- {userName}</div>;
};

export default TaskUserCard;
