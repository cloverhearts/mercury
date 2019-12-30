import React from "react";
import { Menu } from "@blueprintjs/core";
import ToggleShowEditorMenu from "./Menus/ToggleShowEditor";
import ToggleShowAppViewMenu from "./Menus/ToggleShowAppView";

export default function ContainerSubmenu(props) {
  const { Container, onUpdateMetaConfig } = props;
  return (
    <Menu>
      <ToggleShowEditorMenu
        Container={Container}
        onUpdateMetaConfig={onUpdateMetaConfig}
      />
      <ToggleShowAppViewMenu
        Container={Container}
        onUpdateMetaConfig={onUpdateMetaConfig}
      />
    </Menu>
  );
}
