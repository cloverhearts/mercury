import React from 'react';
import Editor from '../Editor/CodeEditor';
import {Reporter, LANG} from 'mercury/client';

export default (props) => {
  const reporter = new Reporter({
    language: LANG.JAVASCRIPT,
    code: `const r = await mercury.RemoteClient.RemoteAjax.build('1111', { url: 'https://www.naver.com'}).send();\nconsole.log(r)`,
  });
  return (
    <div>
      Paragraph
      <Editor Reporter={reporter}/>
    </div>
  );
}
