import React from "react";
import "./AuthPage.css";

import LoadingButton from "../LoadingButton/LoadingButton";
import Button from "../Button/Button";

const AuthPage = ({
  children,
  onSubmit,
  header,
  loading,
  disbaleButton,
  bottom,
}) => {
  return (
    <div className="auth-page">
      <div className="auth-page__container">
        <div className="auth-page__header">
          <h1>{header}</h1>
        </div>
        <form className="auth-page__form" onSubmit={onSubmit}>
          {children}
          {loading ? (
            <LoadingButton
              className="auth-page__submit-button"
              color="primary"
            />
          ) : (
            <Button
              className="auth-page__submit-button"
              type="submit"
              disabled={disbaleButton}
              color="primary"
            >
              submit
            </Button>
          )}
        </form>
        <div className="auth-page__bottom">{bottom}</div>
      </div>
    </div>
  );
};

export default AuthPage;
