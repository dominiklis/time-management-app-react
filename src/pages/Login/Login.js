import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import Button from "../../components/Button/Button";
import LoadingButton from "../../components/LoadingButton/LoadingButton";
import AppLink from "../../components/Link/AppLink";
import AuthContainer from "../../components/AuthContainer/AuthContainer";

import apiCalls from "../../utils/api";
import validatePassword from "../../utils/validatePassword";
import validateLogin from "../../utils/validateLogin";
import AuthForm from "../../components/AuthForm/AuthForm";
import AuthPage from "../../components/AuthPage/AuthPage";

const Login = () => {
  const navigate = useNavigate();

  const [initialRender, setInitialRender] = useState(true);

  const [waitingForResponse, setWaitingForResponse] = useState(false);

  const [input, setInput] = useState({
    login: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    response: "",
    login: "",
    password: [],
  });

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setWaitingForResponse(true);
    setErrors((prev) => ({ ...prev, response: "" }));
    const result = await apiCalls.users.login(input.login, input.password);

    if (!result.success) {
      setErrors((prev) => ({ ...prev, response: result.message }));
    } else {
      navigate("/");
    }
    setWaitingForResponse(false);
  };

  useEffect(() => {
    if (!initialRender) {
      const error = validateLogin(input.login);

      setErrors((prev) => ({
        ...prev,
        login: error,
      }));
    }
  }, [input.login]);

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

  useEffect(() => {
    console.log("=======================================");
    console.log(
      !input.login ||
        !input.password ||
        errors.login ||
        errors.password.length === 0
    );
    console.log("nie ma loginu", input.login);
    console.log("nie ma password", input.password);
    console.log("errors.login", errors.login);
    console.log("errors.password", errors.password);
  });

  return (
    <AuthPage>
      {errors.response && (
        <div className="auth-page__error">
          <h3>{errors.response}</h3>
        </div>
      )}
      <AuthContainer onSubmit={handleSubmit}>
        <div className="auth-container__header">
          <h1>Login</h1>
        </div>
        <AuthForm onSubmit={handleSubmit}>
          <div className="auth-form__input">
            {errors.login && (
              <div className="auth-form__error">{errors.login}</div>
            )}
            <label htmlFor="login">
              email or username
              <input
                id="login"
                type="text"
                name="login"
                value={input.login}
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
                !input.login ||
                !input.password ||
                errors.login ||
                errors.password.length !== 0
              }
            >
              submit
            </Button>
          )}
        </AuthForm>
        <div className="auth-container__bottom">
          New user? <AppLink to="/register">Register now</AppLink>
        </div>
      </AuthContainer>
    </AuthPage>
  );
};

export default Login;
