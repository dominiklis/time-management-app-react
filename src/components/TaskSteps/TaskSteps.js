import React, { useState } from "react";
import "./TaskSteps.css";

import { useDispatch, useSelector } from "react-redux";
import { addStep } from "../../store/slices/tasksSlice";

import StepCard from "../StepCard/StepCard";
import StepTextForm from "../StepTextForm/StepTextForm";

const TaskSteps = ({ taskId, steps, canEdit }) => {
  const dispatch = useDispatch();

  const {
    loadings: {
      steps: { addStep: addStepLoading },
    },
  } = useSelector((state) => state.tasks);

  const [stepText, setStepText] = useState("");

  const handleStepTextChange = (e) => {
    setStepText(e.target.value);
  };

  const handleStepSubmit = async (e) => {
    e.preventDefault();

    await dispatch(addStep({ taskId, stepText }));

    setStepText("");
  };

  return (
    <div className="task-steps">
      {steps?.length > 0 && (
        <div className="task-steps__header">
          <h4>steps:</h4>
          <span className="task-steps__completed">
            {steps.filter((step) => step.stepCompleted).length}/{steps.length}
          </span>
        </div>
      )}
      {steps?.map((step, index) => (
        <StepCard
          key={step.stepId}
          index={index + 1}
          {...step}
          canEdit={canEdit}
        />
      ))}
      {canEdit && (
        <div className="task-steps__add-steps">
          <h5>add new step</h5>
          <StepTextForm
            onSubmit={handleStepSubmit}
            value={stepText}
            onChange={handleStepTextChange}
            loading={addStepLoading}
            buttonText="add"
            buttonColor="secondary"
          />
        </div>
      )}
    </div>
  );
};

export default TaskSteps;
