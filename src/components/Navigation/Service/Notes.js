import React from "react";
import { useDispatch } from "react-redux";
import { Menu, MenuItem, MenuDivider } from "@blueprintjs/core";
import { useHistory } from "react-router-dom";

import NoteActions from "../../../store/Note/actions";

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
  let history = useHistory();
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
      <MenuDivider title="Favorite notes" />
      <MenuItem icon="star" text="Just 1 note" />
      <MenuItem icon="star" text="Just 2 note" />
      <MenuItem icon="star" text="Just 3 note" />
      <MenuItem icon="star" text="Just 4 note" />
      <MenuItem icon="star" text="Just 5 note" />
      <MenuDivider title="Recently notes" />
      <MenuItem icon="cube" text="Just 1 note" />
      <MenuItem icon="cube" text="Just 2 note" />
      <MenuItem icon="cube" text="Just 3 note" />
      <MenuItem icon="cube" text="Just 4 note" />
      <MenuItem icon="cube" text="Just 5 note" />
    </Menu>
  );
};
