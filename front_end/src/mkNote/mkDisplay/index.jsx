import React from 'react';
import Markdown from 'react-markdown';
import './style.scss';

const MkDisplay = (props) => {

  const { shrink, expand } = props;
  let className = 'mk-display';

  if (shrink) className += ' shrink';
  if (expand) className += ' expand';

  return (
    <div className={className}>
      <Markdown source={props.source} escapeHtml={false}/>
    </div>
  );
}

export default MkDisplay;