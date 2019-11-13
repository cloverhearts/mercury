import React from "react";
import { useParams } from "react-router-dom";
import noteStore from "../../store/Note";

export default () => {
  const { noteID } = useParams();
  console.log(noteStore);
  return <div>Notes</div>;
};
