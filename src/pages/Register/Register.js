import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import validateEmail from "../../utils/validateEmail";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/slices/usersSlice";

import AuthContainer from "../../components/AuthContainer/AuthContainer";
import AppLink from "../../components/Link/AppLink";
import AuthForm from "../../components/AuthForm/AuthForm";
import LoadingButton from "../../components/LoadingButton/LoadingButton";
import Button from "../../components/Button/Button";
import AuthPage from "../../components/AuthPage/AuthPage";

import validatePassword from "../../utils/validatePassword";
import validateUsername from "../../utils/validateUsername";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const dispatch = useDispatch();
  const {
    user,
    token,
    loadings: { register: registerLoading },
    errors: { register: registerResponseError },
  } = useSelector((state) => state.users);

  const [initialRender, setInitialRender] = useState(true);

  // const [waitingForResponse, setWaitingForResponse] = useState(false);

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: [],
  });

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(
      registerUser({
        name: input.name,
        email: input.email,
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
      const error = validateUsername(input.name);

      setErrors((prev) => ({
        ...prev,
        name: error,
      }));
    }
  }, [input.name]);

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
      {registerResponseError && (
        <div className="auth-page__error">
          <h3>{registerResponseError}</h3>
        </div>
      )}
      <AuthContainer>
        <div className="auth-container__header">
          <h1>Register</h1>
        </div>
        <AuthForm onSubmit={handleSubmit}>
          <div className="auth-form__input">
            {errors.name && (
              <div className="auth-form__error">{errors.name}</div>
            )}
            <label htmlFor="name">
              name
              <input
                id="name"
                type="text"
                name="name"
                value={input.name}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="auth-form__input">
            {errors.email && (
              <div className="auth-form__error">{errors.email}</div>
            )}
            <label htmlFor="name">
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

          {registerLoading ? (
            <LoadingButton />
          ) : (
            <Button
              type="submit"
              disabled={
                !input.name ||
                !input.email ||
                !input.password ||
                errors.login ||
                errors.name ||
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
