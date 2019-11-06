import ACTION_TYPES from "./types";
import moment from "moment";

export function newNote({ title, redirect }) {
  const note = { title: title || `NEW-NOTE-${moment()}` };
  return { type: ACTION_TYPES.REQUEST_NEW_NOTE, note, redirect: !!redirect };
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

export function moveToNotePage({ noteId }) {
  const note = { id: noteId };
  return { type: ACTION_TYPES.REQUEST_MOVE_TO_NOTE_PAGE, note };
}

export default {
  newNote,
  loadNote,
  saveNote,
  removeNote,
  moveToNotePage
};
