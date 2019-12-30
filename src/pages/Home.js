import React from "react";
import { Helmet } from 'react-helmet'
import app from '../application'
import "./Home.scss";

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
          MERCURY
        </div>
        <div className={`version-name`}>
          Alpha
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
