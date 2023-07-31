import { actionTypes } from "./action";
import { put, takeEvery, call } from "redux-saga/effects";
import axios from "axios";

function* getQualificationList() {
  try {
    const qualList = yield axios.get(
      "https://localhost:7019/Employees/GetQualificationDrop"
    );
    const data = qualList.data;
    yield put({ type: actionTypes.SET_QUALIFICATION_LIST, data });
  } catch (e) {
    console.log(e);
  }
}

function* getEmployeeById(action) {
  try {
    const empList = yield axios.get(
      `https://localhost:7019/Employees/FetchAllData/${action.data}`
    );
    const data = empList.data;
    console.log(data);
    yield put({ type: actionTypes.SET_EMPLOYEE_BY_ID_LIST, data });
  } catch (e) {
    console.log(e);
  }
}

function* getEmployeeDetails() {
  console.log("wertyuidfghjkl");
  try {
    const res = yield axios.get(
      "https://localhost:7019/Employees/GetEmployeeByDepartId"
    );
    const data = res.data;
    yield put({ type: actionTypes.SET_EMPLOYEE_DETAIL, data });
  } catch (e) {
    console.log(e);
  }
}

function* getDepartmentList() {
  try {
    const res = yield axios.get(
      "https://localhost:7019/Employees/GetAllDepartments"
    );

    const data = res.data;
    yield put({ type: actionTypes.SET_DEPARTMENT_LIST, data });
  } catch (e) {
    console.log(e);
  }
}

function* getDocumentList() {
  try {
    const res = yield axios.get("https://localhost:7019/Employees/GetDocument");

    const data = res.data;
    yield put({ type: actionTypes.SET_DOCUMENT_LIST, data });
  } catch (e) {
    console.log(e);
  }
}

function* deleteEmployeeDetails(action) {
  console.log(action.data, "id to delete");
  try {
    yield axios.delete(
      `https://localhost:7019/Employees/DeleteEmployeeInfo/${action.data}`
    );
    yield call(getEmployeeDetails);
  } catch (e) {
    console.log(e);
  }
}

function* saveEmpoyeeDetails(action) {
  console.log(action.data, "data that is sent to api");
  if (action.data.employeeId == 0) {
    try {
      const resp = yield axios.post(
        "https://localhost:7019/Employee/AddNewEmp",
        action.data
      );
      yield call(getEmployeeDetails);
      alert("File is submitted successfully");
    } catch (e) {
      console.log("error", e.message);
    }
  } else if (action.data.employeeId > 0) {
    try {
      const resp = yield axios.put(
        `https://localhost:7019/Employees/EditEmployeeInfo/${action.data.employeeId}`,
        action.data
      );
      yield call(getEmployeeDetails);
      alert("File is edited successfully");
      console.log(resp, "Data that is sent to API");
    } catch (e) {
      console.log("error", e.message);
    }
  }
}

function* employeeSaga() {
  yield takeEvery(actionTypes.GET_QUALIFICATION_LIST, getQualificationList);
  yield takeEvery(actionTypes.GET_DEPARTMENT_LIST, getDepartmentList);
  yield takeEvery(actionTypes.GET_DOCUMENT_LIST, getDocumentList);
  yield takeEvery(actionTypes.SAVE_EMPLOYEE_DETAILS, saveEmpoyeeDetails);
  yield takeEvery(actionTypes.GET_ALL_EMPLOYEE_DETAILS, getEmployeeDetails);
  yield takeEvery(actionTypes.GET_EMPLOYEE_BY_ID, getEmployeeById);
  yield takeEvery(actionTypes.DELETE_ALL_DETAILS, deleteEmployeeDetails);
}
export default employeeSaga;
