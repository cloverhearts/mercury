import React, { useEffect, useState } from "react";
import { chromeLight, Inspector } from "react-inspector";
import { Button, ButtonGroup, Position, Tooltip } from "@blueprintjs/core";
import moment from "moment";
import * as monaco from "monaco-editor";
import "./index.scss";

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

function LogView({ Reporter }) {
  const [logs, setLogs] = useState(Reporter.logs);
  const [themes] = useState(Reporter.getConsole().themes);

  useEffect(() => {
    const eventListener = (_, event) => {
      if (event.type === "_console") {
        setTimeout(() => setLogs([...Reporter.logs]), 0);
      }
    };
    Reporter.on(eventListener);
    return function cleanUp() {
      Reporter.removeEventListener(eventListener);
    };
  }, [Reporter.uuid, Reporter.logs.length]);

  function onClearLog() {
    Reporter.clearLogs();
    setTimeout(() => setLogs([...Reporter.logs]), 0);
  }

  return (
    <div className={`log-viewer`}>
      <div className={`log-controller-box`}>
        <ButtonGroup>
          <Tooltip content="Clear console" position={Position.TOP}>
            <Button icon={`delete`} onClick={onClearLog} className={`clear-log-button`}></Button>
          </Tooltip>
        </ButtonGroup>
      </div>
      <div className="log-list">
        {logs.map((log, index) => (
          <div key={index} className={`log-row level-${log.level}`}>
            <div className={`log-time`}>{moment(log.time * 1000).calendar()}</div>
            <Inspector theme={{ ...chromeLight, ...themes[log.level] }} data={log.data} />
          </div>
        ))}
      </div>
    </div>
  );
}

function EditorControllerBox({ onRun }) {
  const [isRunning, setIsRunning] = useState(false);

  async function onClickRunButton() {
    setIsRunning(true);
    await onRun();
    setTimeout(() => {
      setIsRunning(false);
    }, 200);
  }

  return (
    <div className={`editor-controller-box`}>
      <ButtonGroup>
        <Button
          icon={`play`}
          onClick={onClickRunButton}
          loading={isRunning}
          className={`bp3-intent-primary run-code-button`}
        >
          RUN
        </Button>
      </ButtonGroup>
    </div>
  );
}

let editor = null;
export default props => {
  const { Reporter } = props;

  const editorOption = {
    value: Reporter.code,
    language: Reporter.language,
    automaticLayout: true,
    minimap: { enabled: false },
    scrollbar: {
      verticalScrollbarSize: 5,
      horizontalScrollbarSize: 5
    }
  };

  function onRun() {
    return new Promise(function(resolve, reject) {
      try {
        execute(Reporter, editor.getValue());
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  return (
    <div className={`editor-container`}>
      <EditorControllerBox onRun={onRun} />
      <div className={`editor`} ref={_editor => assignEditor(_editor, editorOption)} />
      <div className={`console`}>
        <LogView Reporter={Reporter} />
      </div>
      <div id="test-html">Test-HTML</div>
    </div>
  );
};
