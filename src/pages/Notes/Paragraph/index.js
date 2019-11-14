import React, {useEffect} from "react";
import ParagraphEditor from "../../../components/Editor/Paragraph";
import "./Paragraph.scss";
export default props => {
  const { context } = props;
  return (
    <div className={`mercury-paragraph`}>
      {context && context.id ? <ParagraphEditor key={context.id} context={context} /> : <div>Note does not found</div>}
    </div>
  );
};
