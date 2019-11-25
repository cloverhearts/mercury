import React, { useState, useEffect } from 'react';
import { Tab, Tabs } from "@blueprintjs/core";

import ActionBar from './ActionBar'
import Editor from './Editor'
import Logger from './Logger'
import Render from './Render'

import './index.scss';

function LoggerContainer(props) {
  const { Container } = props
  return (
    <div className={`mercury-code-logger-container`}>
      <Logger Container={Container} />
    </div>
  )
}

function RenderContainer(props) {
  const { Container, Code } = props
  return (
    <div className={`mercury-code-render-container`}>
      <Render Container={Container} Code={Code} />
    </div>
  )
}

export default function MercuryCodeEditor(props) {
  const { container } = props;
  const codeContainer = container || { code: "", language: "javascript" };
  const [editor, setEditor] = useState(null)
  const [code, setCode] = useState((container.code))
  const [selectedTab, setSelectedTab] = useState('log')
  const editorOption = {
    value: codeContainer.code,
    language: codeContainer.language,
    automaticLayout: true,
    minimap: { enabled: false },
    scrollbar: {
      useShadows: true,
      verticalScrollbarSize: 10,
      horizontalScrollbarSize: 10
    }
  };

  useEffect(() => {
  }, [container.code])

  const onUpdateCode = (code) => {
    container.code = code
    setCode(code)
  };

  const onChangeTab = (tab) => {
    setSelectedTab(tab)
  }

  return (
    <div className={`mercury-code-editor-container`} >
      <div className={`mercury-code-action-bar-container`}>
        <ActionBar Container={container} Editor={editor}  />
      </div>
      <div className={`mercury-code-write-container`}>
        <Editor Container={container} Option={editorOption} Editor={editor} UpdateEditor={setEditor} onUpdateCode={onUpdateCode} />
      </div>

      {container ?
        <Tabs id="TabsExample" onChange={onChangeTab} selectedTabId={selectedTab}>
          <Tab id="render" title="Render" panel={<RenderContainer Container={container} Code={code} />} />
          <Tab id="log" title="LOG" panel={<LoggerContainer Container={container} />} />
        </Tabs>
        :
        null
      }

    </div>
  );
}