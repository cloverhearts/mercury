import React, { useCallback, useEffect } from "react";
import { Button } from "@blueprintjs/core";
import { useSelector, useDispatch } from "react-redux";
import NoteAction from "../../../../store/Note/actions";
import './SuggestionForSaveNoteButton.scss'
import debounce from 'lodash/debounce'
export default props => {
  const currentNote = useSelector(state => state.note.current.note);
  const suggestSaveNote = useSelector(state => state.note.current.suggestForSaveNote);
  const dispatch = useDispatch();

  const onClickSave = useCallback(debounce(() => {
    dispatch(NoteAction.saveNote(currentNote));
  }, 500), [currentNote]);

  useEffect(() => {}, []);
  return currentNote && currentNote.id ? (
    <Button
      className={`bp3-minimal mercury-save-note-button mercury-suggestion-save-note-button ${suggestSaveNote ? "suggest" : null}`}
      icon="floppy-disk"
      onClick={onClickSave}
    />
  ) : '';
};
