import React, { useState } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

const Navbar = () => {
  const [showNavColor, setShowNavColor] = useState(false);
  const navigate = useNavigate();
  const { me, logout } = useUser();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <MDBNavbar expand="lg" dark bgColor="primary" className="mb-5">
      <MDBContainer fluid>
        <Link to="/">
          <MDBNavbarBrand>{me?.companyName}</MDBNavbarBrand>
        </Link>
        <MDBNavbarToggler
          type="button"
          data-target="#navbarColor02"
          aria-controls="navbarColor02"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowNavColor(!showNavColor)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse show={showNavColor} navbar>
          <MDBNavbarNav className="me-auto mb-2 mb-lg-0">
            <Link to="/profile">
              <MDBNavbarItem>
                <MDBNavbarLink>{me?.full_name.toUpperCase()}</MDBNavbarLink>
              </MDBNavbarItem>
            </Link>
            <Link to="/addtask">
              <MDBNavbarItem>
                <MDBNavbarLink>Add Task</MDBNavbarLink>
              </MDBNavbarItem>
            </Link>
            {me?.is_admin === 1 && (
              <MDBNavbarItem>
                <MDBNavbarLink
                  onClick={() =>
                    alert(`Your company key is: ${me?.company_key}`)
                  }
                >
                  cPanel
                </MDBNavbarLink>
              </MDBNavbarItem>
            )}
            <MDBNavbarItem>
              <MDBNavbarLink onClick={handleLogout}>Logout</MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Navbar;
