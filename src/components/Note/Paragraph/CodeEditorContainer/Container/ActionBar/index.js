import React, {useState, useEffect} from 'react'
import {Button, ButtonGroup} from '@blueprintjs/core';
import ExecuteCodeEditor from './Actions/ExecuteCodeEditor'

import './index.scss'

export default function ActionBar(props) {
  const {Container, Editor} = props

  const [isRunning, setIsRunning] = useState(false);

  async function onClickRunButton() {
    ExecuteCodeEditor(Container, Editor.getValue());
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
    Container.addEventListener(Container.channel.EXECUTOR, eventListener);
    return function cleanUp() {
      Container.removeListener(eventListener);
    };
  }, [Container.id]);

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
