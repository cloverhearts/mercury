import { takeEvery, put, takeLatest } from "redux-saga/effects";
import ACTION_TYPES from "./types";
import PLATFORM_ACTION_TYPES from "../Platform/types";
import MercuryCore from "mercury-core";

export function* requestNewNote(context, action) {
  try {
    if (!(window && window._mercury && window._mercury.system["NoteManager"])) {
      return {
        error: "createNote",
        message: "cannot found mercury note manager"
      };
    }
    const { router } = context;
    const { title, description, redirect } = action.note;
    const Manager = window._mercury.system["NoteManager"]();
    const raw = yield Manager.create({ title, description });
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
        error: 'saveNote',
        message: 'cannot found mercury note manager',
      };
    }

    const { id } = action.note;

    const Manager = window._mercury.system["NoteManager"]();
    if (id) {
      const serializedNote = action.note.toSerialize();
      const raw = yield Manager.save({ note: serializedNote });
      const note = raw.data;
      if (window._mercury.notification) {
        window._mercury.notification.log('SAVED')
      }
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
      throw new Error({
        error: "createNote",
        message: "cannot found mercury note manager"
      });
    }
    const Manager = window._mercury.system["NoteManager"]();
    const raw = yield Manager.list();
    const list = raw.data;
    yield put({ type: ACTION_TYPES.RESPONSE_NOTE_LIST, list });
  } catch (error) {
    console.error(`${action.type} ERROR ${error}`);
  }
}

function* requestExportNote(context, action) {
  try {
    if (!(window && window._mercury && window._mercury.system["NoteManager"])) {
      throw new Error({
        error: "exportNote",
        message: "cannot found mercury note manager"
      });
    }

    const { id } = action.note;
    const Manager = window._mercury.system["NoteManager"]();
    const raw = yield Manager.export({ noteId: id });
    const note = raw.data;
    yield put({ type: ACTION_TYPES.RESPONSE_EXPORT_NOTE, note });
  } catch (error) {
    console.error(`${action.type} ERROR ${error}`);
  }
}

function* requestImportNote(context, action) {
  try {
    if (!(window && window._mercury && window._mercury.system["NoteManager"])) {
      throw new Error({
        error: "importNote",
        message: "cannot found mercury note manager"
      });
    }

    const { router } = context;
    const Manager = window._mercury.system["NoteManager"]();
    const raw = yield Manager.import({ note: action.note });
    const note = raw.data;
    yield put({ type: ACTION_TYPES.REQUEST_NOTE_LIST });
    yield put({
      type: PLATFORM_ACTION_TYPES.RESPONSE_CLOSE_IMPORT_NOTE_DIALOG
    });
    yield put({ type: ACTION_TYPES.RESPONSE_IMPORT_NOTE, note });
    router.history.push(`/notes/${note.id}`);
  } catch (error) {
    console.error(`${action.type} ERROR ${error}`);
  }
}

function* requestExecuteCodeContainer(context, action) {
  try {
    if (!action.container) {
      throw new Error(`Code Container object is empty`);
    }
    const reporter = action.container;
    const executor = yield reporter.getCommandFunction();
    if (executor) {
      executor();
    } else {
      console.error("cannot found executor");
    }
    yield put({ type: ACTION_TYPES.RESPONSE_EXECUTE_CODE_CONTAINER })
  } catch (error) {
    console.error(`${action.type} ERROR ${error}`);
  }
}

export default function*(context) {
  yield takeEvery(ACTION_TYPES.REQUEST_NEW_NOTE, requestNewNote, context);
  yield takeLatest(ACTION_TYPES.REQUEST_SAVE_NOTE, requestSaveNote, context);
  yield takeLatest(ACTION_TYPES.REQUEST_LOAD_NOTE, requestLoadNote, context);
  yield takeEvery(
    ACTION_TYPES.REQUEST_NOTE_LIST,
    requestMetaListOfNote,
    context
  );
  yield takeLatest(
    ACTION_TYPES.REQUEST_EXPORT_NOTE,
    requestExportNote,
    context
  );
  yield takeLatest(
    ACTION_TYPES.REQUEST_IMPORT_NOTE,
    requestImportNote,
    context
  );
  yield takeLatest(
    ACTION_TYPES.REQUEST_EXECUTE_CODE_CONTAINER,
    requestExecuteCodeContainer,
    context
  );
}
