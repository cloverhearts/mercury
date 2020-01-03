import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useStore } from "react-redux";

import initializeQuill from "./Quill";

import NOTE_ACTIONS from "../../../store/Note/actions";
import "./Editor.scss";

export default props => {
  const { context } = props;
  const store = useStore();
  const editorRef = useRef();
  const dispatch = useDispatch();
  let editor = null;
  useEffect(() => {
    initializeQuill(editorRef, context, store).then(_editor => {
      editor = _editor;
      editor.keyboard.bindings["Backspace"] = [];
      window._mercuryParagraphEditor = editor;
      editor.setContents(context.content || [{ insert: "" }]);
      editor.on("text-change", () => {
        context.content = editor.getContents();
        dispatch(NOTE_ACTIONS.setSuggestSaveNote({ hasSuggestion: true }));
      });
    });
  }, [editorRef]);
  return (
    <div className={`mercury-paragraph-editor ql-snow`}>
      <div ref={editorRef}></div>
    </div>
  );
};
