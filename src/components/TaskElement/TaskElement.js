import React, { useState } from "react";
import "./TaskElement.css";

import TaskCard from "../TaskCard/TaskCard";
import TaskDetails from "../TaskDetails/TaskDetails";
import ExpandableComponent from "../ExpandableComponent/ExpandableComponent";
import EditTask from "../EditTask/EditTask";
import { getTimeInput } from "../../utils/getTimeInput";
import { getDateInput } from "../../utils/getDateInput";
import useIsMounted from "../../hooks/useIsMounted";

const TaskElement = ({
  task,
  border,
  alwaysExpanded,
  useCompletedDateInCard,
  hideCompletedDateInDetails,
}) => {
  const isMounted = useIsMounted();

  const [editingState, setEditingState] = useState({
    editing: false,
    returnedFromEditing: false,
  });

  const atTheEndOfEdition = () => {
    if (isMounted)
      setEditingState({ editing: false, returnedFromEditing: true });
  };

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
          taskId={task.taskId}
          taskName={task.taskName}
          taskDescription={task.taskDescription ? task.taskDescription : ""}
          startDate={task.startDate ? getDateInput(task.startDate) : ""}
          endDate={task.endDate ? getDateInput(task.endDate) : ""}
          startTime={task.startTime ? getTimeInput(task.startDate) : ""}
          endTime={task.endTime ? getTimeInput(task.endDate) : ""}
          taskCompleted={task.taskCompleted}
          projectId={task.projectId}
          priority={task.priority}
        />
      ) : (
        <ExpandableComponent
          initiallyExpanded={editingState.returnedFromEditing}
          alwaysExpanded={alwaysExpanded}
          passOnClickHandler
          alwaysVisibleComponent={
            <TaskCard
              defaultCursor={alwaysExpanded}
              task={task}
              useCompletedDate={useCompletedDateInCard}
            />
          }
          componentToBeExpanded={
            <TaskDetails
              handleEditButton={handleEditButton}
              task={task}
              showDateToComplete={useCompletedDateInCard}
              hideCompltedDate={hideCompletedDateInDetails}
            />
          }
        />
      )}
    </div>
  );
};

export default TaskElement;
