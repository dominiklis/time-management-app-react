import React, { useState } from "react";
import "./TaskSteps.css";

import { useDispatch, useSelector } from "react-redux";
import { addStep, reorganizeStepsOrder } from "../../store/slices/tasksSlice";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FiMove } from "react-icons/fi";
import { IconContext } from "react-icons/lib";

import StepCard from "../StepCard/StepCard";
import StepTextForm from "../StepTextForm/StepTextForm";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

const TaskSteps = ({ taskId, steps, canEdit }) => {
  const dispatch = useDispatch();

  const {
    loadings: {
      steps: { addStep: addStepLoading },
    },
  } = useSelector((state) => state.tasks);

  const [stepText, setStepText] = useState("");
  const [waitingForResponse, setWaitingForResponse] = useState(false);

  const handleStepTextChange = (e) => {
    setStepText(e.target.value);
  };

  const handleStepSubmit = async (e) => {
    e.preventDefault();

    await dispatch(
      addStep({
        taskId,
        stepText,
        position: steps?.length || 0,
        stepCompleted: false,
      })
    );

    setStepText("");
  };

  const assignStepsOrder = (stepsArray) =>
    stepsArray.map((s, index) => ({
      ...s,
      position: index,
    }));

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    let stepsInNewOrder = [...steps].sort((a, b) => a.position - b.position);
    const [reorderedStep] = stepsInNewOrder.splice(result.source.index, 1);
    stepsInNewOrder.splice(result.destination.index, 0, reorderedStep);

    stepsInNewOrder = assignStepsOrder(stepsInNewOrder);

    setWaitingForResponse(true);

    await dispatch(reorganizeStepsOrder({ taskId, steps: stepsInNewOrder }));

    setWaitingForResponse(false);
  };

  const handleStepsOrderAfterDeleting = async (stepId) => {
    const stepsInNewOrder = assignStepsOrder(
      steps.filter((s) => s.stepId !== stepId)
    );

    await dispatch(reorganizeStepsOrder({ taskId, steps: stepsInNewOrder }));
  };

  const getStyle = () => {
    let cln = "task-steps";

    if (waitingForResponse) cln += " task-steps--waiting";

    return cln;
  };

  return (
    <div className={getStyle()}>
      <div className="task-steps__loading">
        <LoadingIndicator />
      </div>
      {steps?.length > 0 && (
        <div className="task-steps__header">
          <h4>steps:</h4>
          <span className="task-steps__completed">
            {steps.filter((step) => step.stepCompleted).length}/{steps.length}
          </span>
        </div>
      )}
      <DragDropContext
        // onBeforeCapture={}
        // onBeforeDragStart={}
        // onDragStart={}
        // onDragUpdate={}
        onDragEnd={handleDragEnd}
      >
        <Droppable droppableId={`droppable-${taskId}`}>
          {(provided) => (
            <ul
              className="task-steps__list"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {steps
                ?.slice()
                .sort((a, b) => a.position - b.position)
                .map((step, index) => (
                  <Draggable
                    key={step.stepId}
                    draggableId={step.stepId}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <li
                        className={`task-steps__list-item${
                          snapshot.isDragging
                            ? " task-steps__list-item--dragging"
                            : ""
                        }`}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
                        <div
                          className="task-steps__drag-handle"
                          {...provided.dragHandleProps}
                        >
                          <IconContext.Provider
                            value={{ className: "task-steps__drag-icon" }}
                          >
                            <FiMove />
                          </IconContext.Provider>
                        </div>
                        <StepCard
                          index={index + 1}
                          {...step}
                          canEdit={canEdit}
                          onDelete={handleStepsOrderAfterDeleting}
                        />
                      </li>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      {canEdit && (
        <div className="task-steps__add-steps">
          <h5>add new step</h5>
          <StepTextForm
            onSubmit={handleStepSubmit}
            value={stepText}
            onChange={handleStepTextChange}
            loading={addStepLoading}
            buttonText="add"
            buttonColor="primary"
          />
        </div>
      )}
    </div>
  );
};

export default TaskSteps;
