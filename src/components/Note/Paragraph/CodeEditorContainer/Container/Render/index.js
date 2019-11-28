import React, {useEffect, useRef} from 'react';

import './index.scss';

export default function MercuryRenderContainer(props) {
  const {Container, onUpdateRender} = props;
  const renderRef = useRef();

  useEffect(() => {
    const render = renderRef.current;
    if (render) {
      render.addEventListener('DOMSubtreeModified',
        (e) => {
          if (e && e.target) {
            onUpdateRender(e.target.innerHTML);
          }
        });
      if (Container.render && Container.render.html) {
        render.innerHTML = Container.render.html
      }
    }
  }, [renderRef.current]);
  return <div id={`html-${Container.id}`} ref={renderRef}
              className={`mercury-render-container`}>
  </div>;
}
