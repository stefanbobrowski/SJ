import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Photo from '../../components/Photo/Photo';

import TrackVisibility from 'react-on-screen';

import chevronUp from '../../assets/icons/chevron-up.svg';

import './Album.scss';

function Album(props) {
  const [photoCols, setPhotoCols] = useState([]);
  const [albumSize, setAlbumSize] = useState(0);
  const [loadCount, setLoadCount] = useState(1);
  const [showScroll, setShowScroll] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);

    return () => {
      removeEventListener('scroll', checkScrollTop);
    };
  }, []);

  useEffect(() => {
    // console.log('Album props: ', props.albumName);
    setAllLoaded(false);
    setPhotoCols([]);
    setAlbumSize(0);
    setLoadCount(1);

    let images = [];

    if (props.albumName === 'I') {
      images = importAll(require.context('../../assets/albums/I', false, /\.(png|jpe?g|svg)$/));
    } else if (props.albumName === 'II') {
      images = importAll(require.context('../../assets/albums/II', false, /\.(png|jpe?g|svg)$/));
    }

    if (images.length) {
      images.forEach((img) => {
        let fake = new Image();

        fake.onload = function () {
          var height = fake.height;
          var width = fake.width;
          img.width = width;
          img.height = height;
        };

        fake.src = img.default;
      });

      setAlbumSize(images.length);
      const middle = Math.ceil(images.length / 2);
      const left = images.slice(0, middle);
      const right = images.slice(middle);

      // console.log(left);
      // console.log(right);

      setPhotoCols([left, right]);
    }
  }, [props.albumName]);

  function importAll(r) {
    return r.keys().map(r);
  }

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    setTimeout(function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1);
  };

  const finishLoading = () => {
    setAllLoaded(true);

    setTimeout(function () {
      window.scrollTo({ top: 1, behavior: 'smooth' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  };

  const handleLoad = () => {
    setLoadCount(loadCount + 1);
    console.log(`Loading photos: ${loadCount}/${albumSize}`);
    if (loadCount >= albumSize) {
      console.log('Finished loading');
      finishLoading();
    }
  };

  return (
    <div className="page album">
      {!allLoaded ? (
        <div className="loading-spinner-container">
          <div className="loading-spinner"></div>{' '}
        </div>
      ) : (
        <></>
      )}

      <div className={`photo-album col-2 ${allLoaded ? 'all-loaded' : ''}`}>
        {photoCols &&
          photoCols.map((photoCol, i) => (
            <div className="photo-column" key={i}>
              {photoCol.map((photo, j) => (
                <TrackVisibility key={j} offset={50} partialVisibility once>
                  <Photo photo={photo} handleLoad={handleLoad} />
                </TrackVisibility>
              ))}
            </div>
          ))}
      </div>
      <button
        className="scroll-to-top-button"
        style={{ display: showScroll ? 'flex' : 'none' }}
        onClick={scrollTop}
      >
        <img src={chevronUp} alt="Scroll to top" />
      </button>
    </div>
  );
}

export default Album;

Album.propTypes = {
  albumName: PropTypes.string,
};
