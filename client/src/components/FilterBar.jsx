import {
  MDBBtn,
  MDBContainer,
  MDBInputGroup,
  MDBNavbar,
  MDBNavbarNav,
} from "mdb-react-ui-kit";
import React from "react";
import { useQuery } from "../hooks/useFetch";
import { status } from "../util/taskStatus";
import DropDown from "./DropDown";

const FilterBar = () => {
  const { data: categories } = useQuery("/categories");
  const { data: users } = useQuery("/users");
  const handleChange = (e) => {
    console.log(e.target.value);
  };
  return (
    <MDBNavbar expand="lg" dark bgColor="light" className="mt-n5">
      <MDBContainer fluid>
        <MDBNavbarNav className="me-auto mb-3 mb-lg-0">
          <DropDown
            onChange={handleChange}
            name="createdBy_id"
            defaultValue="Created By"
            options={users}
          />
          <DropDown
            onChange={handleChange}
            name="assignTo_id"
            defaultValue="Assign To"
            options={users}
          />
          <DropDown
            onChange={handleChange}
            name="status"
            defaultValue="By Status"
            options={status}
          />
          <DropDown
            onChange={handleChange}
            name="category_id"
            defaultValue="By Category"
            options={categories}
          />
          <MDBInputGroup tag="form" className="d-flex w-auto">
            <input
              className="form-control"
              placeholder="Search by title"
              aria-label="Search"
              type="Search"
            />
            <MDBBtn outline>Search</MDBBtn>
          </MDBInputGroup>
        </MDBNavbarNav>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default FilterBar;
