import React, { useState, useEffect } from "react";

import apiCalls from "../../utils/api";
import { useNavigate } from "react-router";

import AuthContainer from "../../components/AuthContainer/AuthContainer";
import AppLink from "../../components/Link/AppLink";
import AuthForm from "../../components/AuthForm/AuthForm";
import LoadingButton from "../../components/LoadingButton/LoadingButton";
import Button from "../../components/Button/Button";
import AuthPage from "../../components/AuthPage/AuthPage";

import validatePassword from "../../utils/validatePassword";
import validateUsername from "../../utils/validateUsername";
import validateEmail from "../../utils/validateEmail";
const Register = () => {
  const navigate = useNavigate();

  const [initialRender, setInitialRender] = useState(true);

  const [waitingForResponse, setWaitingForResponse] = useState(false);

  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    response: "",
    username: "",
    email: "",
    password: [],
  });

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setWaitingForResponse(true);
    const result = await apiCalls.users.register(
      input.username,
      input.email,
      input.password
    );

    if (!result.success) {
      setErrors((prev) => ({ ...prev, response: result.message }));
    } else {
      navigate("/");
    }
    setWaitingForResponse(false);
  };

  useEffect(() => {
    if (!initialRender) {
      const error = validateUsername(input.username);

      setErrors((prev) => ({
        ...prev,
        username: error,
      }));
    }
  }, [input.username]);

  useEffect(() => {
    if (!initialRender) {
      const error = validateEmail(input.email);

      setErrors((prev) => ({
        ...prev,
        email: error,
      }));
    }
  }, [input.email]);

  useEffect(() => {
    if (!initialRender) {
      const errors = validatePassword(input.password);

      setErrors((prev) => ({
        ...prev,
        password: errors,
      }));
    }
  }, [input.password]);

  useEffect(() => setInitialRender(false), []);

  return (
    <AuthPage>
      {errors.response && (
        <div className="auth-page__error">
          <h3>{errors.response}</h3>
        </div>
      )}
      <AuthContainer>
        <div className="auth-container__header">
          <h1>Register</h1>
        </div>
        <AuthForm onSubmit={handleSubmit}>
          <div className="auth-form__input">
            {errors.username && (
              <div className="auth-form__error">{errors.username}</div>
            )}
            <label htmlFor="username">
              username
              <input
                id="username"
                type="text"
                name="username"
                value={input.username}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="auth-form__input">
            {errors.email && (
              <div className="auth-form__error">{errors.email}</div>
            )}
            <label htmlFor="username">
              email
              <input
                id="email"
                type="text"
                name="email"
                value={input.email}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="auth-form__input">
            {errors.password.length > 0 &&
              errors.password.map((err) => (
                <div ket={err} className="auth-form__error">
                  {err}
                </div>
              ))}
            <label htmlFor="password">
              password
              <input
                id="password"
                type="password"
                name="password"
                value={input.password}
                onChange={handleChange}
              />
            </label>
          </div>

          {waitingForResponse ? (
            <LoadingButton />
          ) : (
            <Button
              type="submit"
              disabled={
                !input.username ||
                !input.email ||
                !input.password ||
                errors.login ||
                errors.username ||
                errors.password.length !== 0
              }
            >
              submit
            </Button>
          )}
        </AuthForm>
        <div className="auth-container__bottom">
          Have an account? <AppLink to="/login">Login</AppLink>
        </div>
      </AuthContainer>
    </AuthPage>
  );
};

export default Register;
