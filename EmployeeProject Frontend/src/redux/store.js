
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import empReducer from "./rootReducer";
import employeeSaga from "./rootSaga";

const sagaMiddleWare = createSagaMiddleware();
const store = applyMiddleware(sagaMiddleWare)(createStore)(empReducer);
sagaMiddleWare.run(employeeSaga);

export default store;
