import React, { useState } from "react";
import { Card, Elevation } from "@blueprintjs/core";
import Editor from "../../CodeEditor";

export default props => {
  return (
    <Card elevation={Elevation.TWO}>
      11<br></br>11<br></br>11<br></br>11<br></br>CLOVER<br></br>
      {/* <Editor noteId={noteId} paragraphId={paragraphId} context={context} /> */}
    </Card>
  );
};
