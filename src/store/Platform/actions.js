import ACTION_TYPES from "./types";

export function openCreateNewNoteDialog(note) {
  const { title = "" } = note || {};
  return { type: ACTION_TYPES.REQUEST_OPEN_CREATE_NEW_NOTE_DIALOG, note: { title } };
}

export function closeCreateNewNoteDialog(note) {
  const { title = "", description = "" } = note || {};
  return { type: ACTION_TYPES.REQUEST_CLOSE_CREATE_NEW_NOTE_DIALOG, note: { title, description } };
}

export function openExportNoteDialog({ id }) {
  return { type: ACTION_TYPES.REQUEST_OPEN_EXPORT_NOTE_DIALOG, note: { id } };
}

export function closeExportNoteDialog() {
  return { type: ACTION_TYPES.REQUEST_CLOSE_EXPORT_NOTE_DIALOG };
}

export function openImportNoteDialog() {
  return { type: ACTION_TYPES.REQUEST_OPEN_IMPORT_NOTE_DIALOG };
}

export function closeImportNoteDialog() {
  return { type: ACTION_TYPES.REQUEST_CLOSE_IMPORT_NOTE_DIALOG };
}

export default {
  openCreateNewNoteDialog,
  closeCreateNewNoteDialog,
  openExportNoteDialog,
  closeExportNoteDialog,
  openImportNoteDialog,
  closeImportNoteDialog
};
