import React from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardTitle,
} from "mdb-react-ui-kit";
const TaskSidebar = ({ handleStart, message }) => {
  return (
    <div className="aside-block">
      <MDBCard>
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
    </div>
  );
};

export default TaskSidebar;
