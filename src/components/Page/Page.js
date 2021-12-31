import React from "react";
import LoadingPage from "../LoadingPage/LoadingPage";
import "./Page.css";

const Page = ({ children, title, loadingPage }) => {
  if (loadingPage) {
    return <LoadingPage />;
  }

  return (
    <div className="page">
      <h1 className="page__title">{title}</h1>
      {children}
    </div>
  );
};

export default Page;
