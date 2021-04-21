/* eslint-disable react/prop-types */
import React from 'react';

import './Photo.scss';

const Photo = (props) => {
  return (
    <div className={`photo ${props.isVisible ? 'visible' : ''}`}>
      <img src={props.photo.default} loading="lazy" alt="YEH" onLoad={props.handleLoad} />
    </div>
  );
};

export default Photo;
