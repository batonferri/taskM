import {
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
} from "mdb-react-ui-kit";
import React from "react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";

const SideBarDropDown = ({ name, pic, onClick, id }) => {
  return (
    <MDBDropdown group className="shadow-0">
      <MDBDropdownToggle
        color="dark"
        role="button"
        className="d-flex align-items-center text-white"
      >
        <Avatar
          name={name}
          src={pic}
          width="32px"
          height="32px"
          className="rounded-circle me-2"
        />
        <strong>{name?.toUpperCase()}</strong>
      </MDBDropdownToggle>
      <MDBDropdownMenu className="dropdown-menu-dark w-100">
        <MDBDropdownItem>
          <Link to={`/profile/${id}`} className="link dropdown-item">
            Profile
          </Link>
        </MDBDropdownItem>
        <MDBDropdownItem>
          <Link className="link dropdown-item" onClick={onClick}>
            Sign out
          </Link>
        </MDBDropdownItem>
      </MDBDropdownMenu>
    </MDBDropdown>
  );
};

export default SideBarDropDown;
