import React, { useState } from "react";
import { Card, Elevation } from "@blueprintjs/core";
import Editor from "../../CodeEditor";
import { Resizable } from "re-resizable";

import "./index.scss";

export default props => {
  const { noteId, paragraphId, context } = props;
  const resizableOptions = {
    defaultSize: {
      width: `100%`,
      height: `200px`
    }
  };
  return (
    <span className={`mercury-code-container`} contentEditable={false}>
      <Resizable defaultSize={resizableOptions}>
        <Card className={`mercury-code-editor`} elevation={Elevation.TWO}>
          <Editor noteId={noteId} paragraphId={paragraphId} context={context} />
        </Card>
      </Resizable>
    </span>
  );
};
