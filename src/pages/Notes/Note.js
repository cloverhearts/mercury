import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import NoteActions from "../../store/Note/actions";
import { useDispatch, useSelector } from "react-redux";
import Paragraph from "./Paragraph";

import "./Note.scss";

export default props => {
  const { noteId } = useParams();
  const currentNote = useSelector(state => state.note.current.note);
  const dispatch = useDispatch();
  const [note, setNote] = useState({});
  const [paragraph, setParagraph] = useState({});
  useEffect(() => {
    if (noteId) {
      dispatch(NoteActions.loadNote({ noteId }));
    }
    return () => {
      dispatch(NoteActions.unsetCurrentNote());
    };
  }, [noteId]);

  useEffect(() => {
    setNote(currentNote);
    if (currentNote.paragraphs) {
      setParagraph(currentNote.paragraphs[0]);
    }
  }, [currentNote]);

  return (
    <div className={`mercury-note`}>
      {note ? <Paragraph context={paragraph} /> : null}
    </div>
  );
};
