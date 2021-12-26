import React, { useState } from "react";
import "./Layout.css";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Sidebar from "../Sidebar/Sidebar";
import Modal from "../Modal/Modal";
import FloatingButton from "../FloatingButton/FloatingButton";

const Layout = () => {
  const { user, token } = useSelector((state) => state.users);

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);

  const getLayoutPageStyle = () => {
    let className = "layout__page";

    if (token && user.id && user.email && user.name)
      className += " layout__page--padding";

    return className;
  };

  return (
    <div className={`layout`}>
      {showModal && <Modal setShowModal={setShowModal} />}
      <div className="layout__content">
        {token && user.id && user.email && user.name && <Sidebar />}
        <main className={getLayoutPageStyle()}>
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
