import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import Note from "./Note";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(combineReducers({ note: Note.reducer }), compose(applyMiddleware(sagaMiddleware)));

function* sagas() {
  return yield all([...Note.saga]);
}

sagaMiddleware.run(sagas);

export default store;
