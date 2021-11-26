import React from "react";
import "./AuthForm.css";

const AuthForm = ({ children, onSubmit }) => {
  return (
    <form className="auth-form" onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default AuthForm;
