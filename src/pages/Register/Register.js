import React, { useState, useEffect } from "react";

import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/slices/usersSlice";

import validateEmail from "../../utils/validateEmail";
import validatePassword from "../../utils/validatePassword";
import validateUsername from "../../utils/validateUsername";

import AppLink from "../../components/Link/AppLink";
import AuthPage from "../../components/AuthPage/AuthPage";
import InputField from "../../components/Inputs/InputField";
import Page from "../../components/Page/Page";

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
    <Page error={registerResponseError}>
      <AuthPage
        onSubmit={handleSubmit}
        header="Register"
        loading={registerLoading}
        disbaleButton={
          !input.name ||
          !input.email ||
          !input.password ||
          errors.login ||
          errors.name ||
          errors.password.length !== 0
        }
        bottom={
          <>
            Have an account? <AppLink to="/login">Login</AppLink>
          </>
        }
      >
        <InputField
          value={input.name}
          onChange={handleChange}
          label="usernname"
          id="name"
          type="text"
          name="name"
          error={errors.name}
          fullwidth
        />

        <InputField
          value={input.email}
          onChange={handleChange}
          label="email"
          id="email"
          type="email"
          name="email"
          error={errors.email}
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
      </AuthPage>
    </Page>
  );
};

export default Register;
