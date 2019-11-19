import React, { Fragment, useState, useCallback, useEffect } from "react";
import { Button, Dialog, Classes, Intent } from "@blueprintjs/core";
import { useSelector, useDispatch } from "react-redux";
import PlatformActions from "../../../../store/Platform/actions";
import "./NoteCreateDialog.scss";

export default props => {
  const isOpen = useSelector(state => state.platform.note.dialog.createNewNote.isOpen);
  const defaultTitle = useSelector(state => state.platform.note.dialog.createNewNote.default.title);
  const dispatch = useDispatch();
  const [title, setTitle] = useState(defaultTitle);
  const [options, setOptions] = useState({
    autoFocus: true,
    canEscapeKeyClose: false,
    canOutsideClickClose: false,
    enforceFocus: true,
    isOpen: false,
    usePortal: true
  });
  const onClose = useCallback(e => {
    e.preventDefault();
    dispatch(PlatformActions.closeCreateNewNoteDialog());
  }, []);

  const onCreate = useCallback(
    e => {
      e.preventDefault();
      dispatch(PlatformActions.closeCreateNewNoteDialog({ title }));
    },
    [title]
  );

  return (
    <Fragment>
      <Dialog
        onClose={onClose}
        title={`Create New Note`}
        className={`mercury-create-note-dialog ${Classes.DIALOG} `}
        {...options}
        isOpen={isOpen}
      >
        <div className={`mercury-create-note-dialog-content ${Classes.DIALOG_BODY} `}>body</div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button onClick={onClose}>Close</Button>
            <Button onClick={onCreate}>Create Note</Button>
          </div>
        </div>
      </Dialog>
    </Fragment>
  );
};
