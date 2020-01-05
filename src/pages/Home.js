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
        <svg width="224" height="218" viewBox="0 0 224 218" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="39" cy="67.2394" rx="17" ry="15.5" fill="#FE7E08"/>
          <ellipse cx="114" cy="98.2394" rx="17" ry="15.5" fill="#FE7E08"/>
          <ellipse cx="77.5273" cy="132.254" rx="24.242" ry="57.0132" transform="rotate(43.0105 77.5273 132.254)" fill="#FE7E08"/>
          <ellipse cx="64.0727" cy="151.922" rx="24.242" ry="67.1707" transform="rotate(-43.9523 64.0727 151.922)" fill="#FE7E08"/>
          <ellipse cx="104.251" cy="173.131" rx="24.242" ry="41.7328" transform="rotate(-61.1006 104.251 173.131)" fill="#FE7E08"/>
          <ellipse cx="64.5" cy="131.239" rx="28.9306" ry="42.9595" transform="rotate(-83.6566 64.5 131.239)" fill="#FE7E08"/>
          <ellipse cx="124.196" cy="47.7394" rx="34.4729" ry="60.9857" transform="rotate(-76.52 124.196 47.7394)" fill="#083EFE"/>
          <ellipse cx="165.174" cy="78.7278" rx="33.0569" ry="59.4159" transform="rotate(-29.7345 165.174 78.7278)" fill="#083EFE"/>
          <ellipse cx="144.853" cy="123.377" rx="18.6844" ry="45.3905" transform="rotate(54.758 144.853 123.377)" fill="#083EFE"/>
          <ellipse cx="85.8529" cy="72.1911" rx="18.6844" ry="45.3905" transform="rotate(54.758 85.8529 72.1911)" fill="#083EFE"/>
          <ellipse cx="50.3239" cy="40.2204" rx="10.4815" ry="19.1349" transform="rotate(54.758 50.3239 40.2204)" fill="#083EFE"/>
          <ellipse cx="69.3755" cy="57.2236" rx="18.6844" ry="28.4015" transform="rotate(3.48322 69.3755 57.2236)" fill="#083EFE"/>
          <ellipse cx="71.587" cy="37.5003" rx="18.6844" ry="28.4015" transform="rotate(65.5605 71.587 37.5003)" fill="#083EFE"/>
          <ellipse cx="150.587" cy="101.5" rx="18.6844" ry="28.4015" transform="rotate(65.5605 150.587 101.5)" fill="#083EFE"/>
          <ellipse cx="171.073" cy="113.11" rx="18.6844" ry="28.4015" transform="rotate(-22.3263 171.073 113.11)" fill="#083EFE"/>
          <ellipse cx="193.572" cy="131.742" rx="6.35967" ry="28.4015" transform="rotate(17.4238 193.572 131.742)" fill="#083EFE"/>
          <ellipse cx="58.9588" cy="158.626" rx="24.242" ry="50.6021" transform="rotate(-45.1111 58.9588 158.626)" fill="#FE7E08"/>
          <ellipse cx="29.0551" cy="102.336" rx="18.2559" ry="41.7328" transform="rotate(6.77997 29.0551 102.336)" fill="#FE7E08"/>
          <ellipse cx="168" cy="153.239" rx="17" ry="15.5" fill="#FE7E08"/>
          <ellipse cx="157" cy="172.239" rx="19" ry="15.5" fill="#FE7E08"/>
          <ellipse cx="151" cy="157.239" rx="17" ry="15.5" fill="#FE7E08"/>
          <ellipse cx="126" cy="168.239" rx="17" ry="15.5" fill="#FE7E08"/>
          <ellipse cx="143" cy="180.239" rx="17" ry="15.5" fill="#FE7E08"/>
          <rect x="172" y="168.739" width="7" height="8" fill="black"/>
          <circle cx="109" cy="106.739" r="96.5" stroke="black" stroke-width="5"/>
          <path d="M29 53.754C40.4416 50.1237 60.8283 48.8531 50.843 72.8132C38.3613 102.763 46.6824 110.024 75.8064 97.3178C104.93 84.6117 150.697 57.3843 117.412 120.007C90.7844 170.106 125.733 155.403 146.536 141.789C166.645 134.226 200.831 129.628 176.7 171.739" stroke="black" stroke-width="10"/>
        </svg>
      </div>
    </div>
    <div className={`mercury-external-notification`}>
      <iframe src={`https://cloverhearts.github.io/mercury/app-notification.html`} style={{width: `100%`, height: `50px`, border: `none`}}></iframe>
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
