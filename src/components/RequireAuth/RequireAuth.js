import React from "react";

import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import { userTokenKey } from "../../store/slices/usersSlice";

import LoadingPage from "../LoadingPage/LoadingPage";

const RequireAuth = ({ children }) => {
  const userToken = localStorage.getItem(userTokenKey);
  const { user, token } = useSelector((state) => state.users);
  const location = useLocation();

  if (!userToken) {
    return <Navigate to="/login" state={{ from: location }} />;
  } else if ((!token || !user.id || !user.email || !user.name) && userToken) {
    return <LoadingPage darkBackground fullScreen />;
  }
  return children;
};

export default RequireAuth;
