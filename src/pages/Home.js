import React from "react";
import { Helmet } from 'react-helmet'
import app from '../application'
import "./Home.scss";
import ApplicationInformation from '../application'
import {useSelector} from "react-redux";
import Note from "../components/Note/Card";

export default () => {
  const notes = useSelector(state => state.note.list.notes);
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
          <div className={`version-number`}>{`${ApplicationInformation.version}`}</div>
        </div>
      </div>
      <div className={`mercury-big-logo`}>
        Mercury big logo
      </div>
    </div>
    <div className={`mercury-recently-notes`}>
      <div className={`list`}>
        { notes && notes.length > 0 ? <div className={`note-list`}>
          {notes.slice(0, 5).map(note => (
            <Note key={note.id} {...note} />
          ))}
        </div> : <div className={`cannot-found-notes`}></div>}
      </div>
    </div>
    <div className={`product-information`}>
      <div className={`maintainers`}>
        <div className={`header`}>
          Product Maintainer
        </div>
        <div className={`list`}>
          {ApplicationInformation.maintainer.map(maintainer =>
            <div className={`maintainer person-card`}>
              <div className={`name`}>{maintainer.name}</div>
              <div className={`email`}><a href={`mailto:${maintainer.email}`}>Email</a></div>
              <div className={`homepage`}><a href={maintainer.homepage} target={`_blank`}>Homepage</a></div>
              <div className={`github`}><a href={maintainer.github} target={`_blank`}>Github</a></div>
            </div>
          )}
        </div>
      </div>
      <div className={`contributors`}>
        <div className={`header`}>
          Product Contributors
        </div>
        <div className={`list`}>
          {ApplicationInformation.contributors.map(contributor =>
            <div className={`contributor person-card`}>
              <div className={`name`}>{contributor.name}</div>
              <div className={`email`}><a href={`mailto:${contributor.email}`}>Email</a></div>
              <div className={`homepage`}><a href={contributor.homepage} target={`_blank`}>Homepage</a></div>
              <div className={`github`}><a href={contributor.github} target={`_blank`}>Github</a></div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>;
};
