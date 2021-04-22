/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

import './Photo.scss';

const Photo = (props) => {
  // useEffect(() => {
  //   console.log('photo props are', props);
  // }, props);

  const [loaded, setLoaded] = useState(false);

  const handleLoad = () => {
    // setLoadCount(loadCount + 1);
    // console.log(`Loading photos: ${loadCount}/${albumSize}`);
    // if (loadCount >= albumSize) {
    //   console.log('Finished loading');
    //   finishLoading();
    // }
    setLoaded(true);
  };

  return (
    <div className={`photo ${loaded ? 'loaded' : ''}`}>
      <img
        src={process.env.PUBLIC_URL + `albums/${props.albumName}/` + props.photo}
        // loading="lazy"
        alt="photo"
        onLoad={handleLoad}
      />
    </div>
  );
};

export default Photo;
