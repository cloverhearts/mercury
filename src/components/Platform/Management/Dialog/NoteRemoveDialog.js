import React, {
  Fragment,
  useState,
  useCallback,
  useEffect,
} from "react";
import {
  Button,
  Dialog,
  Classes,
  Intent
} from "@blueprintjs/core";
import { useSelector, useDispatch } from "react-redux";
import PlatformActions from "../../../../store/Platform/actions";
import NoteAction from "../../../../store/Note/actions";

import "./NoteRemoveDialog.scss";

export default props => {
  const isOpen = useSelector(
    state => state.platform.note.dialog.removeNote.isOpen
  );
  const [removeStatus, setRemoveStatus] = useState(false)
  const currentNote = useSelector(state => state.note.current.note);
  const dispatch = useDispatch();
  const options = {
    autoFocus: true,
    canEscapeKeyClose: false,
    canOutsideClickClose: false,
    enforceFocus: true,
    isOpen: false,
    usePortal: true
  };

  const onClose = useCallback(
    e => {
      e.preventDefault();
      dispatch(PlatformActions.closeRemoveNoteDialog());
    },
    [isOpen]
  );

  const onReplace = useCallback(
    e => {
      e.preventDefault();
      if (currentNote) {
        dispatch(
          NoteAction.removeNote({ noteId: currentNote.id, redirect: true })
        );
        dispatch(
          PlatformActions.closeRemoveNoteDialog()
        );
        setRemoveStatus(true)
      }
    },
    [currentNote]
  );

  useEffect(() => {
    setRemoveStatus(false)
  }, [currentNote])

  return (
    <Fragment>
      <Dialog
        onClose={onClose}
        title={`Remove Note`}
        className={`mercury-remove-note-dialog ${Classes.DIALOG} `}
        {...options}
        isOpen={isOpen}
      >
        <div
          className={`mercury-remove-note-dialog-content ${Classes.DIALOG_BODY} `}
        >
          Are you sure to remove a this note?
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button onClick={onClose}>Close</Button>
            <Button onClick={onReplace} intent={Intent.DANGER} disabled={removeStatus}>
              Remove Note
            </Button>
          </div>
        </div>
      </Dialog>
    </Fragment>
  );
};
