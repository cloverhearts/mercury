import React from "react";
import { Alignment, Button, Navbar, Popover, Position } from "@blueprintjs/core";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import SuggestionSaveNoteButton from "./Partials/SuggestionForSaveNoteButton";
import NotesMenu from "./Notes";
import NoteActions from "../../../store/Note/actions";

import "./service.scss";

export default props => {
  const dispatch = useDispatch();
  dispatch(NoteActions.listOfNote());
  return (
    <Navbar fixedToTop className="mercury-service-navbar">
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>Mercury</Navbar.Heading>
        <Navbar.Divider />
        <NavLink to="/" exact activeClassName="active">
          <Button className="bp3-minimal" icon="home" text="Home" />
        </NavLink>
        <Popover content={<NotesMenu />} position={Position.BOTTOM}>
          <Button className="bp3-minimal" icon="cube" text="Notes" />
        </Popover>
        <NavLink to="/informations" activeClassName="active">
          <Button className="bp3-minimal" icon="document" text="Informations" />
        </NavLink>
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <SuggestionSaveNoteButton />
        <Navbar.Divider />
        <NavLink to="/" exact activeClassName="active">
          <Button className="bp3-minimal" icon="cog" />
        </NavLink>
      </Navbar.Group>
    </Navbar>
  );
};
