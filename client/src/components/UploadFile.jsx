import axios from "axios";
import { MDBBtn, MDBFile } from "mdb-react-ui-kit";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { upload } from "../helper/uploadFile";

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
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

  const loadSelectedImage = (e) => {
    const reader = new FileReader();
    setFile(e.target.files[0]);
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  return (
    <>
      {selectedFile && (
        <div className="w-25">
          <img
            src={selectedFile}
            alt="Selected photo"
            style={{ width: "250px", height: "250px", objectFit: "cover" }}
          />
        </div>
      )}
      <div className="d-flex">
        <div className="w-25">
          <MDBFile
            label="Update Your Profile Pic"
            onChange={loadSelectedImage}
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
