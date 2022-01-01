import React, { useEffect, useState } from "react";
import "./ShareForm.css";

import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import validateLogin from "../../utils/validateLogin";
import LoadingButton from "../LoadingButton/LoadingButton";
import Checkbox from "../Checkbox/Checkbox";

const ShareForm = ({
  error,
  showError,
  header = "share",
  buttonText = "submit",
  onSubmit,
  userName,
  canChangePermissions,
  userCanShare,
  userCanChangePermissions,
  userCanEdit,
  userCanDelete,
  editing,
  loading,
}) => {
  const [input, setInput] = useState({
    login: userName || "",
    canShare: userCanShare,
    canChangePermissions: userCanChangePermissions,
    canEdit: userCanEdit,
    canDelete: userCanDelete,
  });

  const [loginError, setLoginError] = useState("");

  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    setFirstRender(false);
  }, []);

  const handleInputChange = (e) =>
    setInput((prev) => ({ ...prev, login: e.target.value }));

  const handleCheckboxesChange = (e) =>
    setInput((prev) => ({ ...input, [e.target.name]: !prev[e.target.name] }));

  useEffect(() => {
    if (!firstRender) setLoginError(validateLogin(input.login));
  }, [input.login]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(input);
    setInput((prev) => ({ ...prev, login: "" }));
  };

  return (
    <div className="share-task" onSubmit={handleSubmit}>
      {showError && <div className="share-task__submit-error">{error}</div>}
      <h5 className="share-task__header">{header}</h5>
      <form className="share-task__form">
        <div className="share-task__inputs">
          {!editing && (
            <InputField
              fullwidth
              placeholder="username or email"
              value={input.login}
              onChange={handleInputChange}
              error={loginError}
              name="login"
              lightBorder
            />
          )}
          {canChangePermissions && (
            <div className="share-task__checkboxes">
              <Checkbox
                checked={input.canShare}
                onChange={handleCheckboxesChange}
                name="canShare"
                label="can share"
                disabled={loading}
              />
              <Checkbox
                checked={input.canChangePermissions}
                onChange={handleCheckboxesChange}
                name="canChangePermissions"
                label="can change permissions"
                disabled={loading}
              />
              <Checkbox
                checked={input.canEdit}
                onChange={handleCheckboxesChange}
                name="canEdit"
                label="can edit"
                disabled={loading}
              />
              <Checkbox
                checked={input.canDelete}
                onChange={handleCheckboxesChange}
                name="canDelete"
                label="can delete"
                disabled={loading}
              />
            </div>
          )}
        </div>
        {loading ? (
          <LoadingButton color="primary" />
        ) : (
          <Button
            color="primary"
            disabled={(!editing && loginError) || !input.login}
          >
            {buttonText}
          </Button>
        )}
      </form>
    </div>
  );
};

export default ShareForm;
