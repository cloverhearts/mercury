import React, { useMemo, useCallback } from "react";
import { MenuItem } from "@blueprintjs/core";

export default function ToggleShowEditorButton(props) {
  const { Container, onUpdateMetaConfig } = props;
  const isHide = useMemo(
    () =>
      Container.meta.config &&
      Container.meta.config.hide &&
      Container.meta.config.hide.editor,
    [Container.meta.config.hide]
  );
  const onToggleEditorShow = useCallback(
    e => {
      e.preventDefault();
      const showConfig = Container.meta.config.hide || { editor: false };
      onUpdateMetaConfig({
        ...Container.meta.config,
        hide: { ...showConfig, editor: !showConfig.editor }
      });
    },
    [isHide]
  );

  return (
    <MenuItem
      icon={isHide ? `eye-off` : `eye-open`}
      text={isHide ? `Hidden Editor` : `Visible Editor`}
      onClick={onToggleEditorShow}
    />
  );
}
