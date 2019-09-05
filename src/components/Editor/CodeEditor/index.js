import React, {useEffect, useState} from 'react';
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

function LogView ({ Reporter }) {
  const [logs, setLogs] = useState(Reporter.logs);

  function onReporterEvent( _ , event) {
    if (event.type === '_console') {
      setLogs([...logs, event.data]);
    }
  }
  Reporter.on(onReporterEvent);

  useEffect(() => {
    return function cleanUp() {
      console.log('log cleanUp');
      Reporter.removeEventListener(onReporterEvent);
    };
  },[Reporter]);

  return logs.map((log, index) => <div key={index}>1 {JSON.stringify(log)}</div>)
}

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
        <LogView Reporter={Reporter} />
      </div>
    </div>
  );
}