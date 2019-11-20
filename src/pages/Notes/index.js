import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Note from "../../components/Note/Card";

import "./index.scss";

export default () => {
  const notes = useSelector(state => state.note.list.notes);
  return (
    <div className={`mercury-note-list-container`}>
      <div className={`note-list`}>
        {notes.map(note => (
          <Note {...note} />
        ))}
      </div>
    </div>
  );
};
