import { takeLatest } from "redux-saga/effects";
import ACTION_TYPES from "./types";

function* createNewNoteOnDialog(context, action) {
  try {
    console.log("createNewNoteOnDialog");
  } catch (error) {
    console.error(error);
  }
}

export default function* rootSaga(context) {
  yield takeLatest(ACTION_TYPES.REQUEST_OPEN_CREATE_NEW_NOTE_DIALOG, createNewNoteOnDialog, context);
}
