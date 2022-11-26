import { createContext, useEffect, useState } from "react";
import { useQueryParams } from "../hooks/useQueryParams";

export const QueryParamsContext = createContext();

export const MultipleQueryParamsProvider = ({ children }) => {
  const [params, setParams] = useState({});

  useEffect(() => {
    if (location.search.length !== 0) return;

    setParams({});
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.value === "") {
      setParams((prevState) => {
        const state = { ...prevState };
        delete state[e.target.name];
        return state;
      });
      return;
    }
    setParams((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useQueryParams(params);

  return (
    <QueryParamsContext.Provider value={{ params, handleChange, setParams }}>
      {children}
    </QueryParamsContext.Provider>
  );
};
