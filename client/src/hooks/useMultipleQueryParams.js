import { useContext } from "react";
import { QueryParamsContext } from "../context/QueryParamsContext";

export const useMultipleQueryParams = () => {
  return useContext(QueryParamsContext);
};
