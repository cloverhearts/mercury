import ACTION_TYPES from "./types";
import moment from "moment";

export function newNote({ title, redirect }) {
  const note = { title: title || `NEW-NOTE-${moment()}` };
  return {
    type: ACTION_TYPES.REQUEST_NEW_NOTE,
    note: { ...note, redirect: !!redirect }
  };
}

export function loadNote({ noteId }) {
  const note = { id: noteId };
  return { type: ACTION_TYPES.REQUEST_LOAD_NOTE, note };
}

export function saveNote(note) {
  return { type: ACTION_TYPES.REQUEST_SAVE_NOTE, note };
}

export function removeNote({ noteId }) {
  const note = { id: noteId };
  return { type: ACTION_TYPES.REQUEST_REMOVE_NOTE, note };
}

export function unsetCurrentNote() {
  return { type: ACTION_TYPES.REQUEST_UNSET_CURRENT_NOTE };
}

export function moveToNotePage({ noteId }) {
  const note = { id: noteId };
  return { type: ACTION_TYPES.REQUEST_MOVE_TO_NOTE_PAGE, note };
}

export function listOfNote() {
  return { type: ACTION_TYPES.REQUEST_NOTE_LIST };
}

export function setSuggestSaveNote({ hasSuggestion }) {
  return {
    type: ACTION_TYPES.REQUEST_SUGGEST_SAVE_NOTE,
    hasSuggestion
  };
}


export function importNote(note) {
  return { type: ACTION_TYPES.REQUEST_IMPORT_NOTE, note}
}

export function exportNote({ id }) {
  return { type: ACTION_TYPES.REQUEST_EXPORT_NOTE, note: { id }}
}

export function clearExportNote() {
  return { type: ACTION_TYPES.CLEAR_EXPORT_NOTE}
}
export default {
  newNote,
  loadNote,
  saveNote,
  removeNote,
  listOfNote,
  moveToNotePage,
  unsetCurrentNote,
  setSuggestSaveNote,
  importNote,
  exportNote,
  clearExportNote
};
