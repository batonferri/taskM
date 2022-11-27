import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

const RedirectToProfile = () => {
  const navigate = useNavigate();
  const { me } = useUser();

  useEffect(() => {
    navigate(`/profile/${me?.id}`);
  }, [me]);

  return <div></div>;
};

export default RedirectToProfile;
