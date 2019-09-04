import React from 'react';
import * as monaco from 'monaco-editor';
import './index.scss';

let editor = null;
const assignEditor = (_element, editorOption) => {
  setTimeout(() => {
    editor = monaco.editor.create(_element, editorOption);
  }, 0);
};

const execute = (reporter, code) => {
  if (reporter) {
    reporter.code = code;
    const executor = reporter.getCommandFunction();
    if (executor) {
      executor();
    }
  }
};

export default (props) => {
  const {
    Reporter,
  } = props;

  const editorOption = {
    value: Reporter.code,
    language: Reporter.language,
  };

  return (
    <div className={`editor-container`}>
      <div className={`editor`}
           ref={(_editor) => assignEditor(_editor, editorOption)}/>
      <button onClick={_ => {
        execute(Reporter, editor.getValue());
      }}>Run
      </button>
      <div className={`console`}>
        {Reporter.logs ? Reporter.logs.map((e, index) => (<div key={index}>{e}</div>)) : null}
      </div>
    </div>
  );
}