import React, { useEffect, useState } from "react";
import { chromeLight, Inspector } from "react-inspector";
import { Button, ButtonGroup, Position, Tooltip } from "@blueprintjs/core";
import moment from "moment";
import * as monaco from "monaco-editor";
import LogTheme from "../Logger/theme";
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

function LogView({ CodeContainer }) {
  const [logs, setLogs] = useState(CodeContainer.logger.logs);
  const [themes] = useState(null);

  useEffect(() => {
    const eventListener = (_, event) => {
      setTimeout(() => setLogs([...CodeContainer.logger.logs]), 0);
    };
    CodeContainer.addEventListener(CodeContainer.channel.LOGGER, eventListener);
    return function cleanUp() {
      CodeContainer.removeListener(eventListener);
    };
  }, [CodeContainer.id]);

  function onClearLog() {
    CodeContainer.logger.clear();
    setTimeout(() => setLogs([...CodeContainer.logger.logs]), 0);
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
            <Inspector theme={{ ...chromeLight, ...LogTheme[log.level] }} data={log.data} />
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
  const { CodeContainer } = props;

  const editorOption = {
    value: CodeContainer.code,
    language: CodeContainer.language,
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
        execute(CodeContainer, editor.getValue());
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
        <LogView CodeContainer={CodeContainer} />
      </div>
      <div id={`html-${CodeContainer.id}`}>Test-HTML</div>
    </div>
  );
};
