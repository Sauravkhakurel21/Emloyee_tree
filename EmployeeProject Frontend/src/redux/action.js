export const actionTypes = {
  SET_EMPLOYEE: "SET_EMPLOYEE",
  SET_EMPLOYEE_QUALIFICATION: "SET_EMPLOYEE_QUALIFICATION",
  SET_EMPLOYEE_DOCUMENT: "SET_EMPLOYEE_DOCUMENT",
  ADD_DOCUMENT_LIST: "ADD_DOCUMENT_LIST",
  ADD_QUALIFICATION_LIST: "ADD_QUALIFICATION_LIST",
  RESET_FORM: "RESET_FORM",
  DELETE_EMPLOYEE_DETAILS: "DELETE_EMPLOYEE_DETAILS",
  DELETE_EMPLOYEE_DOCUMENT: "DELETE_EMPLOYEE_DOCUMENT",
  SET_QUALIFICATION_EDIT: "SET_QUALIFICATION_EDIT",
  EDIT_QUALIFICATION: "EDIT_QUALIFICATION",
  EDIT_DOCUMENT: "EDIT_DOCUMENT",
  GET_EMPLOYEE_DETAILS: "GET_EMPLOYEE_DETAILS",
  FILE_SPLIT: "FILE_SPLIT",
  SET_DOCUMENT: "SET_DOCUMENT",
  SET_DOCUMENT_EDIT: "SET_DOCUMENT_EDIT",
  SET_FILE_DOCUMENT: "SET_FILE_DOCUMENT",
  GET_QUALIFICATION_LIST: "GET_QUALIFICATION_LIST",
  GET_DEPARTMENT_LIST: "GET_DEPARTMENT_LIST",
  GET_DOCUMENT_LIST: "GET_DOCUMENT_LIST",
  SET_QUALIFICATION_LIST: "SET_QUALIFICATION_LIST",
  SET_DEPARTMENT_LIST: "SET_DEPARTMENT_LIST",
  SET_DOCUMENT_LIST: "SET_DOCUMENT_LIST",
  SAVE_EMPLOYEE_DETAILS: "SAVE_EMPLOYEE_DETAILS",
  GET_ALL_EMPLOYEE_DETAILS: "GET_ALL_EMPLOYEE_DETAILS",
  SET_EMPLOYEE_DETAIL: "SET_EMPLOYEE_DETAIL",
  SET_LOGIN_FORM: "SET_LOGIN_FORM",
  SET_FILE_DOCUMENT_EDIT: "SET_FILE_DOCUMENT_EDIT",
  RESET_EMPLOYEE: "RESET_EMPLOYEE",
  SET_EMPLOYEE_BY_ID_LIST: "SET_EMPLOYEE_BY_ID_LIST",
  GET_EMPLOYEE_BY_ID: "GET_EMPLOYEE_BY_ID",
  DELETE_ALL_DETAILS: "DELETE_ALL_DETAILS",
};

export const setEmployee = (data) => {
  return {
    type: actionTypes.SET_EMPLOYEE,
    data,
  };
};

export const getEmployee = (data) => {
  return {
    type: actionTypes.GET_EMPLOYEE_BY_ID,
    data,
  };
};

export const getQualification = (data) => {
  return {
    type: actionTypes.GET_QUALIFICATION_LIST,
    data,
  };
};

export const getDepartment = (data) => {
  return {
    type: actionTypes.GET_DEPARTMENT_LIST,
    data,
  };
};

export const getDocument = (data) => {
  return {
    type: actionTypes.GET_DOCUMENT_LIST,
    data,
  };
};

export const setEmployeeQualification = (data) => {
  return {
    type: actionTypes.SET_EMPLOYEE_QUALIFICATION,
    data,
  };
};

export const setEmployeeDocument = (data) => {
  return {
    type: actionTypes.SET_EMPLOYEE_DOCUMENT,
    data,
  };
};

export const addDoclist = (data) => {
  return {
    type: actionTypes.ADD_DOCUMENT_LIST,
    data,
  };
};

export const addQuallist = (data) => {
  return {
    type: actionTypes.ADD_QUALIFICATION_LIST,
    data,
  };
};

export const resetForm = () => {
  return {
    type: actionTypes.RESET_FORM,
  };
};
export const employeeReset = () => {
  return {
    type: actionTypes.RESET_EMPLOYEE,
  };
};

export const deleteEmployeedetails = (data) => {
  return {
    type: actionTypes.DELETE_EMPLOYEE_DETAILS,
    data,
  };
};

export const deleteEmployeeDocument = (data) => {
  return {
    type: actionTypes.DELETE_EMPLOYEE_DOCUMENT,
    data
  };
};

export const setQualOnEdit = (data) => {
  return {
    type: actionTypes.SET_QUALIFICATION_EDIT,
    data,
  };
};

export const editQualification = (data) => {
  return {
    type: actionTypes.EDIT_QUALIFICATION,
    data,
  };
};

export const editDocument = (data) => {
  return {
    type: actionTypes.EDIT_DOCUMENT,
    data,
  };
};

export const setDocument = (data) => {
  return {
    type: actionTypes.SET_DOCUMENT,
    data,
  };
};

export const setFileDocument = (data) => {
  return {
    type: actionTypes.SET_FILE_DOCUMENT,
    data,
  };
};

export const fileSplit = (data) => {
  return {
    type: actionTypes.FILE_SPLIT,
    data,
  };
};

export const setDocOnEdit = (data) => {
  return {
    type: actionTypes.SET_DOCUMENT_EDIT,
    data,
  };
};

export const setFileDocOnEdit = (data) => {
  return {
    type: actionTypes.SET_FILE_DOCUMENT_EDIT,
    data,
  };
};

export const saveDetails = (data) => {
  return {
    type: actionTypes.SAVE_EMPLOYEE_DETAILS,
    data,
  };
};

export const getAllEmployeeData = (data) => {
  return {
    type: actionTypes.GET_ALL_EMPLOYEE_DETAILS,
    data,
  };
};

export const setLoginForm = (data) => {
  return {
    type: actionTypes.SET_LOGIN_FORM,
    data,
  };
};

export const deleteAllDetails = (data) => {
  return {
    type: actionTypes.DELETE_ALL_DETAILS,
    data,
  };
};