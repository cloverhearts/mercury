import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Elevation } from "@blueprintjs/core";
import Editor from "../../CodeEditor";
import { Resizable } from "re-resizable";
import NoteActions from "../../../../store/Note/actions";

import "./index.scss";

export default props => {
  const { noteId, paragraphId, context } = props;
  const dispatch = useDispatch();
  const note = useSelector(state => state.note.current.note);
  const paragraphs = note && note.id ? note.paragraphs : [];
  const container = paragraphs.reduce((result, paragraph) => {
    if (!result) {
      result = paragraph.containers.find(container => container.id === context.id);
    }
    return result;
  }, null);
  const metaConfig = container ? container.meta.config : {};
  const defaultWidth = metaConfig.editor ? metaConfig.editor.width || `800px` : `800px`;
  const defaultHeight = metaConfig.editor ? metaConfig.editor.height || `200px` : `200px`;

  const resizableOptions = {
    width: defaultWidth,
    height: defaultHeight
  };

  const onResizeStop = useCallback(
    (e, direction, ref, d) => {
      const styles = ref && ref.style;
      if (styles) {
        const width = styles.getPropertyValue("width");
        const height = styles.getPropertyValue("height");
        metaConfig.editor = {
          width,
          height
        };
      }
      dispatch(NoteActions.setSuggestSaveNote({ hasSuggestion: true }));
    },
    [metaConfig]
  );

  return (
    <span className={`mercury-code-container`} contentEditable={false}>
      {container ? (
        <Resizable defaultSize={resizableOptions} onResizeStop={onResizeStop}>
          <Card className={`mercury-code-editor`} interactive={true}>
            <Editor noteId={noteId} paragraphId={paragraphId} container={container} />
          </Card>
        </Resizable>
      ) : null}
    </span>
  );
};
