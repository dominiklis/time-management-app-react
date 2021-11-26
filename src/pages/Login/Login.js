import React, { useEffect, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router";

import Button from "../../components/Button/Button";
import LoadingButton from "../../components/LoadingButton/LoadingButton";
import AppLink from "../../components/Link/AppLink";

import apiCalls from "../../utils/api";
import validatePassword from "../../utils/validatePassword";
import validateLogin from "../../utils/validateLogin";

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
    console.log(result);

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

  return (
    <div className="login-page">
      {errors.response && (
        <div className="login-page__error">
          <h3>{errors.response}</h3>
        </div>
      )}
      <div className="container">
        <div className="container__header">
          <h1>Login</h1>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-form__input">
            {errors.login && (
              <div className="login-form__error">{errors.login}</div>
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

          <div className="login-form__input">
            {errors.password.length > 0 &&
              errors.password.map((err) => (
                <div ket={err} className="login-form__error">
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
            <Button type="submit" disabled={!input.login || !input.password}>
              submit
            </Button>
          )}
        </form>
        <div className="container__bottom">
          New user? <AppLink to="/register">Register now</AppLink>.
        </div>
      </div>
    </div>
  );
};

export default Login;
