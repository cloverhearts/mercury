import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NoteActions from "../../store/Note/actions";
import { useDispatch, useSelector } from "react-redux";

import Paragraph from "./Paragraph";

import "./Note.scss";

export default props => {
  const { noteId } = useParams();
  const currentNote = useSelector(state => state.current);
  const dispatch = useDispatch();
  const [note, setNote] = useState({});
  useEffect(() => {
    if (noteId) {
      dispatch(NoteActions.loadNote({ noteId }));
    }
  }, [noteId]);

  useEffect(() => {
    console.log("note loaded ", currentNote);
    setNote(currentNote);
  }, [currentNote]);

  return (
    <div className={`mercury-note`}>
      <Paragraph />
    </div>
  );
};
