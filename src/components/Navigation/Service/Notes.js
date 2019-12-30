import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu, MenuItem, MenuDivider } from "@blueprintjs/core";
import { useHistory } from "react-router-dom";
import PlatformActions from "../../../store/Platform/actions";

import './Notes.scss'

function RecentlyNotes(props) {
  const { notes } = props;
  const history = useHistory();
  const goTo = useCallback(id => {
    history.push(`/notes/${id}`);
  });
  return (
    <React.Fragment>
      {notes && notes.length > 0 ? <MenuDivider title="Recently notes" /> : null}
      {notes.slice(0, 5).map(note => (
        <MenuItem key={note.id} icon="cube" text={note.title} onClick={_ => goTo(note.id)} />
      ))}
    </React.Fragment>
  );
}

function CreateNewNoteMenuItem() {
  const dispatch = useDispatch();

  function createNewNote(title = "New Note") {
    dispatch(PlatformActions.openCreateNewNoteDialog({ title }));
  }

  function onClickNewNote() {
    createNewNote();
  }
  return <MenuItem icon="cube-add" text="New data note" onClick={onClickNewNote} />;
}

function ImportNoteMenuItem() {
  const dispatch = useDispatch()
  const onClickImportNote = useCallback(() => {
    dispatch(PlatformActions.openImportNoteDialog())
  }, [])
  return <MenuItem icon="import" text="Import note" onClick={onClickImportNote} />
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
    <Menu className={`mercury-service-nav-note-menus`}>
      <CreateNewNoteMenuItem />
      <ImportNoteMenuItem />
      <MenuItem icon="list" text="Show all notes" onClick={e => goTo("/notes")} />
      <RecentlyNotes notes={notes} />
    </Menu>
  );
};
