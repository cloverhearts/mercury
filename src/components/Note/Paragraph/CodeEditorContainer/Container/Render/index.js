import React, { useEffect } from 'react'

import './index.scss'

export default function MercuryRenderContainer(props) {
  const { Container } = props
  return <div id={`html-${Container.id}`} className={`mercury-render-container`}></div>
}
