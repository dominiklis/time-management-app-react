import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/slices/usersSlice";

import Button from "../../components/Button/Button";
import LoadingButton from "../../components/LoadingButton/LoadingButton";
import AppLink from "../../components/Link/AppLink";
import AuthContainer from "../../components/AuthContainer/AuthContainer";

import validatePassword from "../../utils/validatePassword";
import validateLogin from "../../utils/validateLogin";
import AuthForm from "../../components/AuthForm/AuthForm";
import AuthPage from "../../components/AuthPage/AuthPage";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    user,
    token,
    loadings: { login: loginLoading },
    errors: { login: loginResponseError },
  } = useSelector((state) => state.users);

  const [initialRender, setInitialRender] = useState(true);

  const [input, setInput] = useState({
    login: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    login: "",
    password: [],
  });

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(
      loginUser({
        login: input.login,
        password: input.password,
      })
    ).unwrap();
  };

  useEffect(() => {
    if (token && user.id && user.name && user.email) navigate("/");
  }, [user, token]);

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
    <AuthPage>
      {loginResponseError && (
        <div className="auth-page__error">
          <h3>{loginResponseError}</h3>
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

          {loginLoading ? (
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
