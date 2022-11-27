import React from "react";
import Avatar from "./Avatar";

const UserInfo = ({ className = "col-md-4", name, email, profilePic }) => {
  return (
    <div className={className}>
      <div className="card">
        <div className="card-body">
          <div className="d-flex flex-column align-items-center text-center">
            <Avatar name={name} src={profilePic} height="120px" width="120px" />
            <div className="mt-3">
              <h4>{name}</h4>
              <p className="text-secondary mb-1">{email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
