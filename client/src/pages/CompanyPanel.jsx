import axios from "axios";
import React, { useState } from "react";
import Categories from "../components/Categories";
import Error from "../components/Error";
import FormInputs from "../components/FormInputs";
import ProgressBar from "../components/ProgressBar";
import UserInfo from "../components/UserInfo";
import { upload } from "../helper/uploadFile";
import { useQuery } from "../hooks/useFetch";
import { useUser } from "../hooks/useUser";

const CompanyPanel = () => {
  const { me, setMe } = useUser();
  const [inputs, setInputs] = useState({
    name: me?.companyName,
    profilePic: me?.logo,
  });

  const { data: taskCount, loading, error } = useQuery(`/tasks/count`);

  if (loading) return <p>loading...</p>;
  if (error) {
    return <Error error={error} />;
  }

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
        await axios.put("/company", {
          name: inputs.name,
          profilePic: imgUrl,
        });
        setMe((prev) => ({ ...prev, logo: imgUrl, companyName: inputs.name }));
      } catch (err) {
        console.error(err);
      }
      return;
    }
    try {
      await axios.put("/company", inputs);
      setMe((prev) => ({ ...prev, companyName: inputs.name }));
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
              email={me?.company_key}
              name={me?.companyName}
              profilePic={me?.logo}
            />
            <FormInputs
              inputs={inputs}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              company
            />
          </div>
          <div className="row mb-3">
            <ProgressBar taskCount={taskCount} />
          </div>
          <div className="row  mb-3">
            <div className="col-md-8">
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
