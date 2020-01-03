import React, { useCallback, useEffect } from "react";
import { Button } from "@blueprintjs/core";
import { useSelector, useDispatch } from "react-redux";
import PlatformActions from "../../../../store/Platform/actions";

export default props => {
  const currentNote = useSelector(state => state.note.current.note);
  const dispatch = useDispatch();

  const onClickConfigurationForNote = useCallback(() => {
    dispatch(PlatformActions.openNoteConfigDialog())
  }, [currentNote]);

  useEffect(() => {}, []);

  return currentNote && currentNote.id ? (
    <Button
      className={`bp3-minimal mercury-configuration-note-button`}
      icon="cog"
      onClick={onClickConfigurationForNote}
    />
  ) : null;
};
