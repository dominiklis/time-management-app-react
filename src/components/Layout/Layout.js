import React, { useEffect, useState } from "react";
import "./Layout.css";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import Modal from "../Modal/Modal";
import FloatingButton from "../FloatingButton/FloatingButton";

const Layout = () => {
  const { user, token } = useSelector((state) => state.users);

  const [hideMenu, setHideMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleMenu = () => {
    setHideMenu((prev) => !prev);
  };

  const handleOpenModal = () => setShowModal(true);

  useEffect(() => {
    if (window.innerWidth <= 600) setHideMenu(true);
  }, []);

  return (
    <div className="layout">
      {showModal && <Modal setShowModal={setShowModal} />}
      {token && user.id && user.email && user.name && (
        <Navbar toggleMenu={toggleMenu} setShowModal={setShowModal} />
      )}
      <div className="layout__content">
        {token && user.id && user.email && user.name && (
          <Sidebar hideMenu={hideMenu} />
        )}
        <main
          className={
            token && user.id && user.email && user.name
              ? "layout__page--padding"
              : "layout__page"
          }
        >
          <Outlet />
        </main>
        {token && user.id && user.email && user.name && (
          <FloatingButton onClick={handleOpenModal} />
        )}
      </div>
    </div>
  );
};

export default Layout;
