import React from "react";
import { useUser } from "../hooks/useUser";

const Error = ({ error }) => {
  const { setMe } = useUser();

  if (error?.response.data === "Not authenticated!") {
    setMe(null);
  }
  return <p>{JSON.stringify(error?.response.data)}</p>;
};

export default Error;
