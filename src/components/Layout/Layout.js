import React, { useState } from "react";
import "./Layout.css";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

const Layout = () => {
  const { user, token } = useSelector((state) => state.users);

  const [hideMenu, setHideMenu] = useState(false);

  const toggleMenu = () => {
    setHideMenu((prev) => !prev);
  };

  return (
    <div className="layout">
      {token && user.id && user.email && user.name && (
        <Navbar toggleMenu={toggleMenu} />
      )}
      <div className="layout__content">
        {token && user.id && user.email && user.name && (
          <Sidebar hideMenu={hideMenu} />
        )}
        <div className="layout__page">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
