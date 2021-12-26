import React, { useEffect, useState } from "react";
import "./Sidebar.css";

import { Link, useLocation } from "react-router-dom";
import { IconContext } from "react-icons";
import {
  CgMenu,
  CgClose,
  CgCalendarToday,
  CgCalendar,
  CgFileDocument,
} from "react-icons/cg";

const Sidebar = () => {
  const menuItems = [
    {
      path: "/",
      icon: <CgCalendarToday />,
      text: "today",
    },
    {
      path: "/all",
      icon: <CgCalendar />,
      text: "all tasks",
    },
    {
      path: "/projects",
      icon: <CgFileDocument />,
      text: "projects",
    },
  ];

  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(
    "/" + location.pathname.split("/")[1]
  );

  const [hideMenu, setHideMenu] = useState(false);

  const handleToggleButton = () => setHideMenu((prev) => !prev);

  const hide = () => setHideMenu(true);

  const hideMenuOnSmallScreens = () => {
    if (window.innerWidth <= 600) setHideMenu(true);
  };

  useEffect(() => {
    setCurrentPath("/" + location.pathname.split("/")[1]);
  }, [location.pathname]);

  return (
    <div className={`sidebar${hideMenu ? " sidebar--hidden" : ""}`}>
      <div className="sidebar__content">
        <IconContext.Provider value={{ className: "sidebar__button-icon" }}>
          <div className="sidebar__item sidebar__toggle">
            <button
              className="sidebar__toggle-button"
              onClick={handleToggleButton}
            >
              {hideMenu ? <CgMenu /> : <CgClose />}
            </button>
          </div>
          {menuItems.map((item) => (
            <div
              className={`sidebar__item${
                currentPath === item.path ? " sidebar__item--active" : ""
              }`}
              key={item.path}
              onClick={hideMenuOnSmallScreens}
            >
              <Link className="sidebar__link" to={item.path}>
                <div className="sidebar__item-icon">{item.icon}</div>
                <div className="sidebar__item-text">{item.text}</div>
              </Link>
            </div>
          ))}
        </IconContext.Provider>
      </div>
      <div className="sidebar__background" onClick={hide}></div>
    </div>
  );
};

export default Sidebar;
