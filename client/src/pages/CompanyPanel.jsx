import React from "react";
import { useUser } from "../hooks/useUser";

const CompanyPanel = () => {
  const { me } = useUser();

  return (
    <div>
      Your company key is: <h5>{me?.company_key}</h5>
    </div>
  );
};

export default CompanyPanel;
