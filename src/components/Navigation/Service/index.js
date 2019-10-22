import React from "react";
import { Alignment, Button, Navbar } from "@blueprintjs/core";
import { NavLink } from "react-router-dom";

export default props => {
  return (
    <div>
      <div>
        <Navbar>
          <Navbar.Group align={Alignment.LEFT}>
            <Navbar.Heading>Mercury</Navbar.Heading>
            <Navbar.Divider />
            <NavLink to="/" exact activeClassName="active">
              <Button className="bp3-minimal" icon="home" text="Home" />
            </NavLink>
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
