import React from "react";

const FormInputs = ({ handleChange, handleSubmit, inputs, company }) => {
  return (
    <div className="col-md-8">
      <div className="card  h-100">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-sm-3">
              <h6 className="mb-0">
                {!company ? "Full Name" : "Company Name"}
              </h6>
            </div>
            <div className="col-sm-9 text-secondary">
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={handleChange}
                defaultValue={inputs.name}
              />
            </div>
          </div>
          {!company && (
            <div className="row mb-3">
              <div className="col-sm-3">
                <h6 className="mb-0">Email</h6>
              </div>
              <div className="col-sm-9 text-secondary">
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  onChange={handleChange}
                  defaultValue={inputs.email}
                />
              </div>
            </div>
          )}
          <div className="row mb-3">
            <div className="col-sm-3">
              <h6 className="mb-0">
                {!company ? "Profile Picture" : "Company Logo"}
              </h6>
            </div>
            <div className="col-sm-9 text-secondary">
              <input
                type="file"
                name="profilePic"
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
          <div className="d-flex flex-row-reverse">
            <div className="col-sm-9 text-secondary d-flex flex-row-reverse">
              <input
                type="button"
                onClick={handleSubmit}
                className="btn btn-primary px-4 bg-dark"
                defaultValue="Save Changes"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormInputs;
