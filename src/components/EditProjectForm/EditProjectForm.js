import React, { useEffect, useState } from "react";
import "./EditProjectForm.css";

import { useDispatch, useSelector } from "react-redux";

import Button from "../Button/Button";
import LoadingButton from "../LoadingButton/LoadingButton";
import InputField from "../InputField/InputField";
import TextArea from "../TextArea/TextArea";
import constants from "../../utils/constants";

const EditProjectForm = ({
  setEditProject,
  projectName,
  projectDescription,
  canChangePermissions,
  canEdit,
  canShare,
}) => {
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    projectName: projectName,
    projectDescription: projectDescription,
  });

  const [errors, setErrors] = useState({
    projectName: "",
  });

  const {
    loadings: {
      editProject: editProjectLoading,
      deleteProject: deleteProjectLoading,
    },
  } = useSelector((state) => state.projects);

  const handleCloseButton = () => setEditProject(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // await dispatch(
    //   updateTask({ taskId, ...input, taskCompleted, projectId })
    // ).unwrap();
    // setEditTask(false);
  };

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => setInitialRender(false), []);

  useEffect(() => {
    if (!initialRender) {
      if (!input.taskName || !input.taskName.trim()) {
        setErrors((prev) => ({ ...prev, taskName: constants.nameError }));
      } else {
        setErrors((prev) => ({ ...prev, taskName: "" }));
      }
    }
  }, [input.projectDescription]);

  return (
    <div className="edit-project-form">
      <div className="edit-project-form__header">
        <h3 className="edit-project-form__header-text">Edit project</h3>
        <div className="edit-project-form__buttons">
          <Button
            className="edit-project__cancel-button"
            onClick={handleCloseButton}
          >
            cancel
          </Button>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <InputField
          value={input.projectName}
          onChange={handleChange}
          label="name"
          id="projectName"
          type="text"
          name="projectName"
          error={errors.projectName}
          fullwidth
          lightBorder
        />

        <TextArea
          value={input.projectDescription}
          onChange={handleChange}
          label="description"
          id="projectDescription"
          type="text"
          name="projectDescription"
          fullwidth
          lightBorder
        />

        {editProjectLoading ? (
          <LoadingButton color="primary" />
        ) : (
          <Button
            type="submit"
            disabled={
              !input.projectName || errors.projectName || deleteProjectLoading
            }
            color="primary"
          >
            update
          </Button>
        )}
      </form>
    </div>
  );
};

export default EditProjectForm;
