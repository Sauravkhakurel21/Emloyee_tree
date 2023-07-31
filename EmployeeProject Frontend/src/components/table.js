"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import Qualification from "./qualification";
import InputField from "./inputField";
import {
  setEmployeeQualification,
  setEmployeeDocument,
  addDoclist,
  addQuallist,
  resetForm,
  deleteEmployeedetails,
  deleteEmployeeDocument,
  editQualification,
  editDocument,
  setQualOnEdit,
  fileSplit,
  setDocument,
  setDocOnEdit,
  setFileDocOnEdit,
  getQualification,
  getDocument,
} from "../redux/action";
import { useDispatch, useSelector } from "react-redux";

const table = ({ tableField1, tableField2 }) => {
  const dispatch = useDispatch();
  const [updateState, setUpdateState] = useState(-1);
  const [updateDocState, setUpdateDocState] = useState(-1);

  const [buttonName, setButtonName] = useState("Edit");
  const [buttonDocName, setButtonDocName] = useState("Edit");
  useEffect(() => {
    dispatch(getQualification());
    dispatch(getDocument());
  }, []);
  const EmpQualifications = useSelector((state) => state.empQualification);
  const empDocument = useSelector((state) => state.empDocument);
  const empDocs = useSelector((state) => state.empDocs);
  const empQuaList = useSelector((state) => state.empQuaList);
  const qualList = useSelector((state) => state.qualification);
  const documentList = useSelector((state) => state.document);

  function handleQualificationChange(e) {
    let keyValue = {};
    keyValue["field"] = e.target.name;
    keyValue["value"] = e.target.value;
    if (e.target.name == "marks") {
      keyValue["value"] = parseInt(e.target.value);
    }
    dispatch(setEmployeeQualification(keyValue));
  }

  function handleDocumentChange(e) {
    let keyValue = {};
    keyValue["field"] = e.target.name;
    keyValue["value"] = e.target.value;
    dispatch(setEmployeeDocument(keyValue));
  }

  function handlefileChange(e, name, documentType) {
    const applicationDocument = {
      file: e,
      fileName: name,
      FileType: documentType,
    };
    dispatch(fileSplit(applicationDocument));
  }

  const handleDocfileChange = async (e, item, index) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (loaded) => {
      const picture = loaded.target.result;
      const final = picture.split(",")[1];
      const name = file.name;
      const Filetype = name.split(".")[1];
      let keyValue = {};
      keyValue["field"] = e.target.name;
      keyValue["value"] = { FileType: Filetype, file: final, fileName: name };
      dispatch(
        setFileDocOnEdit({ keyValue, documentId: item.documentId, index })
      );
      handlefileChange(final, name, Filetype);
    };
    reader.readAsDataURL(file);
  };

  const UploadHandler = async (e) => {
    let keyValue = {};
    keyValue["field"] = e.target.name;
    keyValue["value"] = e.target.files[0];
    dispatch(setDocument(keyValue));
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (loaded) => {
      const picture = loaded.target.result;
      const final = picture.split(",")[1];
      const name = file.name;
      const Filetype = name.split(".")[1];
      handlefileChange(final, name, Filetype);
    };
    reader.readAsDataURL(file);
  };

  function handleAddList(e) {
    e.preventDefault();
    dispatch(addDoclist(empDocument));
  }

  function handleAddQual(e) {
    e.preventDefault();
    dispatch(addQuallist(EmpQualifications));
  }

  function handleReset(e) {
    e.preventDefault();
    dispatch(resetForm());
  }

  const onEditQual = (id, e) => {
    e.preventDefault();
    setUpdateState(id);
    setButtonName("Update");
  };

  const onEditDocs = (id, e) => {
    e.preventDefault();
    setUpdateDocState(id);
    setButtonDocName("Update");
  };

  const onDelete = (id, e) => {
    e.preventDefault();
    dispatch(deleteEmployeedetails(id));
  };

  const onDeleteDocs = (id, e) => {
    e.preventDefault();
    dispatch(deleteEmployeeDocument(id));
  };

  function handleInputQualificationForm(e, item, index) {
    let keyValue = {};
    keyValue["field"] = e.target.name;
    keyValue["value"] = e.target.value;
    dispatch(
      setQualOnEdit({ keyValue, qualificationId: item.qualificationId, index })
    );
  }

  function handleInputDocumentForm(e, item, index) {
    let keyValue = {};
    keyValue["field"] = e.target.name;
    keyValue["value"] = e.target.value;
    dispatch(setDocOnEdit({ keyValue, documentId: item.documentId, index }));
  }

  function handleQualonEdit(id, e) {
    e.preventDefault();
    dispatch(editQualification(id));
    setUpdateState(-1);
    setButtonName("Edit");
  }

  function handleDoconEdit(id, e) {
    e.preventDefault();
    dispatch(editDocument(id));
    setUpdateDocState(-1);
    setButtonDocName("Edit");
  }

  function EditQual(props) {
    return (
      <>
        <tr>
          <td className="table-data">
            <Qualification
              // id="qualificationId"
              options={qualList}
              Value_Field={props.item?.qualificationId}
              handleChange={(e) => {
                handleInputQualificationForm(e, props.item, props.index);
              }}
              Name_field="qualificationId"
            ></Qualification>
          </td>
          <td className="table-data">
            <InputField
              // Label_Name={"marks"}
              // id="marks"
              type="number"
              NameOfField="marks"
              ValueOfField={props.item?.marks}
              handleEventChange={(e) =>
                handleInputQualificationForm(e, props.item, props.index)
              }
            ></InputField>
          </td>
          <td>
            <button
              className="edit-btn"
              onClick={(e) => {
                handleQualonEdit(props.item.qualificationId, e);
                handleReset(e);
              }}
            >
              {buttonName}
            </button>
            <button
              className="del-btn "
              onClick={(e) => onDelete(props.index, e)}
            >
              Delete
            </button>
          </td>
        </tr>
      </>
    );
  }

  function EditDoc(props) {
    return (
      <>
        <tr>
          <td className="table-data">
            <Qualification
              // id="documentId"
              options={documentList}
              Value_Field={props.item?.documentId}
              handleChange={(e) => {
                handleInputDocumentForm(e, props.item, props.index);
              }}
              Name_field="documentId"
            ></Qualification>
          </td>
          <td className="table-data">
            <InputField
              // id="file"
              type="file"
              NameOfField="File"
              ValueOfField={props?.fileName}
              handleEventChange={(e) =>
                handleDocfileChange(e, props.item, props.index)
              }
            ></InputField>
          </td>
          <td>
            <button
              className="edit-btn "
              onClick={(e) => {
                handleDoconEdit(props.index, e);
                handleReset(e);
              }}
            >
              {buttonDocName}
            </button>
            <button
              className="del-btn "
              onClick={(e) => onDeleteDocs(props.index, e)}
            >
              Delete
            </button>
          </td>
        </tr>
      </>
    );
  }

  return (
    <div className="inputField">
      <div>
        <table className="table-border">
          <thead>
            <tr>
              <th className="table-heading">{tableField1}</th>
              <th className="table-heading">{tableField2}</th>
              <th className="table-heading">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <Qualification
                  // id={tableField1 == "Qualification" ? "qualificationId" : "documentId"}
                  options={
                    tableField1 == "Qualification" ? qualList : documentList
                  }
                  Name_field={
                    tableField1 == "Qualification"
                      ? "qualificationId"
                      : "documentId"
                  }
                  Value_Field={
                    tableField1 == "Qualification"
                      ? EmpQualifications?.qualificationId
                      : empDocument?.documentId
                  }
                  handleChange={(e) =>
                    tableField1 == "Qualification"
                      ? handleQualificationChange(e)
                      : handleDocumentChange(e)
                  }
                ></Qualification>
              </th>
              <th>
                <InputField
                  // id={tableField2 == "marks" ? "marks" : "file"}
                  type={tableField2 == "marks" ? "number" : "file"}
                  NameOfField={tableField2 == "marks" ? "marks" : "fileName"}
                  ValueOfField={
                    tableField2 == "marks"
                      ? EmpQualifications?.marks
                      : empDocument?.fileName
                  }
                  handleEventChange={(e) => {
                    tableField2 == "marks"
                      ? handleQualificationChange(e)
                      : UploadHandler(e);
                    //  handleDocumentChange(e);
                    // handleInputFileChange(e);
                  }}
                  accept={tableField2 == "File" && "image/png,image/jpeg"}
                ></InputField>
              </th>
              <th>
                <button
                  type="submit"
                  className="add-btn "
                  onClick={(e) => {
                    tableField1 === "Qualification"
                      ? handleAddQual(e)
                      : handleAddList(e);
                    handleReset(e);
                  }}
                >
                  Add
                </button>
              </th>
            </tr>
          </tbody>
          <tbody>
            {tableField1 == "Qualification"
              ? empQuaList?.map((item, index) => {
                  let q_index = qualList.findIndex(
                    (x) => x.key == item.qualificationId
                  );
                  return updateState === item.qualificationId ? (
                    <EditQual item={item} index={index} />
                  ) : (
                    <tr key={item.qualificationId}>
                      <td className="table-data">{qualList[q_index].value}</td>
                      <td className="table-data">{item.marks}</td>
                      <td>
                        <button
                          className="edit-btn "
                          onClick={(e) => {
                            onEditQual(item.qualificationId, e);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="del-btn"
                          onClick={(e) => onDelete(index, e)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              : empDocs?.map((item, index) => {
                  let d_index = documentList.findIndex(
                    (x) => x.key == item.documentId
                  );
                  return updateDocState === item.documentId ? (
                    <EditDoc item={item} index={index} />
                  ) : (
                    <tr key={index}>
                      <td className="table-data">
                        {documentList[d_index].value}
                      </td>
                      <td className="table-data">
                        {
                          <img
                            className="image-display"
                            src={`data:image/png;base64,${
                              item?.File?.file || item?.file
                            }`}
                            alt="Image"
                          />
                        }
                      </td>

                      <td>
                        <button
                          className="edit-btn "
                          onClick={(e) => {
                            onEditDocs(item.documentId, e);
                          }}
                        >
                          {buttonDocName}
                        </button>
                        <button
                          className="del-btn "
                          onClick={(e) => onDeleteDocs(index, e)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default table;
