import axios from "axios";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardTitle,
} from "mdb-react-ui-kit";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const Task = () => {
  const { id } = useParams();
  const [message, setMessage] = useState(null);

  const handleStart = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/tasks/start/${id}`);
      setMessage(res);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(message);

  return (
    <MDBCard className="w-25">
      <MDBCardBody>
        <MDBCardTitle>Start this task</MDBCardTitle>
        <MDBCardText>
          By clicking start task status will change from "To Do" to "In
          Progress"
        </MDBCardText>
        <MDBBtn onClick={handleStart}>Start</MDBBtn>
      </MDBCardBody>
      <div className="mx-3">{message && <p>{message.data}</p>}</div>
    </MDBCard>
  );
};

export default Task;
