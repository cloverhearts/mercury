import React, {useEffect, useRef, useState} from 'react';
import moment from 'moment'

import './index.scss';

export default function MercuryRenderContainer(props) {
  const {Container, onUpdateRender} = props;
  const [latestUpdated, setLatestUpdated] = useState(Container.meta.updatedAt)
  const renderRef = useRef();

  useEffect(() => {
    const render = renderRef.current;
    if (render) {
      render.addEventListener('DOMSubtreeModified',
        (e) => {
          if (e && e.target) {
            onUpdateRender(e.target.innerHTML);
            setLatestUpdated(moment().local().toString())
          }
        });
      if (Container.render && Container.render.html) {
        render.innerHTML = Container.render.html
      }
    }
  }, [renderRef.current]);
  return (
    <div className={`mercury-render-container-wrap`}>
      <div
        className={`updated-at`}>
        {latestUpdated ? `updated at ${moment(new Date(latestUpdated)).local().toISOString()}` : ''}
      </div>
      <div id={`html-${Container.id}`} ref={renderRef}
           className={`mercury-render-container`}></div>
    </div>
  )
}
