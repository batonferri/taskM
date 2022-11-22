import React from "react";

const Avatar = ({ src, name }) => {
  return (
    <>
      {src ? (
        <img
          src={src}
          alt={name}
          style={{ width: "45px", height: "45px" }}
          className="rounded-circle"
        />
      ) : (
        <div
          style={{
            width: "45px",
            height: "45px",
            backgroundColor: "grey",
            color: "white",
          }}
          className="rounded-circle d-flex justify-content-center align-items-center font-weight-bold"
        >
          {name
            .toUpperCase()
            .split(" ")
            .map((n) => n[0])}
        </div>
      )}
    </>
  );
};

export default Avatar;
