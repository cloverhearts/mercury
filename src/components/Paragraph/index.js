import React from "react";
import { Card, Elevation } from "@blueprintjs/core";
import Editor from "../Editor/CodeEditor";
import Mercury from "mercury-core";

export default props => {
  const CodeContainer = Mercury.Code.Container;
  const LANGUAGE = Mercury.Code.Languages;
  const codeContainer = new CodeContainer({
    language: LANGUAGE.JAVASCRIPT,
    code: `
          const r = await _mercury.utils.fetch.build('1111', { url: 'https://www.naver.com'}).send();
          const data = r.data.data
          const { JSDOM } = _mercury.utils.jsdom
          const dom = new JSDOM(data)
          const list = [...dom.window.document.querySelectorAll('img')].map(e => e.src)
          console.log(list)
          const _html = html\`<div style="color: red;">Images\${list.map(item => html\`<img src='\${item}' style='width: 100px; height: 100px;' />\`)}</div>
          \`
          render(_html)         
          `
  });
  return (
    <Card elevation={Elevation.TWO}>
      <Editor CodeContainer={codeContainer} />
    </Card>
  );
};
