import React, { useState } from "react";
import { Card, Elevation } from "@blueprintjs/core";
import Editor from "../../CodeEditor";
import Mercury from "mercury-core";

export default props => {
  const { context, noteId, paragraphId } = props
  return (
    <Card elevation={Elevation.TWO}>
      <Editor noteId={noteId} paragraphId={paragraphId} context={context} />
    </Card>
  );
};
