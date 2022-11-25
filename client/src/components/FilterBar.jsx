import {
  MDBBtn,
  MDBContainer,
  MDBInputGroup,
  MDBNavbar,
  MDBNavbarNav,
} from "mdb-react-ui-kit";
import React, { useState } from "react";

import { useQuery } from "../hooks/useFetch";
import { useQueryParams } from "../hooks/useQueryParams";
import { status } from "../util/taskStatus";
import DropDown from "./DropDown";

const FilterBar = () => {
  const [inputs, setInputs] = useState({});
  const [search, setSearch] = useState("");
  const { data: categories } = useQuery("/categories");
  const { data: users } = useQuery("/users");

  const handleChange = (e) => {
    if (e.target.value === "") {
      setInputs((prevState) => {
        const state = { ...prevState };
        delete state[e.target.name];
        return state;
      });
      return;
    }
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setInputs((prev) => ({ ...prev, search: `%${search}%` }));
  };

  useQueryParams(inputs);

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
              className="form-control"
              placeholder="Search by title"
              aria-label="Search"
              type="Search"
            />
            <MDBBtn onClick={handleSearch} outline>
              Search
            </MDBBtn>
          </MDBInputGroup>
        </MDBNavbarNav>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default FilterBar;
