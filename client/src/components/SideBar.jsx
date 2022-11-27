import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSidebarItems } from "../helper/getSidebarItems";
import { useUser } from "../hooks/useUser";
import SideBarBranding from "./SideBarBranding";
import SideBarDropDown from "./SideBarDropDown";
import SideBarItem from "./SideBarItem";

const SideBar = () => {
  const navigate = useNavigate();
  const { me, logout } = useUser();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark h-100 position-fixed top-0 left-0"
      style={{
        width: "280px",
      }}
    >
      <SideBarBranding companyName={me?.companyName} />
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        {getSidebarItems(me?.is_admin).map((item) => (
          <SideBarItem name={item.name} path={item.path} icon={item.icon} />
        ))}
      </ul>
      <hr />
      <SideBarDropDown
        id={me?.id}
        name={me?.full_name}
        pic={me?.profile_pic}
        onClick={handleLogout}
      />
    </div>
  );
};

export default SideBar;
