import React from "react";
import { Link } from "react-router-dom";
import { MDBIcon } from "mdb-react-ui-kit";

const SideBarItem = ({ name, path, icon }) => {
  return (
    <li className="nav-item" key={name + path}>
      <Link
        to={path}
        className={` nav-link ${
          location.pathname !== path && "text-white darkHoverEffect"
        }`}
        style={{
          color: "#332d2d",
          backgroundColor: location.pathname !== path && "transparent",
        }}
      >
        <span className="bi me-2" width="16" height="16">
          <MDBIcon fas icon={icon} />
        </span>
        {name}
      </Link>
    </li>
  );
};

export default SideBarItem;
