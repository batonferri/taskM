import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Error = ({ error }) => {
  const { setMe } = useContext(AuthContext);

  if (error?.response.data === "Not authenticated!") {
    setMe(null);
  }
  return <p>{JSON.stringify(error?.response.data)}</p>;
};

export default Error;
