import React from "react";
import { Alignment, Button, Navbar, Popover, Position } from "@blueprintjs/core";
import { NavLink } from "react-router-dom";

import NotesMenu from "./Notes";

export default props => {
  return (
    <div>
      <div>
        <Navbar fixedToTop>
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
            <Navbar.Divider />
            <NavLink to="/" exact activeClassName="active">
              <Button className="bp3-minimal" icon="cog" />
            </NavLink>
          </Navbar.Group>
        </Navbar>
      </div>
    </div>
  );
};
