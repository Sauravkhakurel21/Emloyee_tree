import React from "react";

function Qualification({
  id,
  label_name,
  options,
  Name_field,
  Value_Field,
  handleChange,
}) {
  return (
    <div className="qualification-cmp">
      <label className="input-label"> {label_name}</label>
      <select
        className="input-field"
        id={id}
        name={Name_field}
        value={Value_Field}
        onChange={handleChange}
        style={{ fontSize: "1rem", textAlign: "center" }}
      >
        <option style={{ textAlign: "center" }}>Select one</option>
        {options?.map((x) => (
          <option value={x.key}>{x.value}</option>
        ))}
      </select>
    </div>
  );
}

export default Qualification;
