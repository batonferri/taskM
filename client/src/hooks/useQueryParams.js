import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const useQueryParams = (inputs) => {
  const [search, setSearch] = useSearchParams();

  useEffect(() => {
    setSearch(inputs);
  }, [inputs]);
};
