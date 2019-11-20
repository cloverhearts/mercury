import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Button, Card } from "@blueprintjs/core";
import moment from "moment";

import "./Card.scss";

export default props => {
  const { id, title, description, createdAt } = props;
  const history = useHistory();
  const onMoveToNote = useCallback(() => {
    history.push(`/notes/${id}`);
  }, [id]);
  const maxTitleSize = /^[\x00-\x7F]*$/.test(title) ? 39 : 23;
  const maxDescriptionSize = /^[\x00-\x7F]*$/.test(description) ? 150 : 120;
  const displayTitle =
    title.slice(0, maxTitleSize).length < title.length
      ? `${title.slice(0, maxTitleSize)}...`
      : title.slice(0, maxTitleSize);
  const displayDescription =
    description.slice(0, maxDescriptionSize).length < description.length
      ? `${description.slice(0, maxDescriptionSize)}...`
      : description.slice(0, maxDescriptionSize);
  return (
    <div className={`mercury-note-card`}>
      <Card className={`card`} interactive onClick={onMoveToNote}>
        <h2 className="title">{displayTitle}</h2>
        <div className="description">{displayDescription}</div>
        <div className={`footer`}>
          <span className="created-at">{moment(createdAt).toLocaleString()}</span>
        </div>
      </Card>
    </div>
  );
};
