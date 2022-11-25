import React from "react";

const SideBarBranding = ({ companyName }) => {
  return (
    <a className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
      <span className="fs-4">{companyName}</span>
    </a>
  );
};

export default SideBarBranding;
