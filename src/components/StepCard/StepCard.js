import React, { useState } from "react";
import "./StepCard.css";

import { useDispatch, useSelector } from "react-redux";
import { FiEdit2, FiX, FiTrash2 } from "react-icons/fi";
import { deleteStep, updateStep } from "../../store/slices/tasksSlice";

import CheckButton from "../CheckButton/CheckButton";
import IconButton from "../IconButton/IconButton";
import StepTextForm from "../StepTextForm/StepTextForm";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

const Step = ({
  stepId,
  taskId,
  canEdit,
  index,
  stepText,
  stepCompleted,
  position,
  onDelete,
}) => {
  const dispatch = useDispatch();

  const {
    loadings: {
      steps: { updateStep: updateStepLoading },
    },
  } = useSelector((state) => state.tasks);

  const [editing, setEditing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [stepTextInput, setStepTextInput] = useState(stepText);

  const handleStepTextChange = (e) => setStepTextInput(e.target.value);

  const toggleEdit = () => {
    setEditing((prev) => !prev);
  };

  const handleSubmitEditing = async (e) => {
    e.preventDefault();

    await dispatch(
      updateStep({
        stepId,
        taskId,
        stepCompleted,
        stepText: stepTextInput,
        position,
      })
    ).unwrap();

    setEditing(false);
  };

  const handleCompletedButton = async () => {
    setUpdating(true);

    await dispatch(
      updateStep({
        stepId,
        taskId,
        stepCompleted: !stepCompleted,
        stepText,
        position,
      })
    ).unwrap();

    setUpdating(false);
  };

  const handleDeleteButton = async () => {
    setDeleting(true);

    await dispatch(
      deleteStep({
        stepId,
        taskId,
      })
    ).unwrap();

    setDeleting(false);
    onDelete(stepId);
  };

  return (
    <div className="step">
      <div className="step__header">
        <CheckButton
          loading={updating}
          check={stepCompleted}
          onClick={handleCompletedButton}
          disabled={!canEdit || deleting || editing}
          size="small"
        />
      </div>
      {editing ? (
        <div className="step__edit-form">
          <StepTextForm
            buttonText="update"
            onSubmit={handleSubmitEditing}
            value={stepTextInput}
            onChange={handleStepTextChange}
            loading={updateStepLoading}
          />

          <IconButton className="step__edit-cancel-button" onClick={toggleEdit}>
            <FiX />
          </IconButton>
        </div>
      ) : (
        <>
          <div className="step__position">{index}.</div>
          <div className="step__text"> {stepText}</div>
          <div className="step__actions">
            {canEdit && !editing && (
              <IconButton disabled={!canEdit || deleting} onClick={toggleEdit}>
                <FiEdit2 />
              </IconButton>
            )}
            {canEdit &&
              (deleting ? (
                <IconButton disabled={true}>
                  <LoadingIndicator size="small" />
                </IconButton>
              ) : (
                <IconButton
                  disabled={!canEdit || editing}
                  onClick={handleDeleteButton}
                >
                  <FiTrash2 />
                </IconButton>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Step;
