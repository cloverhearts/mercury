import React, {useRef, useEffect, useState, createRef} from 'react';
import ReactDOM from 'react-dom';
import QuillJS from 'quill';
import CodeEditor from '../../../components/Paragraph';
import UUID from 'uuid/v4';
import './Editor.scss';

const CodeEditorBlock = QuillJS.import('blots/block/embed');

class CodeEditorContainer extends CodeEditorBlock {
  static create(containerID) {
    let node = super.create();
    node.setAttribute('data-container-id', `code-container-${containerID}`);
    node.setAttribute('contentEditable', false);
    return node;
  }

  static value(node) {
    return node;
  }
}

CodeEditorContainer.blotName = 'code-editor-container';
CodeEditorContainer.tagName = 'span';
CodeEditorContainer.className = 'mercury-code-editor-container';

async function initializeQuill(editorRef) {
  if (!window.Quill) {
    window.Quill = QuillJS;
  }
  const Quill = window.Quill;
  const ImageDropModule = await import('quill-image-drop-module');
  const BlotFormatter = await import('quill-blot-formatter');
  Quill.register('modules/imageDrop', ImageDropModule.ImageDrop);
  Quill.register('modules/blotFormatter', BlotFormatter.default);
  Quill.register(CodeEditorContainer);
  const icons = Quill.import('ui/icons');
  icons['code-editor-container'] = '<i class="fas fa-cube" style="color: purple;"></i>';

  const options = {
    theme: 'snow',
    modules: {
      keyboard: {
        bindings: {},
      },
      toolbar: {
        container: [
          [{font: ['Source Code Pro', 'monospace', 'Arial']}],
          [{header: [1, 2, 3, 4, 5, 6, false]}],
          [
            {direction: 'rtl'},
            {list: 'ordered'},
            {list: 'bullet'},
            {indent: '-1'},
            {indent: '+1'}],
          [{size: []}, {align: []}, 'bold', 'italic', 'underline', 'strike'],
          [{color: []}, {background: []}],
          [{script: 'sub'}, {script: 'super'}],
          [
            'link',
            'blockquote',
            'image',
            'video',
            'formula',
            'code-block',
            'code-editor-container'],
        ],
        handlers: {
          'code-editor-container': function(value) {
            const quill = window.editor;
            const range = quill.getSelection();
            const codeEditorUUID = `${UUID()}`;
            const opsEvents = quill.insertEmbed(range.index,
              'code-editor-container', codeEditorUUID);
            const editorDOM = opsEvents.ops.filter(
              event => event.insert && event.insert['code-editor-container']).
              find(
                e => e.insert['code-editor-container']['dataset']['containerId'] ===
                  `code-container-${codeEditorUUID}`,
              );
            if (editorDOM) {
              ReactDOM.render(<CodeEditor/>,
                editorDOM.insert['code-editor-container']);
            }
          },
        },
      },
      imageDrop: true,
      blotFormatter: {},
    },
  };
  return new Quill(editorRef.current, options);
}

export default props => {
  const {context} = props;
  const editorRef = useRef();
  const preview = useRef();
  const [contents, setContents] = useState([{insert: ''}]);
  let editor = null;
  useEffect(() => {
    initializeQuill(editorRef).then(_editor => {
      editor = _editor;
      editor.keyboard.bindings['Backspace'] = [];
      window.editor = editor;
      editor.setContents(context.content || [{insert: ''}]);
      editor.on('text-change', () => {
        setContents(editor.getContents());
      });
    });
  }, [editorRef]);

  return (
    <div className={`mercury-paragraph-editor ql-snow`}>
      <div ref={editorRef}></div>
      <div ref={preview} className={`ql-editor `}></div>
    </div>
  );
};
