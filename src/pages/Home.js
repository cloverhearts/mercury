import React from "react";
import { Helmet } from 'react-helmet'
import app from '../application'
import "./Home.scss";

export default () => {
  return <div className={`mercury-home-container`}>
    <Helmet>
      <title>{`${app.name}`}</title>
    </Helmet>
    Home
  </div>;
};
