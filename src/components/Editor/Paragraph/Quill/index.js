import QuillJS from 'quill';
import UUID from 'uuid/v4';

import CodeEditorContainer from './CodeEditorContainer';

export default async function initializeQuill(editorRef, context) {
  if (!window.Quill) {
    window.Quill = QuillJS;
  }
  const Quill = window.Quill;
  const ImageDropModule = await import('quill-image-drop-module');
  const BlotFormatter = await import('quill-blot-formatter');

  Quill.register('modules/imageDrop', ImageDropModule.ImageDrop);
  Quill.register('modules/blotFormatter', BlotFormatter.default);
  Quill.register(CodeEditorContainer(context));

  const icons = Quill.import('ui/icons');
  icons['code-editor-container'] =
    '<i class="fas fa-cube" style="color: purple;"></i>';

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
            {indent: '+1'},
          ],
          [
            {size: []},
            {align: []},
            'bold',
            'italic',
            'underline',
            'strike',
          ],
          [{color: []}, {background: []}],
          [{script: 'sub'}, {script: 'super'}],
          [
            'link',
            'blockquote',
            'image',
            'video',
            'formula',
            'code-block',
            'code-editor-container',
          ],
        ],
        handlers: {
          'code-editor-container': function(value) {
            const quill = window._mercuryParagraphEditor;
            const range = quill.getSelection();
            const codeEditorUUID = `${UUID()}`;
            quill.insertEmbed(
              range.index,
              'code-editor-container',
              `code-editor-container-${codeEditorUUID}`,
            );
          },
        },
      },
      imageDrop: true,
      blotFormatter: {},
    },
  };
  return new Quill(editorRef.current, options);
}