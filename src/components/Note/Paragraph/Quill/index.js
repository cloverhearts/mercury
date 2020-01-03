import QuillJS from 'quill';
import UUID from 'uuid/v4';

import CodeEditorContainer from '../CodeEditorContainer/Quill-plugin';

export default async function initializeQuill(editorRef, context, store) {
  if (!window.Quill) {
    window.Quill = QuillJS;
  }
  const Quill = window.Quill;
  const ImageDropModule = await import('quill-image-drop-module');
  const Font = Quill.import('formats/font');
  Font.whitelist = [
    'source-code', 'monospace', 'arial', 'notosans', 'nanum-gothic'
  ];
  const Size = Quill.import('attributors/style/size');
  Size.whitelist = [
    '8px',
    '9px',
    '10px',
    '11px',
    '12px',
    '14px',
    '16px',
    '18px',
    '20px',
    '22px',
    '24px',
    '26px',
    '28px',
    '36px',
    '48px',
    '72px'];

  Quill.register('modules/imageDrop', ImageDropModule.ImageDrop);
  Quill.register(Size, true);
  Quill.register(CodeEditorContainer(context, store));
  Quill.register(Font, true);

  const icons = Quill.import('ui/icons');
  icons['code-editor-container'] = '<i class="fab fa-js-square"></i>';

  const options = {
    theme: 'snow',
    modules: {
      keyboard: {
        bindings: {},
      },
      toolbar: {
        container: [
          [{font: Font.whitelist}],
          [{header: [1, 2, 3, 4, 5, 6, false]}],
          [
            {size: Size.whitelist},
            {align: []},
            'bold',
            'italic',
            'underline',
            'strike'],
          [{list: 'ordered'}, {list: 'bullet'}, {indent: '-1'}, {indent: '+1'}],
          [
            {
              color: [
                '#000000',
                '#e60000',
                '#ff9900',
                '#ffff00',
                '#008a00',
                '#0066cc',
                '#9933ff',
                '#ffffff',
                '#facccc',
                '#ffebcc',
                '#ffffcc',
                '#cce8cc',
                '#cce0f5',
                '#ebd6ff',
                '#bbbbbb',
                '#f06666',
                '#ffc266',
                '#ffff66',
                '#66b966',
                '#66a3e0',
                '#c285ff',
                '#888888',
                '#a10000',
                '#b26b00',
                '#b2b200',
                '#006100',
                '#0047b2',
                '#6b24b2',
                '#444444',
                '#5c0000',
                '#663d00',
                '#666600',
                '#003700',
                '#002966',
                '#3d1466',
                'custom-color'],
            },
            {
              background: [
                '#000000',
                '#e60000',
                '#ff9900',
                '#ffff00',
                '#008a00',
                '#0066cc',
                '#9933ff',
                '#ffffff',
                '#facccc',
                '#ffebcc',
                '#ffffcc',
                '#cce8cc',
                '#cce0f5',
                '#ebd6ff',
                '#bbbbbb',
                '#f06666',
                '#ffc266',
                '#ffff66',
                '#66b966',
                '#66a3e0',
                '#c285ff',
                '#888888',
                '#a10000',
                '#b26b00',
                '#b2b200',
                '#006100',
                '#0047b2',
                '#6b24b2',
                '#444444',
                '#5c0000',
                '#663d00',
                '#666600',
                '#003700',
                '#002966',
                '#3d1466',
                'custom-color'],
            },
          ],
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
            const quill = window._mercuryParagraphEditor;
            const range = quill.getSelection();
            const codeEditorUUID = `${UUID()}`;
            quill.insertEmbed(range.index, 'code-editor-container',
              `code-editor-container-${codeEditorUUID}`);
          },
          color: function(value) {
            const quill = window._mercuryParagraphEditor;
            if (value === 'custom-color') {
              prompt({
                title: 'Enter Color of CSS',
                label: 'color:',
                value: '',
                type: 'input',
              }).then(result => {
                quill.format('color', result);
              });
            } else {
              quill.format('color', value);
            }
          },
          background: function(value) {
            const quill = window._mercuryParagraphEditor;
            if (value === 'custom-color') {
              prompt({
                title: 'Enter Background of CSS',
                label: 'background:',
                value: '',
                type: 'input',
              }).then(result => {
                quill.format('background', result);
              });
            } else {
              quill.format('background', value);
            }
          },
        },
      },
      imageDrop: true,
    },
  };
  return new Quill(editorRef.current, options);
}
