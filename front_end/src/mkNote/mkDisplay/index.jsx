import React from 'react';
import Markdown from 'react-markdown';
import './style.scss';

const MkDisplay = (props) => {
  return (
    <div className='mk-display'>
      <Markdown source={props.source} escapeHtml={false}/>
    </div>
  );
}

export default MkDisplay;