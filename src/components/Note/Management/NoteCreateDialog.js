import React, { useCallback, Fragment, useEffect } from "react";
import { Button, Dialog, Classes, Intent } from "@blueprintjs/core";

import "./NoteCreateDialog.scss";

export default props => {
  const { onClose = () => {}, isOpen = false } = props;

  const options = {
    autoFocus: true,
    canEscapeKeyClose: false,
    canOutsideClickClose: false,
    enforceFocus: true,
    isOpen: isOpen,
    usePortal: true
  };

  const closeHandler = useCallback(
    e => {
      console.log("closed ", e);
      onClose(e);
    },
    [onClose]
  );

  const onCreateNoteHandler = useCallback(
    e => {
      console.log("open ", e);
      onClose(e);
    },
    [onClose]
  );

  useEffect(() => {
    console.log("CC", options);
  }, [options, isOpen]);

  return (
    <Fragment>
      <Dialog
        onClose={onClose}
        title={`Create New Note`}
        className={`mercury-create-note-dialog ${Classes.DIALOG} `}
        {...options}
      >
        <div className={`mercury-create-note-dialog-content ${Classes.DIALOG_BODY} `}>body</div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button onClick={closeHandler}>Close</Button>
            <Button onClick={onCreateNoteHandler}>Create Note</Button>
          </div>
        </div>
      </Dialog>
    </Fragment>
  );
};
