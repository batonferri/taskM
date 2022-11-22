import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import sign from "jwt-encode";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [me, setMe] = useState(
    decodeToken(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post("/auth/login", inputs);
    setMe(decodeToken(res.data));
  };

  const logout = async () => {
    await axios.post("/auth/logout");
    setMe(null);
  };

  useEffect(() => {
    me !== null
      ? localStorage.setItem("user", JSON.stringify(sign(me, "jwtkey")))
      : localStorage.removeItem("user");
  }, [me]);

  return (
    <AuthContext.Provider value={{ me, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
