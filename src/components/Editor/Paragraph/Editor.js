import React, {useRef, useEffect, useState} from 'react';
import Quill from 'quill';

import './Editor.scss';

async function initializeQuill(editorRef) {
  window.Quill = Quill;
  const ImageDropModule = await import('quill-image-drop-module');
  const VideoResize = await import('quill-video-resize-module');
  const ImageResizeModule = await import('quill-image-resize-module');
  Quill.register('modules/imageDrop', ImageDropModule.ImageDrop);
  Quill.register('modules/imageResize', ImageResizeModule.default);
  Quill.register('modules/VideoResize', VideoResize.default);
  return new Quill(editorRef.current, options);
}

const options = {
  theme: 'snow',
  modules: {
    toolbar: [
      [{'font': ['Source Code Pro', 'monospace', 'Arial']}],
      [{'header': [1, 2, 3, 4, 5, 6, false]}],
      [
        {'direction': 'rtl'},
        {'list': 'ordered'},
        {'list': 'bullet'},
        {'indent': '-1'},
        {'indent': '+1'}],
      [{'size': []}, {'align': []}, 'bold', 'italic', 'underline', 'strike'],
      [{'color': []}, {'background': []}],
      [{'script': 'sub'}, {'script': 'super'}],
      ['link', 'blockquote', 'image', 'video', 'formula', 'code-block'],
    ],
    imageDrop: true,
    VideoResize: {
      modules: ['Resize', 'DisplaySize', 'Toolbar'],
    },
    imageResize: {
      modules: ['Resize', 'DisplaySize', 'Toolbar'],
    },
  },
};

export default (props) => {
  const editorRef = useRef();
  const preview = useRef();
  const [rawHtml, setRawHtml] = useState('<DIV>FF</DIV>');
  let editor = null;
  useEffect(() => {
    (async (editorRef) => {
      if (!window.Quill) {
        editor = await initializeQuill(editorRef);
        window.editor = editor;
        editor.on('text-change', () => {
          const html = editor.container.firstChild.innerHTML;
          setRawHtml(html);
        });
      }
    })(editorRef);
  }, [editorRef]);
  useEffect(() => {
    preview.current.innerHTML = rawHtml;
  }, [preview, rawHtml]);
  return (
    <div className={`mercury-paragraph-editor ql-snow`}>
      <div ref={editorRef}>fff</div>
      <div ref={preview} className={`ql-editor `}></div>
    </div>
  );
}
