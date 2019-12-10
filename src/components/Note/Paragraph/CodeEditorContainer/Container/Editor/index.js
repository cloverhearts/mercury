import React, {useEffect, useState, useRef} from 'react';
import * as monaco from 'monaco-editor';
import './index.scss';
import {useDispatch} from 'react-redux';
import NoteActions from '../../../../../../store/Note/actions';

export default props => {
  const {Option, Editor, UpdateEditor, onUpdateCode} = props;
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
    }
  }, [editorRef, Editor]);

  return (
    <div className={`editor-container`}>
      <div className={`editor`} ref={editorRef}/>
    </div>
  );
};
