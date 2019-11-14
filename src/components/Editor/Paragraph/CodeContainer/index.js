import React, {useState} from 'react';
import {Card, Elevation} from '@blueprintjs/core';
import Editor from '../../CodeEditor';

export default props => {
  const {noteId, paragraphId, context} = props;
  return (
    <Card elevation={Elevation.TWO}>
      <Editor noteId={noteId} paragraphId={paragraphId} context={context}/>
    </Card>
  );
};
