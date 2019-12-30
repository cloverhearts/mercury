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

function* openExportNoteDialog(context, action) {
  yield put({ type: ACTION_TYPES.RESPONSE_OPEN_EXPORT_NOTE_DIALOG, note: action.note });
}

function* closeExportNoteDialog(context, action) {
  yield put({ type: ACTION_TYPES.RESPONSE_CLOSE_EXPORT_NOTE_DIALOG });
}

function* openImportNoteDialog(context, action) {
  yield put({ type: ACTION_TYPES.RESPONSE_OPEN_IMPORT_NOTE_DIALOG });
}

function* closeImportNoteDialog(context, action) {
  yield put({ type: ACTION_TYPES.RESPONSE_CLOSE_IMPORT_NOTE_DIALOG });
}

function* openNoteConfigDialog(context, action) {
  yield put({ type: ACTION_TYPES.RESPONSE_OPEN_NOTE_CONFIG_DIALOG })
}

function* closeNoteConfigDialog(context, action) {
  yield put({ type: ACTION_TYPES.RESPONSE_CLOSE_NOTE_CONFIG_DIALOG })
}

function* openRemoveNoteDialog(context, action) {
  yield put({ type: ACTION_TYPES.RESPONSE_OPEN_REMOVE_NOTE_DIALOG })
}

function* closeRemoveNoteDialog(context, action) {
  yield put({ type: ACTION_TYPES.RESPONSE_CLOSE_REMOVE_NOTE_DIALOG })
}

export default function* rootSaga(context) {
  yield takeLatest(ACTION_TYPES.REQUEST_OPEN_CREATE_NEW_NOTE_DIALOG, openNewNoteDialog, context);
  yield takeLatest(ACTION_TYPES.REQUEST_CLOSE_CREATE_NEW_NOTE_DIALOG, createNewNoteOnDialog, context);
  yield takeLatest(ACTION_TYPES.REQUEST_OPEN_EXPORT_NOTE_DIALOG, openExportNoteDialog, context);
  yield takeLatest(ACTION_TYPES.REQUEST_CLOSE_EXPORT_NOTE_DIALOG, closeExportNoteDialog, context);
  yield takeLatest(ACTION_TYPES.REQUEST_OPEN_IMPORT_NOTE_DIALOG, openImportNoteDialog, context);
  yield takeLatest(ACTION_TYPES.REQUEST_CLOSE_IMPORT_NOTE_DIALOG, closeImportNoteDialog, context);
  yield takeLatest(ACTION_TYPES.REQUEST_OPEN_NOTE_CONFIG_DIALOG, openNoteConfigDialog, context);
  yield takeLatest(ACTION_TYPES.REQUEST_CLOSE_NOTE_CONFIG_DIALOG, closeNoteConfigDialog, context);
  yield takeLatest(ACTION_TYPES.REQUEST_OPEN_REMOVE_NOTE_DIALOG, openRemoveNoteDialog, context);
  yield takeLatest(ACTION_TYPES.REQUEST_CLOSE_REMOVE_NOTE_DIALOG, closeRemoveNoteDialog, context);
}
