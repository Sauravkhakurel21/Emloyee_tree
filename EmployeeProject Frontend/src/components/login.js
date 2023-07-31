"use client";

import React from "react";
import InputField from "./inputField";
import Table from "./table";
import { useDispatch, useSelector } from "react-redux";
import Qualification from "./qualification";
import { setEmployee } from "../redux/action";
import TreeComponent from "./treeComponent";
import { useState } from "react";

import {
  getDepartment,
  saveDetails,
  employeeReset,
  deleteAllDetails,
} from "../redux/action";
import { useEffect } from "react";

function loginForm() {
  const dispatch = useDispatch();
  const [submitButtonName, setSubmitButtonName] = useState("Submit");
  const [deletebtn, setdeletebtn] = useState("false");

  useEffect(() => {
    dispatch(getDepartment());
  }, []);

  const employeedetails = useSelector((state) => state.employee);
  const deptName = useSelector((state) => state.department);
  const empDocs = useSelector((state) => state.empDocs);
  const empQuaList = useSelector((state) => state.empQuaList);
  function handleEventChange(e) {
    let keyValue = {};
    keyValue["field"] = e.target.name;
    keyValue["value"] = e.target.value;
    dispatch(setEmployee(keyValue));
  }

  function handleSubmitForm(e) {
    e.preventDefault();
    employeedetails.qualifications = empQuaList;
    employeedetails.documentFiles = empDocs?.map((x) => ({
      file: x.File?.file || x.file,
      documentId: x.documentId,
      documentType: x.File?.FileType || x.FileType,
      fileName: x.File?.fileName || x.fileName,
    }));

    dispatch(saveDetails(employeedetails));
    dispatch(employeeReset());
    setSubmitButtonName("Submit");
    setdeletebtn("false");
  }

  function handleSubmitDeleteForm(e) {
    e.preventDefault();
    const eid = employeedetails.employeeId;
    console.log(eid, "eid");
    dispatch(deleteAllDetails(eid));
    dispatch(employeeReset());
  }

  return (
    <div className="form-container">
      <form className="form-c">
        <h1>Employee Form</h1>
        <InputField
          // id="employee Name "

          Label_Name="Employee Name "
          type="text"
          NameOfField="employeeName"
          ValueOfField={employeedetails?.employeeName}
          handleEventChange={handleEventChange}
        />
        <br></br>
        <InputField
          // id="address"
          Label_Name="Employee Email "
          type="email"
          NameOfField="employeeEmail"
          ValueOfField={employeedetails?.employeeEmail}
          handleEventChange={handleEventChange}
        />
        <br></br>
        <InputField
          // id="contact no"
          Label_Name="Contact No. "
          type="number"
          NameOfField="employeePhone"
          ValueOfField={employeedetails?.employeePhone}
          handleEventChange={handleEventChange}
        />
        <br></br>
        <Qualification
          // id="department"
          label_name="Department "
          options={deptName}
          Name_field="departmentId"
          Value_Field={employeedetails?.departmentId}
          handleChange={handleEventChange}
        ></Qualification>
        <br />
        <Table tableField1={"Qualification"} tableField2={"marks"} />
        <br />
        <Table tableField1={"Document Type"} tableField2={"File"} />

        <br />
        <div>
          <button
            className="submit-btn"
            onClick={(e) => {
              handleSubmitForm(e);
            }}
          >
            {submitButtonName}
          </button>
          {deletebtn === "true" && (
            <button
              className="submit-delete-btn"
              style={{ marginLeft: "15px" }}
              onClick={(e) => {
                handleSubmitDeleteForm(e);
              }}
            >
              Delete
            </button>
          )}
        </div>
      </form>
      <div className="tree-view">
        <TreeComponent
          setsubmitButtonName={setSubmitButtonName}
          setDeletebtn={setdeletebtn}
        />
      </div>
    </div>
  );
}

export default loginForm;
