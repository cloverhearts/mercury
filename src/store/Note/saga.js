import { takeEvery, put } from "redux-saga/effects";
import ACTION_TYPES from "./types";

function* requestNewNote(action) {
  try {
    if (!(window && window._mercury && window._mercury.system["NoteManager"])) {
      return { error: "createNote", message: "cannot found mercury note manager" };
    }
    const { title } = action.note;
    const Manager = window._mercury.system["NoteManager"]();
    const note = yield Manager.create({ title });
    yield put({ type: ACTION_TYPES.RESPONSE_NEW_NOTE, note });
  } catch (error) {
    console.error(`${action.type} ERROR ${error}`);
  }
}

export default [takeEvery(ACTION_TYPES.REQUEST_NEW_NOTE, requestNewNote)];
