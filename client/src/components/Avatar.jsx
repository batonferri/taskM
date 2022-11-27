import React from "react";

const Avatar = ({
  src,
  name = "",
  width = "45px",
  height = "45px",
  className = "",
}) => {
  return (
    <>
      {src ? (
        <img
          src={src}
          alt={name}
          style={{ width: width, height: height, objectFit: "cover" }}
          className={`${className} rounded-circle `}
        />
      ) : (
        <div
          style={{
            width: width,
            height: height,
            backgroundColor: "grey",
            color: "white",
          }}
          className={`${className} rounded-circle d-flex justify-content-center align-items-center font-weight-bold`}
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
