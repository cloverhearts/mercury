import React, {useEffect, useRef} from 'react';
import * as monaco from 'monaco-editor';
import './index.scss';
import {useDispatch, useSelector} from 'react-redux';
import NoteActions from '../../../../../../store/Note/actions';

export default props => {
  const currentNote = useSelector(state => state.note.current.note);
  const {Container, Option, Editor, UpdateEditor, onUpdateCode} = props;
  const dispatch = useDispatch();
  const editorRef = useRef();
  useEffect(() => {
    if (!Editor) {
      const codeEditor = monaco.editor.create(editorRef.current, Option);
      UpdateEditor(codeEditor);
      codeEditor.getModel().onDidChangeContent(() => {
        onUpdateCode(codeEditor.getValue());
        dispatch(NoteActions.setSuggestSaveNote({hasSuggestion: true}));
      });

      codeEditor.addAction({
        id: `${Container.id}-shortcut-execute-code`,
        label: 'Execute Code',
        keybindings: [
          monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter
        ],
        precondition: null,
        keybindingContext: null,
        run: () => {
          dispatch(NoteActions.executeCodeContainer(Container))
        }
      })

      codeEditor.addAction({
        id: `${Container.id}-shortcut-save-note`,
        label: 'Save Note',
        keybindings: [
          monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S
        ],
        precondition: null,
        keybindingContext: null,
        run: () => {
          dispatch(NoteActions.saveNote(currentNote))
        }
      })

    }
  }, [editorRef, Editor]);

  return (
    <div className={`editor-container`}>
      <div className={`editor`} ref={editorRef}/>
    </div>
  );
};
