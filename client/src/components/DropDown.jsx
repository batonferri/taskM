import React from "react";

const DropDown = ({
  onChange,
  defaultValue,
  name,
  options,
  className,
  width = "280px",
}) => {
  return (
    <select
      style={{
        border: "1px solid #cdcdcd",
        outline: "none",
        borderRadius: "5px",
        width: width,
      }}
      className={className}
      name={name}
      onChange={onChange}
    >
      <option value="">{defaultValue}</option>
      {options?.map((option) => (
        <option value={option.id} key={option.id}>
          {option.full_name || option.name}
        </option>
      ))}
    </select>
  );
};

export default DropDown;
