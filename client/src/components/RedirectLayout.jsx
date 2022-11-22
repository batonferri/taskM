import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const RedirectLayout = () => {
  const navigate = useNavigate();
  const { me } = useContext(AuthContext);
  const pathName = location.pathname;
  useEffect(() => {
    if (!!me && (pathName === "/register" || pathName === "/login"))
      return navigate("/");
    if (pathName === "/register") return;
    if (!me) return navigate("/login");
  }, [me]);

  return <Outlet />;
};

export default RedirectLayout;
