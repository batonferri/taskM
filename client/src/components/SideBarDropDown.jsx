import React from "react";
import Avatar from "./Avatar";

const SideBarDropDown = ({
  name,
  pic,
  setShowDropDown,
  showDropDown,
  onClick,
}) => {
  return (
    <div className="dropdown">
      <a
        style={{ cursor: "pointer" }}
        className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
        onClick={() => {
          setShowDropDown((prev) => !prev);
        }}
      >
        <Avatar
          name={name}
          src={pic}
          width="32px"
          height="32px"
          className="rounded-circle me-2"
        />
        <strong>{name?.toUpperCase()}</strong>
      </a>
      {showDropDown && (
        <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
          <li>
            <a className="dropdown-item">Profile</a>
          </li>
          <hr className="dropdown-divider" />
          <li>
            <a className="dropdown-item" onClick={onClick}>
              Sign out
            </a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default SideBarDropDown;
