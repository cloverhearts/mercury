import React, {useState} from 'react';
import {Card, Elevation} from '@blueprintjs/core';
import Editor from '../../CodeEditor';
import {ResizableBox} from 'react-resizable';

export default props => {
  const {noteId, paragraphId, context} = props;
  return (
    <div style={{display: 'inline-block'}}  >
      <ResizableBox width={200}
                    height={200} axis="both">
        <div width={500}>
          <Card  elevation={Elevation.TWO}>
            <Editor noteId={noteId} paragraphId={paragraphId} context={context}/>
          </Card>
        </div>
      </ResizableBox>
    </div>

  );
};
