import React from "react";
import { Button } from "@blueprintjs/core";
import { useSelector } from "react-redux";

export default props => {
  const currentNote = useSelector(state => state.note.current.note);
  const suggestSaveNote = useSelector(
    state => state.note.current.suggestForSaveNote
  );

  return currentNote && currentNote.id ? (
    <Button
      className={`bp3-minimal save-note ${suggestSaveNote ? "suggest" : null}`}
      icon="floppy-disk"
      disabled={!suggestSaveNote}
    />
  ) : null;
};
