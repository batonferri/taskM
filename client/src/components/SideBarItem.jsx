import React from "react";
import { Link } from "react-router-dom";

const SideBarItem = ({ name, path }) => {
  return (
    <li className="nav-item" key={name + path}>
      <Link
        to={path}
        className={`nav-link ${location.pathname !== path && "text-white"}`}
        style={{
          color: "#332d2d",
          backgroundColor: location.pathname !== path && "transparent",
        }}
      >
        {/* <svg className="bi me-2" width="16" height="16">
      <use xlink:href="#home"></use>
    </svg> */}
        {name}
      </Link>
    </li>
  );
};

export default SideBarItem;
