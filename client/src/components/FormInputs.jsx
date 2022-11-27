import axios from "axios";
import React, { useState } from "react";
import { upload } from "../helper/uploadFile";
import { useUser } from "../hooks/useUser";

const FormInputs = ({ name, email, profilePic, setRefetch }) => {
  const [inputs, setInputs] = useState({
    name: name,
    email: email,
    profilePic: profilePic,
  });
  const { setMe } = useUser();

  const handleChange = (e) => {
    e.preventDefault();
    if (!!e.target?.files)
      return setInputs((prev) => ({
        ...prev,
        [e.target.name]: e.target.files[0],
      }));
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (typeof inputs.profilePic !== "string") {
      const imgUrl = await upload(inputs.profilePic);
      try {
        await axios.put("/users", { ...inputs, profilePic: imgUrl });
        setRefetch((prev) => !prev);
        setMe((prev) => ({ ...prev, profile_pic: imgUrl }));
      } catch (err) {
        console.error(err);
      }
      return;
    }
    try {
      await axios.put("/users", inputs);
      setRefetch((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="col-md-8">
      <div className="card  h-100">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-sm-3">
              <h6 className="mb-0">Full Name</h6>
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
          <div className="row mb-3">
            <div className="col-sm-3">
              <h6 className="mb-0">Profile Picture</h6>
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
