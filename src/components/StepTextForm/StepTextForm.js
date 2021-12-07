import React from "react";

import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import LoadingButton from "../LoadingButton/LoadingButton";

const StepTextForm = ({ onSubmit, value, onChange, loading, buttonText }) => {
  return (
    <form className="step-text-form" onSubmit={onSubmit}>
      <InputField value={value} onChange={onChange} fullwidth></InputField>
      {loading ? (
        <LoadingButton className="step-text-form-button" color="primary" />
      ) : (
        <Button className="step-text-form-button" color="primary">
          {buttonText}
        </Button>
      )}
    </form>
  );
};

export default StepTextForm;
