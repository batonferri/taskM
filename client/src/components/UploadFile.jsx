import axios from "axios";
import { MDBBtn, MDBFile } from "mdb-react-ui-kit";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { upload } from "../helper/uploadFile";

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imgUrl = await upload(file);
    try {
      await axios.put("/users", { image: imgUrl });
      navigate("/");
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>
      <div className="d-flex">
        <div className="w-25">
          <MDBFile
            label="Update Your Profile Pic"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="d-flex align-items-end mx-2">
          <MDBBtn className="h-50" onClick={handleSubmit}>
            Upload
          </MDBBtn>
        </div>
      </div>
      <div className="text-center">{error && <p>{error}</p>}</div>
    </>
  );
};

export default UploadFile;
