import axios from "axios";
import React, { useState } from "react";
import Categories from "../components/Categories";
import FormInputs from "../components/FormInputs";
import UserInfo from "../components/UserInfo";
import { upload } from "../helper/uploadFile";
import { useUser } from "../hooks/useUser";

const CompanyPanel = () => {
  const { me } = useUser();
  const [refetch, setRefetch] = useState(false);
  const [inputs, setInputs] = useState({
    name: me?.companyName,
    profilePic: me?.logo,
  });

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
    <div className="container my-5">
      <div className="main-body">
        <div className="row gutters-sm">
          <div className="row  mb-3">
            <UserInfo
              email={me.company_key}
              name={me.companyName}
              profilePic={me.logo}
            />
            <FormInputs
              inputs={inputs}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              company
            />
          </div>
          <div className="row  mb-3">
            <div className="col-md-4">
              <div className="card  h-100">
                <div className="card-body"></div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card  h-100">
                <div className="card-body"></div>
              </div>
            </div>
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyPanel;
