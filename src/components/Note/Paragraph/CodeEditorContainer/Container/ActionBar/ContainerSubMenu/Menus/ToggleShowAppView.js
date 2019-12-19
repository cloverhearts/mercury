import React, { useMemo, useCallback } from "react";
import { MenuItem } from "@blueprintjs/core";

export default function ToggleShowAppViewButton(props) {
  const { Container, onUpdateMetaConfig } = props;
  const isHide = useMemo(() =>  Container.meta.config && Container.meta.config.hide &&Container.meta.config.hide.appView, [Container.meta.config.hide])
  const onToggleAppView = useCallback((e) => {
    e.preventDefault()
    const showConfig = Container.meta.config.hide || { appView: false }
    onUpdateMetaConfig({... Container.meta.config, hide: {...showConfig, appView: !showConfig.appView }})
  }, [isHide])

return <MenuItem icon={isHide ? `eye-off` : `eye-open`} text={isHide ? `Hidden App view` : `Visible App view`} onClick={onToggleAppView} />;
}
