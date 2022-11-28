import React, { useState } from "react";
import { MDBBadge } from "mdb-react-ui-kit";
import { useQuery } from "../hooks/useFetch";
import Error from "./Error";
import axios from "axios";

const Categories = () => {
  const [input, setInput] = useState("");
  const [refetch, setRefetch] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/categories", { category: input });
      setInput("");
      setRefetch((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClick = async (id) => {
    try {
      await axios.delete("/categories", { data: { id: id } });
      setRefetch((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
  };

  const { data: categories, loading, error } = useQuery("/categories", refetch);

  if (loading) return <p>loading...</p>;
  if (error) {
    return <Error error={error} />;
  }

  return (
    <div className="col-md-4">
      <div className="card  h-100">
        <div className="card-body">
          <h6 className="d-flex align-items-center mb-3">Categories:</h6>
          {categories.map((category) => (
            <MDBBadge color="dark ms-2 mb-2" pill key={category.id}>
              {category.name}
              <i
                type="button"
                className="close fas fa-times ms-1"
                onClick={() => handleClick(category.id)}
              />
            </MDBBadge>
          ))}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              className="removeInputOutline form-control my-3"
              placeholder="Add a category"
              onChange={(e) => setInput(e.target.value)}
            />
            <button hidden type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Categories;
