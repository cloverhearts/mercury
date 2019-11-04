import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NoteActions from "../../store/Note/types";
import NoteStore from "../../store/Note";

import Paragraph from "./Paragraph";

import "./Note.scss";

export default props => {
  const { noteID } = useParams();
  console.log("note id ", noteID);
  const [currentNote, setCurrentNote] = useState({});
  useEffect(() => {
    if (noteID) {
      NoteStore.dispatch({ type: NoteActions.LOAD_NOTE, data: { noteId: noteID } });
    }

    //   NoteStore.getState().then(e => {
    //     const note = e.data.current.note;
    //     setCurrentNote(note);
    //     console.log("note ", e, note);
    //   });
  }, [noteID]);

  useEffect(() => {
    console.log("aa", currentNote, currentNote.paragraphs);
  }, currentNote.paragraphs);

  return (
    <div className={`mercury-note`}>
      <Paragraph />
    </div>
  );
};
