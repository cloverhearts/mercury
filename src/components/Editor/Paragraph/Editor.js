import React, { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Quill from "quill";
import "./Editor.scss";
import CodeEditor from "../../../components/Paragraph";
import UUID from "uuid/v4";

const CodeEditorBlock = Quill.import("blots/block/embed");
class CodeEditorContainer extends CodeEditorBlock {
  static create(containerID) {
    let node = super.create();
    node.setAttribute("data-container-id", `code-container-${containerID}`);
    node.setAttribute("contentEditable", false);
    return node;
  }

  static value(node) {
    return node;
  }
}
CodeEditorContainer.blotName = "code-editor-container";
CodeEditorContainer.tagName = "span";
CodeEditorContainer.className = "mercury-code-editor-container";
CodeEditorContainer.content = "hoho";

async function initializeQuill(editorRef) {
  window.Quill = Quill;
  const ImageDropModule = await import("quill-image-drop-module");
  const BlotFormatter = await import("quill-blot-formatter");
  Quill.register("modules/imageDrop", ImageDropModule.ImageDrop);
  Quill.register("modules/blotFormatter", BlotFormatter.default);
  Quill.register(CodeEditorContainer);
  var icons = Quill.import("ui/icons");
  icons["code-editor-container"] = '<i class="fa fa-minus" aria-hidden="true"></i>';

  const options = {
    theme: "snow",
    modules: {
      keyboard: {
        bindings: {}
      },
      toolbar: {
        container: [
          [{ font: ["Source Code Pro", "monospace", "Arial"] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ direction: "rtl" }, { list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
          [{ size: [] }, { align: [] }, "bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ script: "sub" }, { script: "super" }],
          ["link", "blockquote", "image", "video", "formula", "code-block", "code-editor-container"]
        ],
        handlers: {
          "code-editor-container": function(value) {
            const quill = window.editor;
            const range = quill.getSelection();
            const codeEditorUUID = `${UUID()}`;
            const opsEvents = quill.insertEmbed(range.index, "code-editor-container", codeEditorUUID);
            const editorDOM = opsEvents.ops
              .filter(event => event.insert && event.insert["code-editor-container"])
              .find(
                e => e.insert["code-editor-container"]["dataset"]["containerId"] === `code-container-${codeEditorUUID}`
              );
            if (editorDOM) {
              ReactDOM.render(<CodeEditor />, editorDOM.insert["code-editor-container"]);
            }
          }
        }
      },
      imageDrop: true,
      blotFormatter: {}
    }
  };

  return new Quill(editorRef.current, options);
}
function testClick() {}
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
