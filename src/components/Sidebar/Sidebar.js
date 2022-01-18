import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./Sidebar.css";

import { Link, useLocation } from "react-router-dom";
import { IconContext } from "react-icons";
import {
  CgHome,
  CgMenu,
  CgClose,
  CgCalendar,
  CgFileDocument,
  CgSearch,
  CgCloseR,
} from "react-icons/cg";
import List from "../List/List";
import { logoutUser } from "../../store/slices/usersSlice";

const Sidebar = () => {
  const menuItems = [
    {
      path: "/",
      icon: <CgHome />,
      text: "home",
    },
    {
      path: "/browse",
      icon: <CgCalendar />,
      text: "browse tasks",
    },
    {
      path: "/projects",
      icon: <CgFileDocument />,
      text: "projects",
    },
    {
      path: "/search",
      icon: <CgSearch />,
      text: "search",
    },
  ];

  const dispatch = useDispatch();
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
    hideMenuOnSmallScreens();
  }, []);

  useEffect(() => {
    setCurrentPath("/" + location.pathname.split("/")[1]);
  }, [location.pathname]);

  const getSidebarStyle = () => {
    let cln = "sidebar";

    if (hideMenu) cln += " sidebar--hidden";

    return cln;
  };

  const handleLogoutButton = () => dispatch(logoutUser());

  return (
    <div className={getSidebarStyle()}>
      <IconContext.Provider value={{ className: "sidebar__button-icon" }}>
        <List className="sidebar__content">
          <li className="sidebar__item sidebar__toggle">
            <button
              className="sidebar__toggle-button"
              onClick={handleToggleButton}
            >
              {hideMenu ? <CgMenu /> : <CgClose />}
            </button>
          </li>
          {menuItems.map((item) => (
            <li
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
            </li>
          ))}

          <li
            className={`sidebar__item sidebar__item--logout-button`}
            onClick={handleLogoutButton}
          >
            <button className="sidebar__button">
              <div className="sidebar__item-icon">
                <CgCloseR />
              </div>
              <div className="sidebar__item-text">logout</div>
            </button>
          </li>
        </List>
      </IconContext.Provider>
      <div className="sidebar__background" onClick={hide}></div>
    </div>
  );
};

export default Sidebar;
