import React from "react";
import Editor from "../Editor/CodeEditor";
import { Reporter, LANG } from "mercury-core/client";

export default props => {
  const reporter = new Reporter({
    language: LANG.JAVASCRIPT,
    code: `
          const r = await _mercury.RemoteClient.RemoteAjax.build('1111', { url: 'https://www.naver.com'}).send();
          const data = r.data.data
          const { JSDOM } = _mercury.utils.jsdom
          const dom = new JSDOM(data)
          const list = [...dom.window.document.querySelectorAll('img')].map(e => e.src)
          console.log(list)
          `
  });
  return (
    <div>
      Paragraph
      <Editor Reporter={reporter} />
    </div>
  );
};
