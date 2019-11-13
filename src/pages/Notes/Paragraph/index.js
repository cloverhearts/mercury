import React from "react";
import ParagraphEditor from "../../../components/Editor/Paragraph";
import "./Paragraph.scss";
export default props => {
  const { context } = props;
  return (
    <div className={`mercury-paragraph`}>{context && context.id ? <ParagraphEditor context={context} /> : null}</div>
  );
};
