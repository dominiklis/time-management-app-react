import React from "react";
import "./Page.css";

const Page = ({ children, title }) => {
  return (
    <div className="page">
      <h1 className="page__title">{title}</h1>
      {children}
    </div>
  );
};

export default Page;
