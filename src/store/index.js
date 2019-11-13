import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import Note from "./Note";

function create(context) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(combineReducers({ note: Note.reducer }), compose(applyMiddleware(sagaMiddleware)));

  function* sagas() {
    return yield all([Note.saga(context)]);
  }

  sagaMiddleware.run(sagas);
  return store;
}

export default create;
