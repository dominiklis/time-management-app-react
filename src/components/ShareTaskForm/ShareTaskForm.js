import React, { useEffect, useState } from "react";
import "./ShareTaskForm.css";

import { useSelector } from "react-redux";

import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import validateLogin from "../../utils/validateLogin";
import LoadingButton from "../LoadingButton/LoadingButton";
import Checkbox from "../Checkbox/Checkbox";

const ShareTaskForm = ({ onSubmit, taskId, canChangePermissions }) => {
  const {
    loadings: {
      sharing: { sharingTask: sharingTaskLoading },
    },
  } = useSelector((state) => state.tasks);

  const [input, setInput] = useState({
    login: "",
    canShare: false,
    canChangePermissions: false,
    canEdit: false,
    canDelete: false,
  });

  const [loginError, setLoginError] = useState("");

  const handleInputChange = (e) =>
    setInput((prev) => ({ ...prev, login: e.target.value }));

  const handleCheckboxesChange = (e) =>
    setInput((prev) => ({ ...input, [e.target.name]: !prev[e.target.name] }));

  useEffect(() => {
    setLoginError(validateLogin(input.login));
  }, [input.login]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ taskId, ...input });
  };

  return (
    <div className="share-task" onSubmit={handleSubmit}>
      <h5 className="share-task__header">share this task</h5>
      <form className="share-task__form">
        <div className="share-task__inputs">
          <InputField
            fullwidth
            placeholder="username or email"
            value={input.login}
            onChange={handleInputChange}
            error={loginError}
            name="login"
          />
          {canChangePermissions && (
            <div className="share-task__checkboxes">
              <Checkbox
                checked={input.canShare}
                onChange={handleCheckboxesChange}
                name="canShare"
                label="can share"
              />
              <Checkbox
                checked={input.canChangePermissions}
                onChange={handleCheckboxesChange}
                name="canChangePermissions"
                label="can change permissions"
              />
              <Checkbox
                checked={input.canEdit}
                onChange={handleCheckboxesChange}
                name="canEdit"
                label="can edit"
              />
              <Checkbox
                checked={input.canDelete}
                onChange={handleCheckboxesChange}
                name="canDelete"
                label="can delete"
              />
            </div>
          )}
        </div>
        {sharingTaskLoading ? (
          <LoadingButton color="primary" />
        ) : (
          <Button color="primary" disabled={loginError}>
            share
          </Button>
        )}
      </form>
    </div>
  );
};

export default ShareTaskForm;
