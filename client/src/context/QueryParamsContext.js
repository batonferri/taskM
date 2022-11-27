import { createContext, useEffect, useState } from "react";
import { useQueryParams } from "../hooks/useQueryParams";

export const QueryParamsContext = createContext();

export const MultipleQueryParamsProvider = ({ children }) => {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (location.search.length !== 0) return;

    setParams({});
    setPage(1);
  }, [location.search]);

  const handleChange = ({ target: { name, value } }) => {
    if (value === "") {
      setPage(1);
      setParams((prevState) => {
        const { page, [name]: undefined, ...other } = prevState;
        return other;
      });
      return;
    }
    if (name !== "page") {
      setPage(1);
      setParams((prevState) => {
        const { page, ...other } = prevState;
        return other;
      });
    }

    setParams((prev) => ({ ...prev, [name]: value }));
  };

  useQueryParams(params);

  return (
    <QueryParamsContext.Provider value={{ handleChange, page, setPage }}>
      {children}
    </QueryParamsContext.Provider>
  );
};
