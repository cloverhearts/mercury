import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, Popover, Position } from "@blueprintjs/core";
import { useDispatch } from "react-redux";
import NoteActions from "../../../../../../store/Note/actions";
import "./index.scss";
import EditorOptionMenu from './ContainerSubMenu'

export default function ActionBar(props) {
  const { Container, onUpdateMetaConfig } = props;
  const dispatch = useDispatch();
  const [isRunning, setIsRunning] = useState(false);
  const [executeCount, setExecuteCount] = useState(0);

  async function onClickRunButton() {
    dispatch(NoteActions.executeCodeContainer(Container));
    setExecuteCount(executeCount + 1)
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
          icon={`walk`}
          onClick={onClickRunButton}
          loading={isRunning}
          className={`bp3-intent-primary run-code-button ${!executeCount ? 'need-to-execute-this-code' : ''}`}
        >
          Execute
        </Button>
        <Popover content={<EditorOptionMenu Container={Container} onUpdateMetaConfig={onUpdateMetaConfig} />} position={Position.BOTTOM_RIGHT}>
          <Button
            icon={`caret-down`}
            loading={isRunning}
            className={`bp3-intent-primary config-button`}
          />
        </Popover>
      </ButtonGroup>
    </div>
  );
}
