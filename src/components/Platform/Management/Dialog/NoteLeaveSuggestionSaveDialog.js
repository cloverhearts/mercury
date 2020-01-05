import React, {useState, useEffect, useCallback} from 'react';
import {Alert, Intent} from '@blueprintjs/core';
import MercuryCore from 'mercury-core';
import {useDispatch, useSelector} from 'react-redux';
import PlatformAction from '../../../../store/Platform/actions';
import NoteAction from '../../../../store/Note/actions';

export default () => {
  const currentNote = useSelector(state => state.note.current.note);
  const targetNote = useSelector(
    state => state.platform.note.dialog.missingSaveNote.targetNote);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const originNoteId = currentNote && currentNote.id ? currentNote.id : -99999
    const targetNoteId = targetNote && targetNote.id ? targetNote.id : null
    setIsOpen(targetNoteId && targetNoteId !== originNoteId)
  }, [targetNote, currentNote])

  const onCancelClick = useCallback((e) => {
    e.preventDefault();
    dispatch(PlatformAction.setMissingSaveNote({note: {}}));
  }, [targetNote, currentNote]);

  const onSaveClick = useCallback((e) => {
    e.preventDefault();
    const Note = MercuryCore.NoteContainer.Note;
    dispatch(NoteAction.saveNote(new Note({...targetNote})));
    dispatch(PlatformAction.setMissingSaveNote({note: {}}));
  }, [targetNote, currentNote]);

  return (
    <Alert
      intent={Intent.PRIMARY}
      confirmButtonText="SAVE"
      isOpen={isOpen}
      cancelButtonText={`Ignore`}
      confirmButtonText={`Save`}
      onCancel={onCancelClick}
      onConfirm={onSaveClick}
    >
      <p>
        Changes to previously used notes have not been saved.
      </p>
      <p>
        Do you want to save?
      </p>
    </Alert>
  );
}