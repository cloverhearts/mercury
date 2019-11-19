import { takeLatest, put, call } from "redux-saga/effects";
import NOTE_ACTIONS from "../Note/types";
import ACTION_TYPES from "./types";
import { requestNewNote } from "../Note/saga";

function* openNewNoteDialog(context, action) {
  yield put({ type: ACTION_TYPES.RESPONSE_OPEN_CREATE_NEW_NOTE_DIALOG });
}

function* createNewNoteOnDialog(context, action) {
  try {
    if (action.note && action.note.title) {
      yield put({ type: NOTE_ACTIONS.REQUEST_NEW_NOTE, note:  { ...action.note, redirect: true }})
    }
    yield put({ type: ACTION_TYPES.RESPONSE_CLOSE_CREATE_NEW_NOTE_DIALOG });
  } catch (error) {
    console.error(error);
  }
}

export default function* rootSaga(context) {
  yield takeLatest(ACTION_TYPES.REQUEST_OPEN_CREATE_NEW_NOTE_DIALOG, openNewNoteDialog, context);
  yield takeLatest(ACTION_TYPES.REQUEST_CLOSE_CREATE_NEW_NOTE_DIALOG, createNewNoteOnDialog, context);
}
