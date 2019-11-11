import React from "react";
import Editor from "./Editor";
export default props => {
  const { context } = props;
  return (
    <div className={`mercury-paragraph-container`}>
      <Editor context={context} />
    </div>
  );
};
