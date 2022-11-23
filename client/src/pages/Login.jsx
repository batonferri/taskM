import React, { useState } from "react";
import { MDBContainer, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const { login } = useUser();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <MDBInput
        wrapperClass="mb-4"
        label="Email address"
        name="email"
        type="email"
        onChange={handleChange}
      />
      <MDBInput
        wrapperClass="mb-4"
        label="Password"
        name="password"
        type="password"
        onChange={handleChange}
      />

      <MDBBtn className="mb-4" onClick={handleSubmit}>
        Sign in
      </MDBBtn>
      <div className="text-center">{error && <p>{error}</p>}</div>

      <div className="text-center">
        <p>
          Not a member? <Link to="/register">Register</Link>
        </p>
      </div>
    </MDBContainer>
  );
};

export default Login;
