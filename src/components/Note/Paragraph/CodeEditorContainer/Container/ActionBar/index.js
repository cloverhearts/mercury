import React, { useState, useEffect, createRef } from "react";
import { Button, ButtonGroup, Popover, Position, InputGroup } from "@blueprintjs/core";
import { useDispatch } from "react-redux";
import NoteActions from "../../../../../../store/Note/actions";
import "./index.scss";
import EditorOptionMenu from './ContainerSubMenu'

export default function ActionBar(props) {
  const { Container, onUpdateMetaConfig } = props;
  const dispatch = useDispatch();
  const [isRunning, setIsRunning] = useState(false);
  const [executeCount, setExecuteCount] = useState(0);
  const titleRef = createRef()

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

  const onChangeTitle = (e) => {
    e.preventDefault()
    if (titleRef) {
      const ele = titleRef.current
      Container.title = ele.value
    }
  }

  return (
    <div className={`editor-controller-box`}>
      <div className={`code-container-title`}>
        <InputGroup inputRef={titleRef} defaultValue={Container.title} onChange={onChangeTitle}  />
      </div>
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
