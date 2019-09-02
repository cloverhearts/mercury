import React from 'react';
import Editor from '../Editor/CodeEditor'
import { Reporter } from 'mercury/client'
export default (props) => {
  const reporter = new Reporter({code: 'this is a code'})
  return (
    <div>
      Paragraph
      <Editor />
    </div>
  )
}
