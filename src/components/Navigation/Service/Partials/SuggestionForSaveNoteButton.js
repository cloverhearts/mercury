import React, { useCallback } from "react";
import { Button } from "@blueprintjs/core";
import { useSelector, useDispatch } from "react-redux";
import NoteAction from "../../../../store/Note/actions";

export default props => {
  const currentNote = useSelector(state => state.note.current.note);
  const suggestSaveNote = useSelector(
    state => state.note.current.suggestForSaveNote
  );
  const dispatch = useDispatch();

  const onClickSave = useCallback(() => {
    dispatch(NoteAction.saveNote({ ...currentNote }));
  }, [currentNote]);

  return currentNote && currentNote.id ? (
    <Button
      className={`bp3-minimal save-note ${suggestSaveNote ? "suggest" : null}`}
      icon="floppy-disk"
      disabled={!suggestSaveNote}
      onClick={onClickSave}
    />
  ) : null;
};
