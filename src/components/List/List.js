import React from "react";
import "./List.css";

const List = ({ children, className }) => {
  const getClassName = () => {
    let cln = "list";

    if (className) cln += ` ${className}`;

    return cln;
  };

  return <ul className={getClassName()}>{children}</ul>;
};

export default List;
