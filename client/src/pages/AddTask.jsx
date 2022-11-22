import React, { useState } from "react";
import { MDBRow, MDBCol, MDBBtn } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "../hooks/useFetch";
import DropDown from "../components/DropDown";

const AddTask = () => {
  const [error, setError] = useState(null);
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    assign_to: 0,
    category_id: 0,
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
    <div className="mt-5 px-5">
      <MDBRow className="mb-4">
        <MDBCol>
          <input
            type="text"
            name="title"
            className="form-control"
            aria-label="Large"
            placeholder="Title"
            aria-describedby="inputGroup-sizing-sm"
            onChange={handleChange}
          />
        </MDBCol>
        <MDBCol className="d-flex justify-content-evenly">
          <DropDown
            onChange={handleChange}
            name="assign_to"
            defaultValue="Assign To"
            options={users}
          />
          <DropDown
            onChange={handleChange}
            name="category_id"
            defaultValue="Categories"
            options={categories}
          />
        </MDBCol>
      </MDBRow>
      <div className="form-group shadow-textarea">
        <textarea
          onChange={handleChange}
          className="form-control z-depth-1 mb-4"
          id="exampleFormControlTextarea6"
          rows="3"
          placeholder="Description"
          name="description"
        ></textarea>
      </div>
      <div className="text-center">{error && <p>{error}</p>}</div>
      <MDBBtn className="mb-4" block onClick={handleSubmit}>
        Create Task
      </MDBBtn>
    </div>
  );
};

export default AddTask;
