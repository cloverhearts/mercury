import React from "react";
import { useParams } from "react-router-dom";

import Paragraph from "./Paragraph";

export default props => {
  const { noteID } = useParams();
  return (
    <div className={`mercury-note`}>
      Mercury note {noteID}
      <Paragraph />
    </div>
  );
};
