import React, { useEffect, useState } from "react";
import "./CreateProjectForm.css";

import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import LoadingButton from "../LoadingButton/LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import { createProject } from "../../store/slices/projectsSlice";
import constants from "../../utils/constants";

const CreateProjectForm = () => {
  const [error, setError] = useState("");

  const {
    loadings: { creatingProject: waitingForResponse },
  } = useSelector((state) => state.projects);
  const dispatch = useDispatch();

  const [projectName, setProjectName] = useState("");

  useEffect(() => setInitialRender(false), []);

  const handleChange = (e) => {
    setProjectName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(createProject({ projectName })).unwrap();
  };

  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    if (!initialRender) {
      if (!projectName || !projectName.trim()) {
        setError(constants.nameError);
      } else {
        setError("");
      }
    }
  }, [projectName]);

  return (
    <form className="create-project-form" onSubmit={handleSubmit}>
      <h4>create new project</h4>
      <div className="create-project-form__content">
        <InputField
          value={projectName}
          onChange={handleChange}
          fullwidth
          label="name"
          id="projectName"
          type="text"
          name="projectName"
          error={error}
          lightBorder
        />
        {waitingForResponse ? (
          <LoadingButton />
        ) : (
          <Button
            type="submit"
            disabled={projectName.length === 0}
            color="primary"
          >
            create
          </Button>
        )}
      </div>
    </form>
  );
};

export default CreateProjectForm;
