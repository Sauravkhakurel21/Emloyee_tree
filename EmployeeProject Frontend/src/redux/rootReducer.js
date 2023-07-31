import { actionTypes } from "./action";

var initialState = {
  employee: {
    employeeId: 0,
    employeeName: "",
    employeeEmail: "",
    employeePhone: "",
    departmentName: "",
    departmentId: 0,
    empQualification: [],
    empDocument: [],
  },
  empQualification: {
    qualificationId: 0,
    qualificationName: "",
    marks: "",
  },
  empDocument: {
    documentId: 0,
    documentType: "",
    File: {
      file: "",
      fileName: "",
      FileType: "",
    },
  },
  qualification: [],
  document: [],
  department: [],
  empList: [],
  empQuaList: [],
  empDocs: [],
};

const empReducer = (state = initialState, action) => {
  let obj;
  let updateState = Object.assign({}, state);
  switch (action.type) {
    case actionTypes.SET_EMPLOYEE:
       obj = {};
      obj[action.data.field] = action.data.value;
      let newObj = Object.assign({}, state.employee, obj);
      return {
        ...state,
        employee: newObj,
      };

    case actionTypes.SET_QUALIFICATION_LIST:
      let qualification = action.data.map((item, index) => {
        return { value: item.qualificationName, key: item.qualificationId };
      });
      return {
        ...state,
        qualification: qualification,
      };

    case actionTypes.SET_DOCUMENT_LIST:
      let document = action.data.map((item, index) => {
        return { value: item.documentType, key: item.documentId };
      });
      return {
        ...state,
        document: document,
      };

    case actionTypes.SET_LOGIN_FORM:
      return {
        ...state,
        employee: action.data,
      };

    case actionTypes.SET_DEPARTMENT_LIST:
      let department = action.data.map((item, index) => {
        return { value: item.departmentName, key: item.departmentId };
      });
      return {
        ...state,
        department: department,
      };

    case actionTypes.SET_EMPLOYEE_QUALIFICATION:
      obj = {};
      obj[action.data.field] = action.data.value;
      let newQualObj = Object.assign({}, state.empQualification, obj);
      return {
        ...state,
        empQualification: newQualObj,
      };

    case actionTypes.SET_EMPLOYEE_DOCUMENT:
      obj = {};
      obj[action.data.field] = action.data.value;
      let newdocObj = Object.assign({}, state.empDocument, obj);
      return {
        ...state,
        empDocument: newdocObj,
      };

    case actionTypes.SET_DOCUMENT:
      obj = {};
      obj[action.data.field] = action.data.value.name;
      let filedoc = Object.assign({}, state.empDocument.File.fileName, obj);
      return {
        ...state,
        empDocument: {
          ...state.empDocument,
          File: { ...state.empDocument.File, fileName: filedoc.fileName },
        },
      };

    case actionTypes.SET_FILE_DOCUMENT:
      obj = {};
      obj[action.data.keyValue.field] = action.data.keyValue.name;
      let fileDoc = Object.assign({}, state.empDocument.File.fileName, obj);
      return {
        ...state,
        empDocument: {
          ...state.empDocument,
          File: { ...state.empDocument.File, fileName: fileDoc.fileName },
        },
      };

    case actionTypes.ADD_DOCUMENT_LIST:
      return {
        ...state,
        empDocs: [...state.empDocs, action.data],
      };

    case actionTypes.ADD_QUALIFICATION_LIST:
      return {
        ...state,
        empQuaList: [...state.empQuaList, action.data],
      };

    case actionTypes.RESET_FORM:
      return {
        ...state,
        empQualification: initialState.empQualification,
        empDocument: initialState.empDocument,
      };

    case actionTypes.RESET_EMPLOYEE:
      return {
        ...state,
        employee: initialState.employee,
        empQuaList: [],
        empDocs: [],
      };

    case actionTypes.DELETE_EMPLOYEE_DETAILS:
      let ind = state.empQuaList.findIndex((x, index) => index == action.data);
      state.empQuaList.splice(ind, 1);
      let newlist = Object.assign([], state.empQuaList);
      return {
        ...state,
        empQuaList: newlist,
      };

    case actionTypes.DELETE_EMPLOYEE_DOCUMENT:
      let d_ind = state.empDocs.findIndex(
        (x, index) => x.d_id == action.data || index == action.data
      );

      state.empDocs.splice(d_ind, 1);
      let newdoclist = Object.assign([], state.empDocs);
      return {
        ...state,
        empDocs: newdoclist,
      };

    case actionTypes.EDIT_QUALIFICATION:
  
      let editObj = state.empQuaList.find(
        (x) => x.qualificationId === action.data
      );
      let editData = Object.assign({}, state.empQualification, editObj);
      return {
        ...state,
        empQualification: editData,
      };

    case actionTypes.EDIT_DOCUMENT:
      let editDoc = state.empDocs.find((x, index) => index === action.data);
      let edit_Data = Object.assign({}, state.empDocument, editDoc);
      return {
        ...state,
        empDocument: edit_Data,
      };

    case actionTypes.SET_EMPLOYEE_DETAIL:
      return {
        ...state,
        empList: action.data,
      };

    case actionTypes.SET_EMPLOYEE_BY_ID_LIST:
      const fileArr = Object.assign([], action.data.documentFiles);
      const qualArr = Object.assign([], action.data.qualifications);

      return {
        ...state,
        employee: action.data,
        empQuaList: qualArr,
        empDocs: fileArr,
      };

    case actionTypes.FILE_SPLIT:
      let empfile = Object.assign({}, state.File, action.data);
      return {
        ...state,
        empDocument: {
          ...state.empDocument,
          File: {
            ...state.empDocument.File,
            file: empfile.file,
            fileName: empfile.fileName,
            FileType: empfile.FileType,
          },
        },
      };

    case actionTypes.SET_QUALIFICATION_EDIT:
      const { keyValue, index } = action.data;
      obj = {};
      obj[keyValue.field] = keyValue.value;
      let qalObj = state.empQuaList.find(
        (x, index) => index == action.data.index
      );
      let newobj = Object.assign({}, qalObj, obj);
      let qalList = state.empQuaList.map((qObj, index) =>
        index == action.data.index ? newobj : qObj
      );
      return {
        ...state,
        empQuaList: qalList,
      };

    case actionTypes.SET_DOCUMENT_EDIT:
      obj = {};
      obj[action.data.keyValue.field] = action.data.keyValue.value;
      let docObj = state.empDocs.find((x, index) => index == action.data.index);
      let newdocobj = Object.assign({}, docObj, obj);
      let docList = state.empDocs.map((qObj, index) =>
        index == action.data.index ? newdocobj : qObj
      );
      return {
        ...state,
        empDocs: docList,
      };

    case actionTypes.SET_FILE_DOCUMENT_EDIT:
      obj = {};
      obj[action.data.keyValue.field] = action.data.keyValue.value;
      let docfObj = state.empDocs.find(
        (x, index) => index == action.data.index
      );
      let newfdocobj = Object.assign({}, docfObj, obj);
      let docfList = state.empDocs.map((qObj, index) =>
        index == action.data.index ? newfdocobj : qObj
      );
      return {
        ...state,
        empDocs: docfList,
      };

    default:
      return updateState;
  }
};

export default empReducer;
