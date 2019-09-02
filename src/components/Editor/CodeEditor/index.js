import React from 'react';
import * as monaco from 'monaco-editor'
import './index.scss'

const assignEditor = (_element) => {
  setTimeout(() => {
    monaco.editor.create(_element, {
      value: "function hello() {\n\talert('Hello world!');\n}",
      language: "javascript"
    });
  }, 100)

}

export default (props) => {
  return (
    <div className={`editor-container`}>
      <div className={`editor`} ref={assignEditor} />
    </div>
  );
}