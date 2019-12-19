import React from "react";
import { Menu, MenuItem } from "@blueprintjs/core";
import ToggleShowEditorMenu from './Menus/ToggleShowEditor'
import ToggleShowAppView from "./Menus/ToggleShowAppView";

export default function ContainerSubmenu(props) {
  const { Container, onUpdateMetaConfig } = props
  return (
    <Menu>
      <ToggleShowEditorMenu Container={Container} onUpdateMetaConfig={onUpdateMetaConfig} />
      <ToggleShowAppView Container={Container} onUpdateMetaConfig={onUpdateMetaConfig} />
    </Menu>
  );
}
