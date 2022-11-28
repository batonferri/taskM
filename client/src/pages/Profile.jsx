import React, { useState } from "react";
import { useParams } from "react-router-dom";
import FormInputs from "../components/FormInputs";
import ProgressBar from "../components/ProgressBar";
import UserInfo from "../components/UserInfo";
import { useUser } from "../hooks/useUser";
import { useQuery } from "../hooks/useFetch";
import RecentTasks from "../components/RecentTasks";
import { upload } from "../helper/uploadFile";
import axios from "axios";

const Profile = () => {
  const { id } = useParams();
  const { me, setMe } = useUser();

  const [inputs, setInputs] = useState({
    name: me?.full_name,
    email: me?.email,
    profilePic: me?.profile_pic,
  });

  const [refetch, setRefetch] = useState(false);
  const { data: user, loading, error } = useQuery(`/users/${id}`, refetch);

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

  if (loading) return <p>loading...</p>;
  if (error) {
    return <Error error={error} />;
  }

  return (
    <div className="container my-5">
      <div className="main-body">
        <div className="row gutters-sm">
          <div className="row  mb-3">
            <UserInfo
              email={user.email}
              name={user.full_name}
              isAdmin={user.is_admin}
              profilePic={user.profile_pic}
              className={me?.id !== Number(id) ? "col-md-12" : undefined}
            />
            {me?.id === Number(id) && (
              <FormInputs
                inputs={inputs}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
              />
            )}
          </div>
          <div className="row  mb-3">
            {user.taskCount.totalTasks > 0 ? (
              <ProgressBar taskCount={user.taskCount} />
            ) : (
              <h1 className="text-center">This User Has No Tasks</h1>
            )}
          </div>
          <div className="row  mb-3">
            {user.taskCount.totalTasks > 0 && (
              <RecentTasks tasks={user.tasks} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
