import {
  MDBBtn,
  MDBContainer,
  MDBInputGroup,
  MDBNavbar,
  MDBNavbarNav,
} from "mdb-react-ui-kit";
import React, { useState } from "react";
import { useQuery } from "../hooks/useFetch";
import { useMultipleQueryParams } from "../hooks/useMultipleQueryParams";
import { status } from "../util/taskStatus";
import DropDown from "./DropDown";

const FilterBar = () => {
  const [search, setSearch] = useState("");
  const { data: categories } = useQuery("/categories");
  const { data: users } = useQuery("/users");

  const { handleChange } = useMultipleQueryParams();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.length < 1) return;
    handleChange({ target: { name: "search", value: `%${search}%` } });
  };

  return (
    <MDBNavbar expand="lg" dark bgColor="light" className="mt-1">
      <MDBContainer fluid>
        <MDBNavbarNav className="me-auto mb-3 mb-lg-0">
          <DropDown
            onChange={handleChange}
            name="createdBy_id"
            defaultValue="Created By"
            options={users}
            className="mx-3"
          />
          <DropDown
            onChange={handleChange}
            name="assignTo_id"
            defaultValue="Assign To"
            options={users}
            className="mx-3"
          />
          <DropDown
            onChange={handleChange}
            name="status"
            defaultValue="By Status"
            options={status}
            className="mx-3"
          />
          <DropDown
            onChange={handleChange}
            name="category_id"
            defaultValue="By Category"
            options={categories}
            className="mx-3"
          />
          <MDBInputGroup className="d-flex w-auto mx-3">
            <input
              name="search"
              onChange={(e) => setSearch(e.target.value)}
              className="removeInputOutline form-control"
              placeholder="Search by title"
              aria-label="Search"
            />
            <MDBBtn onClick={handleSearch} color="dark" outline>
              Search
            </MDBBtn>
          </MDBInputGroup>
        </MDBNavbarNav>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default FilterBar;
