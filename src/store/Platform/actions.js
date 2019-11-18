import ACTION_TYPES from "./types";

export function openCreateNewNoteDialog() {
  return { type: ACTION_TYPES.RESPONSE_OPEN_CREATE_NEW_NOTE_DIALOG };
}

export function closeCreateNewNoteDialog(note) {
  const { title = "" } = note || {};
  return { type: ACTION_TYPES.ACTION_TYPES, note: { title } };
}

export default {
  openCreateNewNoteDialog,
  closeCreateNewNoteDialog
};
