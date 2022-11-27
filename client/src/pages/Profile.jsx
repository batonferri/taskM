import React, { useState } from "react";
import { useParams } from "react-router-dom";
import FormInputs from "../components/FormInputs";
import ProgressBar from "../components/ProgressBar";
import UserInfo from "../components/UserInfo";
import { useUser } from "../hooks/useUser";
import { useQuery } from "../hooks/useFetch";
import RecentTasks from "../components/RecentTasks";

const Profile = () => {
  const { id } = useParams();
  const { me } = useUser();

  const [refetch, setRefetch] = useState(false);
  const { data: user, loading, error } = useQuery(`/users/${id}`, refetch);

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
                email={me?.email}
                name={me?.full_name}
                profilePic={me?.profile_pic}
                setRefetch={setRefetch}
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
