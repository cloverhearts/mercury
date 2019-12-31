import React from "react";
import { Helmet } from 'react-helmet'
import app from '../application'
import "./Home.scss";
import ApplicationInformation from '../application'

export default () => {
  return <div className={`mercury-home-container`}>
    <Helmet>
      <title>{`${app.name}`}</title>
    </Helmet>
    <div className={`mercury-jumbo-container`}>
      <div className="stars"></div>
      <div className="twinkling"></div>
      <div className={`mercury-header`}>
        <div className={`title`}>
          {ApplicationInformation.name}
        </div>
        <div className={`version-name`}>
          {ApplicationInformation.releaseName}
        </div>
        <div className={`comment`}>
          <p>Let's start data discovery</p>
          <p>with javascript echo system.</p>
        </div>
      </div>
      <div className={`mercury-big-logo`}>
        Mercury big logo
      </div>
    </div>
    Home
  </div>;
};
