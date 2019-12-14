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
  FileInput,
} from '@blueprintjs/core';
import {useSelector, useDispatch} from 'react-redux';
import PlatformActions from '../../../../store/Platform/actions';
import NoteActions from '../../../../store/Note/actions';
import MercuryCore from "mercury-core";

import './NoteExportDialog.scss';

export default props => {
  const IMPORT_STATE = {
    READY: 'Import note',
    EXPORTING: 'Importing...',
    DONE: 'Done',
  };
  const isOpen = useSelector(
    state => state.platform.note.dialog.importNote.isOpen);
  const [importing, setImporting] = useState(IMPORT_STATE.READY);
  const [filePath, setFilePath] = useState('');
  const [file, setFile] = useState(null);
  const [note, setNote] = useState(null)
  const dispatch = useDispatch();
  const options = {
    autoFocus: true,
    canEscapeKeyClose: false,
    canOutsideClickClose: false,
    enforceFocus: true,
    isOpen: false,
    usePortal: true,
  };

  const onClose = useCallback(
    e => {
      e.preventDefault();
      dispatch(PlatformActions.closeImportNoteDialog());
    },
    [isOpen],
  );

  useEffect(() => {
    if (!isOpen) {
      setFilePath('')
      setNote(null)
    }
  }, [isOpen])

  const onImport = useCallback((e) => {
    e.preventDefault();
    dispatch(NoteActions.importNote(note))
    // dispatch(PlatformActions.closeImportNoteDialog());
  });

  const onFileImported = (e, f) => {
    e.preventDefault()
    const filePath = e.target.value
    setFilePath(filePath)
    setFile(e.target.files[0])
  };

  useEffect(() => {
    if (filePath && file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const noteRaw = reader.result.replace('charset=utf-8,', '')
        const Note = MercuryCore.NoteContainer.Note;
        const noteObject = new Note(JSON.parse(noteRaw))
        setNote(noteObject)
      }
      reader.onerror = () => {
        setFilePath('')
        setFile(null)
        if (window._mercury && window._mercury.notification && window._mercury.notification.error) {
          window._mercury.notification.error(`invalid file for import note`)
        }
      }
      reader.readAsText(file, "utf-8");
    } else {
      setNote(null)
    }
  }, [filePath])


  return (
    <Fragment>
      <Dialog
        onClose={onClose}
        title={`Import note`}
        className={`mercury-import-note-dialog ${Classes.DIALOG} `}
        {...options}
        isOpen={isOpen}
      >
        <div
          className={`mercury-import-note-dialog-content ${Classes.DIALOG_BODY} `}>
          <div className={`mercury-import-file-input`}>
            <FormGroup label="Mercury note file">
              <FileInput fill
                         hasSelection={!!filePath}
                         text={!!filePath ? filePath : "Choose mercury note file..."}
                         onInputChange={onFileImported}
                         inputProps={{type: 'file', accept: '.mcr'}}/>
            </FormGroup>
          </div>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button onClick={onClose}>Close</Button>
            <Button onClick={onImport} intent={Intent.PRIMARY}
                    disabled={!note}>
              {importing}
            </Button>
          </div>
        </div>
      </Dialog>
    </Fragment>
  );
};
