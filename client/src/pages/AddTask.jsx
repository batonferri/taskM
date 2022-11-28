import React, { useState } from "react";
import { MDBRow, MDBCol, MDBBtn } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "../hooks/useFetch";
import DropDown from "../components/DropDown";
import { priority } from "../util/taskStatus";

const AddTask = () => {
  const [error, setError] = useState(null);
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    assign_to: 0,
    category_id: 0,
    priority: "",
    deadline: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/tasks", inputs);
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };

  const { data: users } = useQuery("/users");
  const { data: categories } = useQuery("/categories");

  return (
    <div>
      <h2 className="text-dark mt-3 mx-1 px-5">Add a new task</h2>
      <div className="container-fluid d-flex justify-content-around my-3 ">
        <div className="col-7 px-3">
          <MDBRow className="mb-4">
            <input
              type="text"
              name="title"
              className="removeInputOutline form-control"
              placeholder="Title"
              onChange={handleChange}
            />
          </MDBRow>
          <MDBRow className="mb-4">
            <textarea
              onChange={handleChange}
              className="removeInputOutline form-control z-depth-1"
              rows="20"
              placeholder="Description"
              name="description"
            ></textarea>
          </MDBRow>
        </div>
        <div className="col-4 px-3">
          <MDBRow className="mb-5" style={{ height: "35px" }}>
            <DropDown
              onChange={handleChange}
              name="assign_to"
              defaultValue="Assign To"
              options={users}
              width="100%"
            />
          </MDBRow>
          <MDBRow className="mb-5" style={{ height: "35px" }}>
            <DropDown
              width="100%"
              onChange={handleChange}
              name="category_id"
              defaultValue="Categories"
              options={categories}
            />
          </MDBRow>
          <MDBRow className="mb-5" style={{ height: "35px" }}>
            <DropDown
              width="100%"
              onChange={handleChange}
              name="priority"
              defaultValue="Priority"
              options={priority}
            />
          </MDBRow>
          <MDBRow className="mb-5" style={{ height: "35px" }}>
            <input
              type="date"
              name="deadline"
              className="removeInputOutline rounded"
              onChange={handleChange}
            />
          </MDBRow>
          <MDBRow className="mb-3">
            <MDBBtn color="dark" onClick={handleSubmit}>
              Add Task
            </MDBBtn>
          </MDBRow>
          {error && (
            <h5 className="text-danger text-center font-weight-bold">
              {error}
            </h5>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddTask;
