import ACTION_TYPES from "./types";

export function openCreateNewNoteDialog(note) {
  const { title = "" } = note || {};
  return { type: ACTION_TYPES.REQUEST_OPEN_CREATE_NEW_NOTE_DIALOG, note: { title } };
}

export function closeCreateNewNoteDialog(note) {
  const { title = "" } = note || {};
  return { type: ACTION_TYPES.REQUEST_CLOSE_CREATE_NEW_NOTE_DIALOG, note: { title } };
}

export default {
  openCreateNewNoteDialog,
  closeCreateNewNoteDialog
};
