import React from "react";
import LoadingPage from "../LoadingPage/LoadingPage";
import "./Page.css";

const Page = ({ children, title, loadingPage, error }) => {
  const getErrorStyle = () => {
    let cln = "page__error";

    if (!error) cln += " page__error--hide";

    return cln;
  };

  if (loadingPage) {
    return <LoadingPage />;
  }

  return (
    <div className="page">
      <div className={getErrorStyle()}>{error}</div>
      <div className="page__content">
        {title && <h1 className="page__title">{title}</h1>}
        {children}
      </div>
    </div>
  );
};

export default Page;
