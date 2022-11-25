import React from "react";

const Avatar = ({
  src,
  name,
  width = "45px",
  height = "45px",
  className = "rounded-circle",
}) => {
  return (
    <>
      {src ? (
        <img
          src={src}
          alt={name}
          style={{ width: "45px", height: "45px", objectFit: "cover" }}
          className={className}
        />
      ) : (
        <div
          style={{
            width: width,
            height: height,
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
