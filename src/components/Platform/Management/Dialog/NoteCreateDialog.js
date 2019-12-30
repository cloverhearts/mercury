import React, { Fragment, useState, useCallback, useEffect, createRef } from "react";
import { Button, Dialog, Classes, FormGroup, InputGroup, Intent } from "@blueprintjs/core";
import { useSelector, useDispatch } from "react-redux";
import PlatformActions from "../../../../store/Platform/actions";
import "./NoteCreateDialog.scss";

export default props => {
  const titleInput = createRef();
  const isOpen = useSelector(state => state.platform.note.dialog.createNewNote.isOpen);
  const defaultTitle = useSelector(state => state.platform.note.dialog.createNewNote.default.title);
  const defaultDescription = useSelector(state => state.platform.note.dialog.createNewNote.default.description);
  const dispatch = useDispatch();
  const [disabledCreateButton, setDisabledCreateButton] = useState(false)
  const [title, setTitle] = useState(defaultTitle);
  const [description, setDescription] = useState("");
  const options = {
    autoFocus: true,
    canEscapeKeyClose: false,
    canOutsideClickClose: false,
    enforceFocus: true,
    isOpen: false,
    usePortal: true
  };

  useEffect(() => {
    setDisabledCreateButton(false);
    setTitle(defaultTitle);
    setDescription(defaultDescription);
  }, [isOpen])

  const onClose = useCallback(
    e => {
      e.preventDefault();
      dispatch(PlatformActions.closeCreateNewNoteDialog());
    },
    [isOpen]
  );

  const onCreate = useCallback(
    e => {
      e.preventDefault();
      setDisabledCreateButton(true);
      dispatch(PlatformActions.closeCreateNewNoteDialog({ title, description }));
    },
    [title, description]
  );

  const onInputTitle = e => {
    const text = e.target.value;
    setTitle(text);
  };

  const onInputDescription = e => {
    const description = e.target.value;
    setDescription(description);
  };

  return (
    <Fragment>
      <Dialog
        onClose={onClose}
        title={`Create New Note`}
        className={`mercury-create-note-dialog ${Classes.DIALOG} `}
        {...options}
        isOpen={isOpen}
      >
        <div className={`mercury-create-note-dialog-content ${Classes.DIALOG_BODY} `}>
          <FormGroup label="Note Title" labelFor="title-input" labelInfo="(required)">
            <InputGroup
              id="title-input"
              ref={titleInput}
              placeholder="Please Input for title"
              value={title}
              onChange={onInputTitle}
            />
          </FormGroup>
          <FormGroup label="Note description" labelFor="description-input">
            <InputGroup
              id="description-input"
              placeholder="Please Input for Description"
              value={description}
              onChange={onInputDescription}
            />
          </FormGroup>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button onClick={onClose}>Close</Button>
            <Button onClick={onCreate} intent={Intent.PRIMARY} disabled={!title || disabledCreateButton}>
              Create Note
            </Button>
          </div>
        </div>
      </Dialog>
    </Fragment>
  );
};
