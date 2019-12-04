import React, { useEffect, useState } from 'react'

import LogTheme from './theme';
import {Button, ButtonGroup, Position, Tooltip} from '@blueprintjs/core';
import moment from 'moment';
import {chromeLight, Inspector} from 'react-inspector';

import './index.scss'

export default function MercuryLogger({Container}) {
  const [logs, setLogs] = useState(Container.logger.logs);
  const [themes] = useState(LogTheme);

  useEffect(() => {
    const eventListener = (_, event) => {
      setTimeout(() => setLogs([...Container.logger.logs]), 0);
    };
    Container.addEventListener(Container.channel.LOGGER, eventListener);
    return function cleanUp() {
      Container.removeListener(eventListener);
    };
  }, [Container.id]);

  function onClearLog() {
    Container.logger.clear();
    setTimeout(() => setLogs([...Container.logger.logs]), 0);
  }

  return (
    <div className={`log-viewer`}>
      <div className={`log-controller-box`}>
        <ButtonGroup>
          <Tooltip content="Clear console" position={Position.TOP}>
            <Button icon={`delete`} onClick={onClearLog}
                    className={`clear-log-button`}></Button>
          </Tooltip>
        </ButtonGroup>
      </div>
      <div className="log-list">
        {logs.map((log, index) => (
          <div key={index} className={`log-row level-${log.level}`}>
            <div className={`log-time`}>{moment(log.time * 1000).
              calendar()}</div>
            <Inspector theme={{...chromeLight, ...themes[log.level]}}
                       data={log.data}/>
          </div>
        ))}
        {logs.length <= 0 ? <div className={`empty-log-viewer`}>
          Clean logs!
        </div> : null}
      </div>
    </div>
  );
}
