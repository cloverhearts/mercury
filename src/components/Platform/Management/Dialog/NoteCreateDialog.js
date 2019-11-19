import React, {
  Fragment,
  useState,
  useCallback,
  useEffect,
  createRef,
} from 'react';
import {
  Button,
  Dialog,
  Classes,
  FormGroup,
  InputGroup,
  Intent,
} from '@blueprintjs/core';
import {useSelector, useDispatch} from 'react-redux';
import PlatformActions from '../../../../store/Platform/actions';
import './NoteCreateDialog.scss';
import addRuleToIndex from 'eslint-plugin-jsx-a11y/scripts/addRuleToIndex';

export default props => {
  const titleInput = createRef();
  const isOpen = useSelector(
    state => state.platform.note.dialog.createNewNote.isOpen);
  const defaultTitle = useSelector(
    state => state.platform.note.dialog.createNewNote.default.title);
  const dispatch = useDispatch();
  const [title, setTitle] = useState(defaultTitle);
  const options = {
    autoFocus: true,
    canEscapeKeyClose: false,
    canOutsideClickClose: false,
    enforceFocus: true,
    isOpen: false,
    usePortal: true,
  };

  const onClose = useCallback(e => {
    e.preventDefault();
    dispatch(PlatformActions.closeCreateNewNoteDialog());
    setTitle(defaultTitle)
  }, [isOpen]);

  const onCreate = useCallback(
    e => {
      e.preventDefault();
      dispatch(PlatformActions.closeCreateNewNoteDialog({title}));
    },
    [title],
  );

  const onInputTitle = (e) => {
    const text = e.target.value;
    setTitle(text);
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
        <div
          className={`mercury-create-note-dialog-content ${Classes.DIALOG_BODY} `}>
          <FormGroup
            label="Note Title"
            labelFor="title-input"
            labelInfo="(required)"
          >
            <InputGroup id="title-input" ref={titleInput}
                        placeholder="Please Input for title" value={title}
                        onChange={onInputTitle}/>
          </FormGroup>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button onClick={onClose}>Close</Button>
            <Button onClick={onCreate} intent={Intent.PRIMARY}>Create
              Note</Button>
          </div>
        </div>
      </Dialog>
    </Fragment>
  );
};
