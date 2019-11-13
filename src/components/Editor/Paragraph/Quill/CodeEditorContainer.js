import React from 'react';
import QuillJS from 'quill';
import ReactDOM from 'react-dom';
import CodeContainer from '../CodeContainer';
import MercuryCore from 'mercury-core';
import ProviderWithContext from '../../../Platform/ProviderWithContext';
import {BrowserRouter} from 'react-router-dom';

const CodeEditorBlock = QuillJS.import('blots/block/embed');
const CodeEditorContainer = (context) => {
  return class extends CodeEditorBlock {
    static create(containerID) {
      let node = super.create();
      node.setAttribute('data-container-id', `${containerID}`);
      const containerContext = this.getOrCreateCodeContainer(containerID,
        context);
      const noteId = context.parentId
      const paragraphId = context.id
      node.setAttribute('contentEditable', false);
      ReactDOM.render(<BrowserRouter><ProviderWithContext><CodeContainer noteId={noteId} paragraphId={paragraphId} context={containerContext}/></ProviderWithContext></BrowserRouter>, node);
      return node;
    }

    static value(node) {
      return node.getAttribute('data-container-id');
    }

    static getOrCreateCodeContainer(containerId, context) {
      const containers = context.containers;
      const codeContainer = containers.find(
        container => container.id === containerId);
      if (codeContainer) {
        return new MercuryCore.Code.Container(codeContainer);
      }
      const newCodeContainer = new MercuryCore.Code.Container({id: containerId});
      containers.push({...newCodeContainer});
      return newCodeContainer;
    }
  };
};

export default (context) => {
  const container = CodeEditorContainer(context);
  container.blotName = 'code-editor-container';
  container.tagName = 'span';
  container.className = 'mercury-code-editor-container';
  return container;
};