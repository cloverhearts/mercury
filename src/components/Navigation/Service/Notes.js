import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu, MenuItem, MenuDivider } from "@blueprintjs/core";
import { useHistory } from "react-router-dom";

import NoteActions from "../../../store/Note/actions";

function RecentlyNotes(props) {
  const { notes } = props;
  const history = useHistory();
  const goTo = useCallback(id => {
    console.log(id);
    history.push(`/notes/${id}`);
  });
  return (
    <React.Fragment>
      {notes ? <MenuDivider title="Recently notes" /> : null}
      {notes.map(note => (
        <MenuItem key={note.id} icon="cube" text={note.title} onClick={_ => goTo(note.id)} />
      ))}
    </React.Fragment>
  );
}

function CreateNewNoteMenuItem() {
  const dispatch = useDispatch();

  function createNewNote(title = "New Note") {
    dispatch(NoteActions.newNote({ title, redirect: true }));
  }

  function onClickNewNote() {
    createNewNote();
  }
  return <MenuItem icon="cube-add" text="New data note" onClick={onClickNewNote} />;
}

export default props => {
  const history = useHistory();
  const notes = useSelector(state => state.note.list.notes);
  const goTo = (pathname, params) => {
    const location = {
      pathname,
      state: params
    };
    history.push(location);
  };

  return (
    <Menu>
      <CreateNewNoteMenuItem />
      <MenuItem icon="list" text="Show all notes" onClick={e => goTo("/notes")} />
      <RecentlyNotes notes={notes} />
    </Menu>
  );
};
