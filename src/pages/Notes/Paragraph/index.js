import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import Editor from "react-medium-editor";
import "medium-editor/dist/css/medium-editor.css";
import "medium-editor/dist/css/themes/roman.css";
import "./Paragraph.scss";
const CustomHtml = window.CustomHtml;

const TestViewer = props => {
  function onClick(event) {
    console.log("click! event!");
  }
  return <button onClick={onClick}>TestViwer click me</button>;
};

export default props => {
  const [content, setContent] = useState("Typing here...");
  const editorRef = useRef();

  const onChangeText = event => {
    console.log(event);
  };

  CustomHtml.prototype.onClick = function(e) {
    console.log("cccc!", document.querySelector("#test"));
    setTimeout(() => {
      ReactDOM.render(<TestViewer />, document.querySelector("#test"));
    }, 100);
    console.log("click", this);
    CustomHtml.insertHtmlAtCaret(this.options.htmlToInsert);
  };

  CustomHtml.prototype.getButton = function(e) {
    console.log("getButton", e, this);
    return this.button;
  };

  const customHtml = new CustomHtml({
    buttonText: "<hr>",
    htmlToInsert: "<p><div id='test'>hahah</div></p><p><br></p>"
  });

  const options = {
    placeholder: { text: "Write your response here" },
    autoLink: true,
    toolbar: {
      delay: 1000,
      targetBlank: true,
      allowMultiParagraphSelection: true,
      buttons: [
        "bold",
        "italic",
        "underline",
        "anchor",
        "h2",
        "h3",
        "quote",
        {
          name: "justifyLeft",
          contentDefault: `<span class="bp3-icon-standard bp3-icon-align-left"></span>`
        },
        {
          name: "justifyCenter",
          contentDefault: `<span class="bp3-icon-standard bp3-icon-align-center"></span>`
        },

        {
          name: "justifyRight",
          contentDefault: `<span class="bp3-icon-standard bp3-icon-align-right"></span>`
        },
        "html",
        "customHtml"
      ],
      updateOnEmptySelection: true
    },
    targetBlank: true,
    anchor: {
      placeholderText: "Type a link",
      customClassOption: "btn",
      customClassOptionText: "Create Button"
    },
    imageDragging: true,
    anchorPreview: {
      hideDelay: 300
    },
    justifyLeft: {
      content: "aaa"
    },
    extensions: {
      customHtml: customHtml
    }
  };
  window.editor = editorRef;
  useEffect(() => {
    console.log("Hello world");
    const editor = editorRef.current.medium;
    console.log(editor);
    editor.subscribe("editableInput", function(event, editable) {
      console.log("editableInput ", event.data, event);
    });

    editor.subscribe("selectionchange", function(event, editable) {
      console.log("selectionchange", event.data, event);
    });
  }, [editorRef]);

  return (
    <div className={`mercury-paragraph`}>
      Para
      <span class="bp3-icon-large bp3-icon-geosearch bp3-intent-success"></span>
      <i class="fas fa-align-center"></i>
      <a href="//www.nexon.co.kr">Nexon</a>
      ]]
      <Editor
        ref={editorRef}
        className={`mercury-context-editor`}
        text={content}
        onChange={onChangeText}
        options={options}
      />
    </div>
  );
};
