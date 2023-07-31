"use client";
import React from "react";

function InputField({
  id,
  Label_Name,
  type,
  NameOfField,
  ValueOfField,
  handleEventChange,
  accept,
}) {
  return (
    <div className="Username-cmp">
      <label className="input-label">{Label_Name}</label>
      <input
        className="input-field"
        id={id}
        type={type}
        name={NameOfField}
        autoComplete="off"
        value={ValueOfField}
        onChange={handleEventChange}
        accept={accept}
      />
    </div>
  );
}

export default InputField;
