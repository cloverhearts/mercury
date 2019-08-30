import React from 'react';
import './App.scss';
import { Button, Menu, MenuDivider, MenuItem, Popover, Position } from "@blueprintjs/core";
function App() {
  return (
    <div>
      Hello D2NOTE
      <Button icon="refresh" intent="danger" text="Reset" />
      <Button icon="user" rightIcon="caret-down" text="Profile settings" />
      <Button rightIcon="arrow-right" intent="success" text="Next step" />
      <Menu>
        <MenuItem icon="graph" text="Graph" />
        <MenuItem icon="map" text="Map" />
        <MenuItem icon="th" text="Table" shouldDismissPopover={false} />
        <MenuItem icon="zoom-to-fit" text="Nucleus" disabled={true} />
        <MenuDivider />
        <MenuItem icon="cog" text="Settings...">
          <MenuItem icon="add" text="Add new application" disabled={true} />
          <MenuItem icon="remove" text="Remove application" />
        </MenuItem>
      </Menu>
    </div>
  );
}

export default App;
