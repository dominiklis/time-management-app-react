import React from "react";
import "./TaskElement.css";

import TaskCard from "../TaskCard/TaskCard";
import TaskDetails from "../TaskDetails/TaskDetails";
import ExpandableComponent from "../ExpandableComponent/ExpandableComponent";

const TaskElement = ({ task }) => {
  return (
    <ExpandableComponent
      passOnClickHandler
      alwaysVisibleComponent={<TaskCard {...task} />}
      componentToBeExpanded={<TaskDetails {...task} />}
    />
  );
};

export default TaskElement;
