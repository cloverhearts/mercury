import React, { Fragment, useState, useCallback, useEffect, createRef } from "react";
import { Button, Dialog, Classes, FormGroup, InputGroup, Intent } from "@blueprintjs/core";
import { useSelector, useDispatch } from "react-redux";
import PlatformActions from "../../../../store/Platform/actions";
import NoteAction from "../../../../store/Note/actions";

import "./NoteConfigurationDialog.scss";

export default props => {
  const titleInput = createRef();
  const isOpen = useSelector(state => state.platform.note.dialog.configNote.isOpen);
  const currentNote = useSelector(state => state.note.current.note);
  const defaultTitle = useSelector(state => state.note.current.note.title);
  const defaultDescription = useSelector(state => state.note.current.note.description);
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const options = {
    autoFocus: true,
    canEscapeKeyClose: false,
    canOutsideClickClose: false,
    enforceFocus: true,
    isOpen: false,
    usePortal: true
  };

  useEffect(function onChangeCurrentNote() {
    setTitle(currentNote.title || defaultTitle || '')
    setDescription(currentNote.description || defaultDescription || '')
  }, [currentNote])

  const onClose = useCallback(
    e => {
      e.preventDefault();
      dispatch(PlatformActions.closeNoteConfigDialog())
      setTitle(defaultTitle)
      setDescription(defaultDescription)
    },
    [isOpen]
  );

  const onReplace = useCallback(
    e => {
      e.preventDefault();
      if (title && currentNote) {
        currentNote.title = title
        currentNote.description = description
        dispatch(NoteAction.saveNote(currentNote));
        dispatch(PlatformActions.closeNoteConfigDialog())
      }
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
        title={`Note Configuration`}
        className={`mercury-config-note-dialog ${Classes.DIALOG} `}
        {...options}
        isOpen={isOpen}
      >
        <div className={`mercury-config-note-dialog-content ${Classes.DIALOG_BODY} `}>
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
            <Button onClick={onReplace} intent={Intent.PRIMARY} disabled={!title}>
              Apply Configuration
            </Button>
          </div>
        </div>
      </Dialog>
    </Fragment>
  );
};
