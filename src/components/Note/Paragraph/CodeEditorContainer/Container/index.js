import React, { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import NoteActions from "../../../../../store/Note/actions";
import { Tab, Tabs } from "@blueprintjs/core";

import ActionBar from "./ActionBar";
import Editor from "./Editor";
import Logger from "./Logger";
import Render from "./Render";

import "./index.scss";

function LoggerContainer(props) {
  const { Container } = props;
  return (
    <div className={`mercury-code-logger-container`}>
      <Logger Container={Container} />
    </div>
  );
}

function RenderContainer(props) {
  const { Container, Code, onUpdateRender } = props;
  return (
    <div className={`mercury-code-render-container`}>
      <Render
        Container={Container}
        Code={Code}
        onUpdateRender={onUpdateRender}
      />
    </div>
  );
}

export default function MercuryCodeEditor(props) {
  const { container } = props;
  const codeContainer = container || { code: "", language: "javascript" };
  const dispatch = useDispatch();
  const [editor, setEditor] = useState(null);
  const [code, setCode] = useState(container.code);
  const [render, setRender] = useState(container.render);
  const [selectedTab, setSelectedTab] = useState("log");
  const [metaConfig, setMetaConfig] = useState(container.meta.config);
  const isHideEditor = useMemo(
    () => metaConfig.hide && metaConfig.hide.editor,
    [container.meta.config]
  );
  const isHideAppView = useMemo(
    () => metaConfig.hide && metaConfig.hide.appView,
    [container.meta.config]
  );
  const editorOption = {
    value: codeContainer.code,
    language: codeContainer.language || 'javascript',
    autoIndent: "full",
    mouseWheelZoom: true,
    automaticLayout: true,
    minimap: { enabled: false },
    scrollbar: {
      useShadows: true,
      verticalScrollbarSize: 10,
      horizontalScrollbarSize: 10
    }
  };

  useEffect(() => {}, [container.code]);

  const onUpdateCode = code => {
    container.code = code;
    setCode(code);
  };

  const onChangeTab = tab => {
    if (!tab) {
      setSelectedTab("log");
    } else {
      setSelectedTab(tab);
    }
  };

  const onUpdateRender = html => {
    const renderResult = render || { html: "" };
    renderResult.html = html;
    container.render = renderResult;
    setRender(renderResult);
    dispatch(NoteActions.setSuggestSaveNote({ hasSuggestion: true }));
    setSelectedTab("render");
  };

  const onUpdateMetaConfig = (config = {}) => {
    const originalConfig = container.meta.config || {};
    container.meta.config = { ...originalConfig, ...config };
    setMetaConfig(container.meta.config);
  };

  return (
    <div className={`mercury-code-editor-container`}>
      <div className={`mercury-code-action-bar-container`}>
        <ActionBar
          Container={container}
          Editor={editor}
          onUpdateMetaConfig={onUpdateMetaConfig}
        />
      </div>
      <div
        className={`mercury-code-write-container ${isHideEditor ? "hide" : ""}`}
      >
        <Editor
          Container={container}
          Option={editorOption}
          Editor={editor}
          UpdateEditor={setEditor}
          onUpdateCode={onUpdateCode}
        />
      </div>

      {container ? (
        <Tabs
          onChange={onChangeTab}
          selectedTabId={selectedTab}
          className={`mercury-code-editor-tab-container ${
            isHideAppView ? "hide" : ""
          }`}
        >
          <Tab
            id="render"
            title="App"
            panel={
              <RenderContainer
                Container={container}
                Code={code}
                onUpdateRender={onUpdateRender}
              />
            }
          />
          <Tab
            id="log"
            title="Log"
            panel={<LoggerContainer Container={container} />}
          />
        </Tabs>
      ) : null}
    </div>
  );
}
