import React, {useState, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Card, Elevation} from '@blueprintjs/core';
import CodeEditor from './Container';
import {Resizable} from 're-resizable';
import NoteActions from '../../../../store/Note/actions';

import './index.scss';

export default props => {
  const {noteId, paragraphId, context} = props;
  const dispatch = useDispatch();
  const note = useSelector(state => state.note.current.note);
  const paragraphs = note && note.id ? note.paragraphs : [];
  const paragraphIndexer = paragraphs.reduce((result, paragraph) => {
    if (!result) {
      const containerIndex = paragraph.containers.findIndex(
        container => container.id === context.id);
      result = {paragraph, containerIndex};
    }
    return result;
  }, null);
  const paragraph = paragraphIndexer ? paragraphIndexer.paragraph : null;
  const container = paragraph ?
    paragraph.containers[paragraphIndexer.containerIndex] :
    null;
  const metaConfig = container ? container.meta.config : {};
  const defaultWidth = metaConfig.editor ?
    metaConfig.editor.width || `800px` :
    `800px`;
  const resizableOptions = {
    width: defaultWidth,
    height: '100%',
  };

  const onResizeStop = useCallback(
    (e, direction, ref, d) => {
      const styles = ref && ref.style;
      if (styles) {
        const width = styles.getPropertyValue('width');
        const height = '100%';
        metaConfig.editor = {
          width,
          height,
        };
      }
      dispatch(NoteActions.setSuggestSaveNote({hasSuggestion: true}));
    },
    [metaConfig],
  );

  return (
    <span className={`mercury-code-container`} contentEditable={false}>
      {container ? (
        <Resizable defaultSize={resizableOptions} onResizeStop={onResizeStop} minHeight={300} minWidth={300}>
          <Card className={`mercury-code-editor`} interactive={true}>
            <CodeEditor noteId={noteId} paragraphId={paragraphId}
                        container={container}/>
          </Card>
        </Resizable>
      ) : null}
    </span>
  );
};
