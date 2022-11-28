import React, { useState } from "react";
import { MDBContainer, MDBInput, MDBBtn, MDBCheckbox } from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    full_name: "",
    company_key: "",
  });
  const [error, setError] = useState(null);
  const [checked, setChecked] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegisterCompany = (e) => {
    setChecked(e.target.checked);
    checked
      ? setInputs((prev) => ({
          ...prev,
          name: "",
          logo: "",
          main_color: "",
          secondary_color: "",
        }))
      : setInputs((prev) => ({
          ...prev,
          company_key: "",
        }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endPoint = !checked ? "/auth/register" : "/auth/company";
    try {
      await axios.post(endPoint, inputs);
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <MDBInput
        wrapperClass="mb-4"
        label="Full name"
        name="full_name"
        type="text"
        onChange={handleChange}
      />
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
      {!checked ? (
        <MDBInput
          wrapperClass="mb-4"
          label="Company Key"
          name="company_key"
          type="text"
          onChange={handleChange}
        />
      ) : (
        <>
          <MDBInput
            wrapperClass="mb-4"
            label="Company name"
            name="name"
            type="text"
            onChange={handleChange}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Logo"
            name="logo"
            type="text"
            onChange={handleChange}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Main Color"
            name="main_color"
            type="text"
            onChange={handleChange}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Secondary color"
            name="secondary_color"
            type="text"
            onChange={handleChange}
          />
        </>
      )}
      <MDBCheckbox label="Register a company" onClick={handleRegisterCompany} />
      <MDBBtn className="mb-4" onClick={handleSubmit}>
        Register
      </MDBBtn>
      <div className="text-center">{error && <p>{error}</p>}</div>
      <div className="text-center">
        <p>
          Do you have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </MDBContainer>
  );
};

export default Register;
