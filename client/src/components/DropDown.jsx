import React from "react";

const DropDown = ({ onChange, defaultValue, name, options }) => {
  return (
    <select
      style={{
        border: "1px solid #cdcdcd",
        outline: "none",
        borderRadius: "5px",
        width: "280px",
      }}
      className="browser-default custom-select .dropdown-primary"
      name={name}
      onChange={onChange}
    >
      <option value={null}>{defaultValue}</option>
      {options?.map((option) => (
        <option value={option.id} key={option.id}>
          {option.full_name || option.name}
        </option>
      ))}
    </select>
  );
};

export default DropDown;
