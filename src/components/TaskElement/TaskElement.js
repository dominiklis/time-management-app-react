import React, { useState } from "react";
import "./TaskElement.css";

import TaskCard from "../TaskCard/TaskCard";
import TaskDetails from "../TaskDetails/TaskDetails";
import ExpandableComponent from "../ExpandableComponent/ExpandableComponent";
import EditTask from "../EditTask/EditTask";

const TaskElement = ({ task, border, alwaysExpanded }) => {
  const [editingState, setEditingState] = useState({
    editing: false,
    returnedFromEditing: false,
  });

  const atTheEndOfEdition = () =>
    setEditingState({ editing: false, returnedFromEditing: true });

  const handleEditButton = () =>
    setEditingState((prev) => ({ ...prev, editing: true }));

  const getStyles = () => {
    let cln = "task-element";

    if (border) cln += " task-element--bordered";

    return cln;
  };

  return (
    <div className={getStyles()}>
      {editingState.editing ? (
        <EditTask
          atTheEndOfEdition={atTheEndOfEdition}
          disableDeleteButton={!task.canDelete}
          {...task}
        />
      ) : (
        <ExpandableComponent
          initiallyExpanded={editingState.returnedFromEditing}
          alwaysExpanded={alwaysExpanded}
          passOnClickHandler
          alwaysVisibleComponent={
            <TaskCard defaultCursor={alwaysExpanded} task={task} />
          }
          componentToBeExpanded={
            <TaskDetails handleEditButton={handleEditButton} task={task} />
          }
        />
      )}
    </div>
  );
};

export default TaskElement;
