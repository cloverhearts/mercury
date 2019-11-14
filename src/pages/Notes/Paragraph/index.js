import React from "react";
import ParagraphEditor from "../../../components/Editor/Paragraph";
import "./Paragraph.scss";
export default props => {
  const { context } = props;
  console.log(context);
  return (
    <div className={`mercury-paragraph`}>
      {context && context.id ? <ParagraphEditor context={context} /> : <div>Note does not found</div>}
    </div>
  );
};
