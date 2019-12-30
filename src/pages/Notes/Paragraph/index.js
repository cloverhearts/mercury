import React from "react";
import ParagraphEditor from "../../../components/Note/Paragraph";
import { Spinner, Intent } from '@blueprintjs/core'

import "./Paragraph.scss";
export default props => {
  const { context } = props;
  return (
    <div className={`mercury-paragraph`}>
      {context && context.id ? <ParagraphEditor key={context.id} context={context} />
      :
        <div className={`mercury-paragraph-loading`}>
        <Spinner intent={Intent.PRIMARY} size={Spinner.SIZE_STANDARD}  />
      </div>}
    </div>
  );
};
