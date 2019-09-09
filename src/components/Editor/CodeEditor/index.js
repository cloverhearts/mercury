import React, {useEffect, useState} from 'react';
import ReactJson from 'react-json-view'
import {Button, ButtonGroup} from '@blueprintjs/core';
import * as monaco from 'monaco-editor';
import './index.scss';

const assignEditor = (_element, editorOption) => {
  setTimeout(() => {
    editor = monaco.editor.create(_element, editorOption);
  }, 0);
};

const execute = (reporter, code) => {
  return new Promise((resolve, reject) => {
    try {
      if (reporter) {
        reporter.code = code;
        const executor = reporter.getCommandFunction();
        if (executor) {
          executor();
          resolve();
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

function LogView({Reporter}) {
  const [logs, setLogs] = useState(Reporter.logs);

  function onReporterEvent(_, event) {
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
  }, [Reporter]);

  return logs.map(
    (log, index) => (
      <div key={index}>
        <ReactJson src={log.data} />
      </div>
    )
  )
}

function EditorControllerBox({onRun}) {
  const [isRunning, setIsRunning] = useState(false)
  async function onClickRunButton() {
    setIsRunning(true)
    await onRun()
    setIsRunning(false)
  }
  return (
    <div className={`editor-controller-box`}>
      <ButtonGroup>
        <Button icon={`play`} onClick={onClickRunButton} loading={isRunning}
                className={`bp3-intent-primary run-code-button`}>RUN</Button>
      </ButtonGroup>
    </div>
  );
}

let editor = null;
export default props => {
  const {Reporter} = props;

  const editorOption = {
    value: Reporter.code,
    language: Reporter.language,
    automaticLayout: true,
    minimap: {enabled: false},
    scrollbar: {
      verticalScrollbarSize: 5,
      horizontalScrollbarSize: 5,
    },
  };

  function onRun() {
    return new Promise(function (resolve, reject) {
        try {
          execute(Reporter, editor.getValue());
          resolve()
        } catch (error) {
          reject(error)
        }
      })
  }

  return (
    <div className={`editor-container`}>
      <EditorControllerBox onRun={onRun} />
      <div className={`editor`}
           ref={_editor => assignEditor(_editor, editorOption)}/>
      <div className={`console`}>
        <LogView Reporter={Reporter}/>
      </div>
    </div>
  );
};
