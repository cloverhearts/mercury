import React, { useCallback, useEffect } from "react";
import { Button } from "@blueprintjs/core";
import { useSelector, useDispatch } from "react-redux";
import PlatformActions from "../../../../store/Platform/actions";

import './RemoveNoteButton.scss'

export default props => {
  const currentNote = useSelector(state => state.note.current.note);
  const dispatch = useDispatch();

  const onClickExport = useCallback(() => {
    dispatch(PlatformActions.openRemoveNoteDialog());
  }, [currentNote]);

  useEffect(() => {}, []);

  return currentNote && currentNote.id ? (
    <Button
      className={`bp3-minimal mercury-remove-note-button`}
      icon="trash"
      onClick={onClickExport}
    />
  ) : null;
};
