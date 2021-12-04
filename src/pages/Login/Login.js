import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/slices/usersSlice";

import validatePassword from "../../utils/validatePassword";
import validateLogin from "../../utils/validateLogin";

import Button from "../../components/Button/Button";
import LoadingButton from "../../components/LoadingButton/LoadingButton";
import AppLink from "../../components/Link/AppLink";
import AuthContainer from "../../components/AuthContainer/AuthContainer";
import InputField from "../../components/InputField/InputField";
import AuthForm from "../../components/AuthForm/AuthForm";
import AuthPage from "../../components/AuthPage/AuthPage";

const Login = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

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
    if (token && user.id && user.name && user.email)
      navigate(from, { replace: true });
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
          <InputField
            value={input.login}
            onChange={handleChange}
            label="email or username"
            id="login"
            type="text"
            name="login"
            error={errors.login}
            fullwidth
          />

          <InputField
            value={input.password}
            onChange={handleChange}
            label="password"
            id="password"
            type="password"
            name="password"
            error={errors.password}
            fullwidth
          />

          {loginLoading ? (
            <LoadingButton color="primary" />
          ) : (
            <Button
              type="submit"
              disabled={
                !input.login ||
                !input.password ||
                errors.login ||
                errors.password.length !== 0
              }
              color="primary"
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
