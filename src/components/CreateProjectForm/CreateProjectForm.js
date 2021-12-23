import React, { useState } from "react";
import "./CreateProjectForm.css";

import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import LoadingButton from "../LoadingButton/LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import { createProject } from "../../store/slices/projectsSlice";

const CreateProjectForm = () => {
  const {
    loadings: { creatingProject: waitingForResponse },
  } = useSelector((state) => state.projects);
  const dispatch = useDispatch();

  const [projectName, setProjectName] = useState("");

  const handleChange = (e) => {
    setProjectName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(createProject({ projectName })).unwrap();
  };

  return (
    <form className="create-project-form" onSubmit={handleSubmit}>
      <h4>create new project</h4>
      <div className="create-project-form__fields">
        <InputField value={projectName} onChange={handleChange} fullwidth />
        {waitingForResponse ? (
          <LoadingButton />
        ) : (
          <Button type="submit" disabled={projectName.length === 0}>
            submit
          </Button>
        )}
      </div>
    </form>
  );
};

export default CreateProjectForm;
