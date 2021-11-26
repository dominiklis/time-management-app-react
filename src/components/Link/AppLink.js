import React from "react";
import { Link } from "react-router-dom";
import "./AppLink.css";

const AppLink = ({ children, to }) => {
  return (
    <Link className="link" to={to}>
      {children}
    </Link>
  );
};

export default AppLink;
