"use client";
import React, { useEffect } from "react";
import { TreeView, TreeItem } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getAllEmployeeData, getEmployee } from "../redux/action";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const TreeComponent = ({ setsubmitButtonName, setDeletebtn }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEmployeeData());
  }, []);

  const employee = useSelector((state) => state.empList);
  function handleHR(id) {
    dispatch(getEmployee(id));
    setsubmitButtonName("Update");
    setDeletebtn("true");
  }
  function handleIT(id) {
    dispatch(getEmployee(id));
    setsubmitButtonName("Update");
    setDeletebtn("true");
  }

  document.addEventListener("click", function (e) {
    if (e.target && e.target.focus) {
      e.target.focus();
    }
  });

  return (
    <>
      <div className="tree-view">
        <h1 style={{ padding: "0", margin: "0", marginBottom: "15px" }}>
          Employee Tree
        </h1>
        <TreeView
          defaultExpandIcon={<ExpandMoreIcon />}
          defaultCollapseIcon={<ChevronRightIcon />}
          sx={{ height: 260, flexGrow: 1, maxWidth: 400, overflowY: "none" }}
        >
          <TreeItem nodeId="1" label="DEPARTMENTS">
            <TreeItem nodeId="2" label="HR">
              {employee?.map(
                (item, index) =>
                  item.departmentId === 1 && (
                    <TreeItem
                      nodeId={(index + 6).toString()}
                      label={item.employeeName}
                      onClick={() => {
                        handleHR(item.employeeId);
                      }}
                    />
                  )
              )}
            </TreeItem>
            <TreeItem nodeId="4" label="IT">
              {employee?.map(
                (item, index) =>
                  item.departmentId === 2 && (
                    <TreeItem
                      nodeId={(index + 20).toString()}
                      label={item.employeeName}
                      onClick={() => {
                        handleIT(item.employeeId);
                      }}
                    />
                  )
              )}
            </TreeItem>
          </TreeItem>
        </TreeView>
      </div>
    </>
  );
};

export default TreeComponent;
