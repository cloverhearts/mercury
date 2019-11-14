import { takeEvery, put, takeLatest } from "redux-saga/effects";
import ACTION_TYPES from "./types";

function* requestNewNote(context, action) {
  try {
    if (!(window && window._mercury && window._mercury.system["NoteManager"])) {
      return {
        error: "createNote",
        message: "cannot found mercury note manager"
      };
    }
    const { router } = context;
    const { title, redirect } = action.note;
    const Manager = window._mercury.system["NoteManager"]();
    const raw = yield Manager.create({ title });
    const note = raw.data;
    yield put({ type: ACTION_TYPES.RESPONSE_NEW_NOTE, note });
    yield put({ type: ACTION_TYPES.REQUEST_NOTE_LIST });
    if (redirect) {
      router.history.push(`/notes/${note.id}`);
    }
  } catch (error) {
    console.error(`${action.type} ERROR ${error}`);
  }
}

function* requestSaveNote(context, action) {
  try {
    if (!(window && window._mercury && window._mercury.system["NoteManager"])) {
      return {
        error: "createNote",
        message: "cannot found mercury note manager"
      };
    }
    const { id } = action.note;
    const Manager = window._mercury.system["NoteManager"]();
    if (id) {
      const raw = yield Manager.save({ note: action.note });
      const note = raw.data;
      yield put({ type: ACTION_TYPES.RESPONSE_SAVE_NOTE, note });
      yield put({ type: ACTION_TYPES.REQUEST_NOTE_LIST });
    }
  } catch (error) {
    console.error(`${action.type} ERROR ${error}`);
  }
}

function* requestLoadNote(context, action) {
  try {
    if (!(window && window._mercury && window._mercury.system["NoteManager"])) {
      return {
        error: "createNote",
        message: "cannot found mercury note manager"
      };
    }
    const { id } = action.note;
    const Manager = window._mercury.system["NoteManager"]();
    if (id) {
      const raw = yield Manager.load({ noteId: id });
      const note = { ...raw.data };
      yield put({ type: ACTION_TYPES.RESPONSE_LOAD_NOTE, note });
    }
  } catch (error) {
    console.error(`${action.type} ERROR ${error}`);
  }
}

function* requestMetaListOfNote(context, action) {
  try {
    if (!(window && window._mercury && window._mercury.system["NoteManager"])) {
      return {
        error: "createNote",
        message: "cannot found mercury note manager"
      };
    }
    const Manager = window._mercury.system["NoteManager"]();
    const raw = yield Manager.list();
    const list = raw.data;
    yield put({ type: ACTION_TYPES.RESPONSE_NOTE_LIST, list });
  } catch (error) {
    console.error(`${action.type} ERROR ${error}`);
  }
}

export default function*(context) {
  yield takeEvery(ACTION_TYPES.REQUEST_NEW_NOTE, requestNewNote, context);
  yield takeEvery(ACTION_TYPES.REQUEST_SAVE_NOTE, requestSaveNote, context);
  yield takeEvery(ACTION_TYPES.REQUEST_LOAD_NOTE, requestLoadNote, context);
  yield takeEvery(ACTION_TYPES.REQUEST_NOTE_LIST, requestMetaListOfNote, context);
}
