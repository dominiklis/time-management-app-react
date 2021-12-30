import React from "react";
import "./Layout.css";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Sidebar from "../Sidebar/Sidebar";

const Layout = () => {
  const { user, token } = useSelector((state) => state.users);

  const getLayoutPageStyle = () => {
    let className = "layout__page";

    if (token && user.id && user.email && user.name)
      className += " layout__page--padding";

    return className;
  };

  return (
    <div className="layout">
      <div className="layout__content">
        {token && user.id && user.email && user.name && <Sidebar />}
        <main className={getLayoutPageStyle()}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
