import axios from "axios";
import { MDBBtn } from "mdb-react-ui-kit";
import React from "react";
import { useUser } from "../hooks/useUser";

const TaskWidgetButton = ({ assignTo, createdBy, status, id, setRefetch }) => {
  const { me } = useUser();

  const handleStart = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/tasks/start/${id}`);
      setRefetch((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClose = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/tasks/close/${id}`);
      setRefetch((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
  };

  if (createdBy === me.id && status === "In Progress")
    return (
      <MDBBtn className="w-100" color="dark" onClick={handleClose}>
        Close
      </MDBBtn>
    );
  if (assignTo === me.id && status === "To Do")
    return (
      <MDBBtn className="w-100" color="dark" onClick={handleStart}>
        start
      </MDBBtn>
    );
};

export default TaskWidgetButton;
