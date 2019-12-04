import React, {useEffect, useState, useRef} from 'react';
import {chromeLight, Inspector} from 'react-inspector';
import {Button, ButtonGroup, Position, Tooltip} from '@blueprintjs/core';
import moment from 'moment';
import * as monaco from 'monaco-editor';
import LogTheme from '../Logger/theme';
import './index.scss';
import {useSelector, useDispatch} from 'react-redux';
import NoteActions from '../../../../../../store/Note/actions';

export default props => {
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
    }
  }, [editorRef, Editor]);

  return (
    <div className={`editor-container`}>
      <div className={`editor`} ref={editorRef}/>
    </div>
  );
};
