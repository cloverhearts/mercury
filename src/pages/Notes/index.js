import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Note from "../../components/Note/Card";

import "./index.scss";

export default () => {
  const notes = useSelector(state => state.note.list.notes);
  return (
    <div className={`mercury-note-list-container`}>
      { notes && notes.length > 0 ? <div className={`note-list`}>
        {notes.map(note => (
          <Note key={note.id} {...note} />
        ))}
      </div> : <div>Does not found any note</div>}

    </div>
  );
};
