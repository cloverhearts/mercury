import React, { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Quill from "quill";
import QuillBetterTable from "quill-better-table";
import "./Editor.scss";
import CodeEditor from "../../../components/Paragraph";

const BlockEmbed = Quill.import("blots/block/embed");
class DividerBlot extends BlockEmbed {}
DividerBlot.blotName = "divider";
DividerBlot.tagName = "hr";

async function initializeQuill(editorRef) {
  window.Quill = Quill;
  const ImageDropModule = await import("quill-image-drop-module");
  const BlotFormatter = await import("quill-blot-formatter");
  Quill.register("modules/imageDrop", ImageDropModule.ImageDrop);
  Quill.register("modules/blotFormatter", BlotFormatter.default);
  Quill.register(
    {
      "modules/better-table": QuillBetterTable
    },
    true
  );
  console.log(QuillBetterTable.keyboardBindings);
  Quill.register(DividerBlot);

  const options = {
    theme: "snow",
    modules: {
      keyboard: {
        bindings: {
          tab: {
            key: 9,
            handler: function(range, context) {
              console.log("1111", range, context);
              const quill = window.editor;
              quill.clipboard.dangerouslyPasteHTML(range.index, '<div id="code-editor2">ff</div>');
              setTimeout(() => {
                ReactDOM.render(<CodeEditor />, document.querySelector("#code-editor2"));
              }, 1000);
            }
          }
        }
      },
      toolbar: [
        [{ font: ["Source Code Pro", "monospace", "Arial"] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ direction: "rtl" }, { list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
        [{ size: [] }, { align: [] }, "bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        ["link", "blockquote", "image", "video", "formula", "code-block", "divider"]
      ],
      imageDrop: true,
      blotFormatter: {}
    }
  };

  return new Quill(editorRef.current, options);
}

export default props => {
  const context = props.context || "12212";
  const editorRef = useRef();
  const preview = useRef();
  const [rawHtml, setRawHtml] = useState(context);
  let editor = null;
  useEffect(() => {
    (async editorRef => {
      if (!window.Quill) {
        editor = await initializeQuill(editorRef);
        editor.keyboard.bindings["Backspace"] = [];
        window.editor = editor;
        editor.on("text-change", () => {
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
      <div ref={editorRef}>{context}</div>
      <div ref={preview} className={`ql-editor `}></div>
    </div>
  );
};
