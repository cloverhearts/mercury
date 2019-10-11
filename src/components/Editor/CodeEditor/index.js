import React, { useEffect, useState } from "react";
import { chromeLight, Inspector } from "react-inspector";
import { Button, ButtonGroup, Position, Tooltip } from "@blueprintjs/core";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
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
  if (reporter) {
    reporter.code = code;
    const executor = reporter.getCommandFunction();
    if (executor) {
      executor();
    } else {
      console.error("cannot found executor");
    }
  }
};

function LogView({ CodeContainer }) {
  const [logs, setLogs] = useState(CodeContainer.logger.logs);
  const [themes] = useState(LogTheme);

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
            <Inspector theme={{ ...chromeLight, ...themes[log.level] }} data={log.data} />
          </div>
        ))}
      </div>
    </div>
  );
}

function EditorControllerBox({ CodeContainer }) {
  const [isRunning, setIsRunning] = useState(false);

  async function onClickRunButton() {
    execute(CodeContainer, editor.getValue());
    setTimeout(() => {}, 200);
  }

  useEffect(() => {
    const eventListener = (_, event) => {
      if (event.status === "EXECUTE_START") {
        setIsRunning(true);
      } else if (event.status === "EXECUTE_END") {
        setIsRunning(false);
      } else if (event.status === "EXECUTE_ERROR") {
        setIsRunning(false);
        console.error("code execute error");
      }
    };
    CodeContainer.addEventListener(CodeContainer.channel.EXECUTOR, eventListener);
    return function cleanUp() {
      CodeContainer.removeListener(eventListener);
    };
  }, [CodeContainer.id]);

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
      useShadows: true,
      verticalScrollbarSize: 10,
      horizontalScrollbarSize: 10
    }
  };

  return (
    <div className={`editor-container`}>
      <EditorControllerBox CodeContainer={CodeContainer} />
      <ResizableBox width={`100%`} height={200} axis={`y`}>
        <div className={`editor`} ref={_editor => assignEditor(_editor, editorOption)} />
      </ResizableBox>

      <div className={`console`}>
        <LogView CodeContainer={CodeContainer} />
      </div>
      <div id={`html-${CodeContainer.id}`}></div>
    </div>
  );
};
