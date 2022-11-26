import React from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardTitle,
} from "mdb-react-ui-kit";
const TaskSidebar = ({ onClick, message, title, btnText }) => {
  return (
    <div className="aside-block">
      <MDBCard>
        <MDBCardBody>
          <MDBCardTitle>{title}</MDBCardTitle>
          <MDBCardText>{message}</MDBCardText>
          <MDBBtn style={{ backgroundColor: "#332d2d" }} onClick={onClick}>
            {btnText}
          </MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default TaskSidebar;
