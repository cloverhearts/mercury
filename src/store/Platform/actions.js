import ACTION_TYPES from "./types";

export function openCreateNewNoteDialog(note) {
  const { title = "" } = note || {};
  return { type: ACTION_TYPES.REQUEST_OPEN_CREATE_NEW_NOTE_DIALOG, note: { title } };
}

export function closeCreateNewNoteDialog(note) {
  const { title = "", description = "" } = note || {};
  return { type: ACTION_TYPES.REQUEST_CLOSE_CREATE_NEW_NOTE_DIALOG, note: { title, description } };
}

export function openRemoveNoteDialog() {
  return { type: ACTION_TYPES.REQUEST_OPEN_REMOVE_NOTE_DIALOG };
}

export function closeRemoveNoteDialog() {
  return { type: ACTION_TYPES.REQUEST_CLOSE_REMOVE_NOTE_DIALOG };
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

export function openNoteConfigDialog() {
  return { type: ACTION_TYPES.REQUEST_OPEN_NOTE_CONFIG_DIALOG }
}

export function closeNoteConfigDialog() {
  return { type: ACTION_TYPES.REQUEST_CLOSE_NOTE_CONFIG_DIALOG }
}

export function setMissingSaveNote({ note }) {
  return { type: ACTION_TYPES.REQUEST_SET_MISSING_SAVE_NOTE, note}
}

export default {
  openCreateNewNoteDialog,
  closeCreateNewNoteDialog,
  openRemoveNoteDialog,
  closeRemoveNoteDialog,
  openExportNoteDialog,
  closeExportNoteDialog,
  openImportNoteDialog,
  closeImportNoteDialog,
  openNoteConfigDialog,
  closeNoteConfigDialog,
  setMissingSaveNote
};
