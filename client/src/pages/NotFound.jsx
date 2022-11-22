import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  setTimeout(() => {
    navigate(-1);
  }, 1000);
  return <div>404 page not found</div>;
};

export default NotFound;
